const { gql } = require('apollo-server');

// Schema
const typeDefs = gql`
  type Query {
    customQuery: String
  }
`;

module.exports = typeDefs;
