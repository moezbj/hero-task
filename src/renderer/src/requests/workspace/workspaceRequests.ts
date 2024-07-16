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
        participant {
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
      admin
    }
  }
`

export { LIST_WORKSPACES, CREATE_WORKSPACE }
