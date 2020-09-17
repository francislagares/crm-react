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
