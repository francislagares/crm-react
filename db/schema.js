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

  type Order {
    id: ID
    order: [OrderGroup]
    total: Float
    client: ID
    vendor: ID
    date: String
    status: OrderStatus
  }

  type OrderGroup {
    id: ID
    quantity: Int
  }

  input OrderProductInput {
    id: ID
    quantity: Int
  }

  input OrderInput {
    order: [OrderProductInput]
    total: Float!
    client: ID!
    status: OrderStatus
  }

  enum OrderStatus {
    Pending
    Fulfilled
    Cancelled
  }

  type Query {
    # Users
    getUsers: [User]
    getUser(token: String!): User

    # Clients
    getClients: [Client]
    getClient(id: ID!): Client
    getClientsVendor: [Client]

    # Products
    getProducts: [Product]
    getProduct(id: ID!): Product

    # Orders
    getOrders: [Order]
    getOrdersByVendor: [Order]
    getOrderById(id: ID!): Order
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
    updateClient(id: ID!, input: ClientInput): Client
    deleteClient(id: ID!): String

    # Orders
    newOrder(input: OrderInput): Order
    updateOrder(id: ID!, input: OrderInput): Order
  }
`;

module.exports = typeDefs;
