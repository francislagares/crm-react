const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

const connectDB = require('./config/db');

// Connect to Database
connectDB();

// Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start server
server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
