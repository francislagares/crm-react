import { gql } from '@apollo/client';

export const mutationNewUser = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      name
      lastName
      email
    }
  }
`;

export const mutationAuthUser = gql`
  mutation authenticateUser($input: TokenInput) {
    authenticateUser(input: $input) {
      token
    }
  }
`;

export const mutationNewClient = gql`
  mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      lastName
      company
      email
      phone
    }
  }
`;

export const mutationUpdateClient = gql`
  mutation updateClient($id: ID!, $input: ClientInput) {
    updateClient(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;

export const mutationDeleteClient = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`;

export const mutationNewProduct = gql`
  mutation newProduct($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      stock
      price
    }
  }
`;

export const mutationUpdateProduct = gql`
  mutation updateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      id
      name
      stock
      price
    }
  }
`;

export const mutationDeleteProduct = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const mutationNewOrder = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`;
