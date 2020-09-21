import { gql } from '@apollo/client';

export const queryGetClientsVendor = gql`
  query getClientsVendor {
    getClientsVendor {
      id
      name
      lastName
      company
      email
    }
  }
`;

export const queryGetClient = gql`
  query getClient($id: ID!) {
    getClient(id: $id) {
      name
      lastName
      company
      email
      phone
    }
  }
`;

export const queryGetUser = gql`
  query getUser {
    getUser {
      id
      name
      lastName
    }
  }
`;

export const queryGetProducts = gql`
  query getProducts {
    getProducts {
      id
      name
      stock
      price
    }
  }
`;
