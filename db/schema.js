const { gql } = require('apollo-server');

// Schema
const typeDefs = gql`
  input UserInput {
    name: String!
    lastName: String!
    email: String!
    password: String!
  }

  type User {
    id: ID
    name: String
    lastName: String
    email: String
    createdAt: String
  }

  type Query {
    getUsers: String
  }

  type Mutation {
    newUser(input: UserInput): User
  }
`;

module.exports = typeDefs;
