import { gql } from "graphql-tag";
const CREATE_PROJECT = gql`
  mutation createProject(
    $title: String!
    $description: String!
    $delivered: Boolean!
    $owner: Int!
  ) {
    createProject(
      title: $title
      description: $description
      delivered: $delivered
      owner: $owner
    ) {
      title
      description
      delivered
      owner
    }
  }
`;
export { CREATE_PROJECT };
