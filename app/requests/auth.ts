import { gql } from "graphql-tag";
const signup = gql`
  mutation signup(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    signup(
      email: $email
      lastName: $lastName
      firstName: $firstName
      password: $password
    ) {
      token {
        tokenType
        accessToken
        refreshToken
        expiresIn
      }
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
const signin = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token {
        tokenType
        accessToken
        refreshToken
        expiresIn
      }
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
export { signin, signup };
