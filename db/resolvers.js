const User = require('../models/User');
const Product = require('../models/Product');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });

const createToken = (user, secret, expiresIn) => {
  const { id, name, lastName, email } = user;

  return jwt.sign({ id }, secret, { expiresIn });
};

// Resolvers
const resolvers = {
  Query: {
    getUser: async (_, { token }) => {
      const userId = await jwt.verify(token, process.env.JWT_SECRET);

      return userId;
    },
    getProducts: async () => {
      try {
        const products = await Product.find({});
        return products;
      } catch (err) {
        console.log(err);
      }
    },
    getProduct: async (_, { id }) => {
      const product = await Product.findById(id);

      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    },
  },
  Mutation: {
    newUser: async (_, { input }) => {
      // Check if user exists
      const { email, password } = input;

      const userExist = await User.findOne({ email });

      if (userExist) {
        throw new Error('User already exists');
      }
      // Hash password
      const salt = await bcrypt.genSalt(10);
      input.password = await bcrypt.hash(password, salt);
      // Save user on DB
      try {
        const user = new User(input);
        user.save();
        return user;
      } catch (err) {
        console.log(err);
      }
    },
    authenticateUser: async (_, { input }) => {
      // Check if user exists
      const { email, password } = input;

      const userExist = await User.findOne({ email });

      if (!userExist) {
        throw new Error('User does not exist');
      }

      // Verify password
      const correctPassword = await bcrypt.compare(
        password,
        userExist.password
      );
      if (!correctPassword) {
        throw new Error('Incorrect password');
      }
      // Generate token
      return {
        token: createToken(userExist, process.env.JWT_SECRET, '24h'),
      };
    },
    newProduct: async (_, { input }) => {
      try {
        const product = new Product(input);

        // Save on DB
        const result = await product.save();

        return result;
      } catch (err) {
        console.log(err);
      }
    },
    updateProduct: async (_, { id, input }) => {
      let product = await Product.findById(id);

      if (!product) {
        throw new Error('Product not found');
      }

      product = await Product.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return product;
    },
  },
};

module.exports = resolvers;
