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

export const queryGetUser = gql`
  query getUser {
    getUser {
      id
      name
      lastName
    }
  }
`;
