const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Resolvers
const resolvers = {
  Query: {},
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
  },
};

module.exports = resolvers;
