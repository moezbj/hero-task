import { gql } from "graphql-tag";
const signup = gql`
  mutation signup($email: String, $name: String, $password: String) {
    signup(email: $email, name: $name, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const signin = gql`
  mutation signin($email: String, $password: String) {
    signup(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;
export { signin, signup };
