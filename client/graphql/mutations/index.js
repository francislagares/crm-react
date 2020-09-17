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
