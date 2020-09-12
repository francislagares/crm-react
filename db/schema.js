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

  type Product {
    id: ID
    name: String
    stock: Int
    price: Float
    createdAt: String
  }

  input ProductInput {
    name: String!
    stock: Int!
    price: Float!
  }

  type Client {
    id: ID
    name: String
    lastName: String
    company: String
    email: String
    phone: String
    vendor: ID
  }

  input ClientInput {
    name: String!
    lastName: String!
    company: String!
    email: String!
    phone: String
  }

  type Query {
    # Users
    getUser(token: String!): User

    # Products
    getProducts: [Product]
    getProduct(id: ID!): Product
  }

  type Mutation {
    # Users
    newUser(input: UserInput): User
    authenticateUser(input: TokenInput): Token

    # Products
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String

    # Clients
    newClient(input: ClientInput): Client
  }
`;

module.exports = typeDefs;
