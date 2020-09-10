const User = require('../models/User');
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
  },
};

module.exports = resolvers;
