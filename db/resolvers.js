const User = require('../models/User');
const Product = require('../models/Product');
const Client = require('../models/Client');
const Order = require('../models/Order');
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
    getUsers: async () => {
      try {
        const users = await User.find({});

        return users;
      } catch (err) {
        console.log(err);
      }
    },
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
    getOrders: async () => {
      try {
        const orders = Order.find({});
        return orders;
      } catch (err) {
        console.log(err);
      }
    },
    getOrdersByVendor: async (_, {}, ctx) => {
      try {
        const orders = await Order.find({ vendor: ctx.user.id });
        return orders;
      } catch (err) {
        console.log(err);
      }
    },
    getOrderById: async (_, { id }, ctx) => {
      // Check if order exists
      const order = await Order.findById(id);
      if (!order) {
        throw new Error('Order not found');
      }
      // Only vendors can see their own orders
      if (order.vendor.toString() !== ctx.user.id) {
        throw new Error('You need valid credentials');
      }
      return order;
    },
    getOrderByStatus: async (_, { status }, ctx) => {
      const order = await Order.find({ vendor: ctx.user.id, status });

      return order;
    },
    getClients: async () => {
      try {
        const clients = await Client.find({});

        return clients;
      } catch (err) {
        console.log(err);
      }
    },
    getClient: async (_, { id }, ctx) => {
      // Check if client exists
      const client = await Client.findById(id);
      if (!client) {
        throw new Error('Client not found');
      }
      // Only vendors can see their own clients
      if (client.vendor.toString() !== ctx.user.id) {
        throw new Error('You need valid credentials');
      }
      return client;
    },
    getClientsVendor: async (_, {}, ctx) => {
      try {
        const clients = await Client.find({ vendor: ctx.user.id.toString() });
        return clients;
      } catch (err) {
        console.log(err);
      }
    },
    bestClients: async () => {
      const clients = await Order.aggregate([
        { $match: { status: 'Fulfilled' } },
        {
          $group: {
            _id: '$client',
            total: { $sum: '$total' },
          },
        },
        {
          $lookup: {
            from: 'clients',
            localField: '_id',
            foreignField: '_id',
            as: 'client',
          },
        },
        {
          $limit: 10,
        },
        {
          $sort: { total: -1 },
        },
      ]);
      return clients;
    },
    bestVendor: async () => {
      const vendors = await Order.aggregate([
        { $match: { status: 'Fulfilled' } },
        {
          $group: {
            _id: '$vendor',
            total: { $sum: '$total' },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'vendor',
          },
        },
        {
          $limit: 3,
        },
        {
          $sort: { total: -1 },
        },
      ]);
      return vendors;
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
      // Check if product exists
      let product = await Product.findById(id);

      if (!product) {
        throw new Error('Product not found');
      }
      // Save product on DB
      product = await Product.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return product;
    },
    deleteProduct: async (_, { id }) => {
      // Check if product exists
      let product = await Product.findById(id);

      if (!product) {
        throw new Error('Product not found');
      }

      // Remove product from DB
      product = await Product.findOneAndDelete({ _id: id });

      return 'Product removed';
    },
    newClient: async (_, { input }, ctx) => {
      // Check if client exists
      const { email } = input;

      const clientExist = await Client.findOne({ email });
      if (clientExist) {
        throw new Error('Client already exists');
      }

      const client = new Client(input);
      // Assign vendor
      client.vendor = ctx.user.id;
      // Save client to DB
      try {
        const result = await client.save();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
    updateClient: async (_, { id, input }, ctx) => {
      // Check if client exists
      let client = await Client.findById(id);

      if (!client) {
        throw new Error('Client does not exist');
      }
      // Check if vendor is authorized to edit
      if (client.vendor.toString() !== ctx.user.id) {
        throw new Error('You need valid credentials to edit clients');
      }
      // Save client to DB
      client = await Client.findOneAndUpdate({ _id: id }, input, { new: true });

      return client;
    },
    deleteClient: async (_, { id }, ctx) => {
      // Check if client exists
      let client = await Client.findById(id);

      if (!client) {
        throw new Error('Client does not exist');
      }
      // Check if vendor is authorized to delete
      if (client.vendor.toString() !== ctx.user.id) {
        throw new Error('You need valid credentials to edit clients');
      }
      // Delete client from DB
      await Client.findOneAndDelete({ _id: id });

      return 'Client deleted';
    },
    newOrder: async (_, { input }, ctx) => {
      const { client } = input;
      // Check if client exists
      let clientExist = await Client.findById(client);

      if (!clientExist) {
        throw new Error('Client does not exist');
      }
      // Check if client belongs to vendor
      if (clientExist.vendor.toString() !== ctx.user.id) {
        throw new Error('You need valid credentials');
      }
      // Check if stocks are available
      for await (const item of input.order) {
        const { id } = item;

        const product = await Product.findById(id);

        if (item.quantity > product.stock) {
          throw new Error(`Item: ${product.name} exceeds available quantity`);
        } else {
          // Substract quantity from product stock
          product.stock = product.stock - item.quantity;

          await product.save();
        }
      }

      // Create new order
      const newOrder = await new Order(input);

      // Assign a vendor
      newOrder.vendor = ctx.user.id;

      // Save order into DB
      const result = await newOrder.save();
      return result;
    },
    updateOrder: async (_, { id, input }, ctx) => {
      const { client } = input;
      // Check if order exists
      const orderExist = await Order.findById(id);

      if (!orderExist) {
        throw new Error('Order does not exist');
      }
      // Check if client exist
      const clientExist = await Client.findById(client);

      if (!clientExist) {
        throw new Error('Client does not exist');
      }
      // Check if client and order belong to vendor
      if (clientExist.vendor.toString() !== ctx.user.id) {
        throw new Error('You need valid credentials');
      }
      // Check stock
      if (input.order) {
        for await (const item of input.order) {
          const { id } = item;

          const product = await Product.findById(id);

          if (item.quantity > product.stock) {
            throw new Error(`Item: ${product.name} exceeds available quantity`);
          } else {
            // Substract quantity from product stock
            product.stock = product.stock - item.quantity;

            await product.save();
          }
        }
      }
      // Save order into DB
      const result = await Order.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return result;
    },
    deleteOrder: async (_, { id }, ctx) => {
      // Check if order exists
      const orderExist = await Order.findById(id);

      if (!orderExist) {
        throw new Error('Order does not exists');
      }

      // Check if vendor is authorized to delete
      if (orderExist.vendor.toString() !== ctx.user.id) {
        throw new Error('You need valid credentials to delete orders');
      }

      // Delete order from DB
      await Order.findOneAndDelete({ _id: id });

      return 'Order Deleted';
    },
  },
};

module.exports = resolvers;
