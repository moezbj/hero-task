import { gql } from 'graphql-tag'

const LIST_WORKSPACES = gql`
  query listWorkspaces {
    listWorkspaces {
      name
      description
      admin
    }
  }
`

const CREATE_WORKSPACE = gql`
  mutation createWorkspace($name: String!, $description: String!) {
    createWorkspace(name: $name, description: $description) {
      name
      description
    }
  }
`

export { LIST_WORKSPACES, CREATE_WORKSPACE }
