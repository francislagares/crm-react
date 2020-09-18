const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });

// Connect to Database
connectDB();

// Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log(req.headers);
    const token = req.headers['authorization'] || '';
    if (token) {
      try {
        const user = jwt.verify(
          token.replace('Bearer ', ''),
          process.env.JWT_SECRET
        );

        return {
          user,
        };
      } catch (err) {
        console.log('An error ocurred', err);
      }
    }
  },
});

// Start server
server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
