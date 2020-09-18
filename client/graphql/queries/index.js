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
