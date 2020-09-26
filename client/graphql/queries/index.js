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

export const queryGetProduct = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      stock
      price
    }
  }
`;

export const queryGetOrdersByVendor = gql`
  query getOrdersByVendor {
    getOrdersByVendor {
      id
      order {
        id
        name
        quantity
      }
      client {
        id
        name
        lastName
        email
        phone
      }
      vendor
      total
      status
    }
  }
`;

export const queryBestVendor = gql`
  query bestVendor {
    bestVendor {
      vendor {
        name
        email
      }
      total
    }
  }
`;
