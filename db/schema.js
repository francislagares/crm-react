const { gql } = require('apollo-server');

// Schema
const typeDefs = gql`
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    createdAt: String
  }

  input UserInput {
    name: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Token {
    token: String
  }

  input TokenInput {
    email: String!
    password: String!
  }

  type Query {
    getUser(token: String!): User
  }

  type Mutation {
    newUser(input: UserInput): User
    authenticateUser(input: TokenInput): Token
  }
`;

module.exports = typeDefs;
