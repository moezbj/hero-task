import { gql } from "graphql-tag";

const LIST_PROJECTS = gql`
  query listProjects {
    listProjects {
      title
      description
      owner
    }
  }
`;
export { LIST_PROJECTS };
