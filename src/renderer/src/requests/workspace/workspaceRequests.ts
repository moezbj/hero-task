import { gql } from 'graphql-tag'

const LIST_WORKSPACES = gql`
  query listWorkspaces {
    listWorkspaces {
      id
      name
      description
      adminId
      collaborators
      projects {
        title
        participants {
          id
          firstName
          lastName
        }
      }
    }
  }
`

const CREATE_WORKSPACE = gql`
  mutation createWorkspace($name: String!, $description: String!) {
    createWorkspace(name: $name, description: $description) {
      name
      description
      adminId
    }
  }
`

export { LIST_WORKSPACES, CREATE_WORKSPACE }
