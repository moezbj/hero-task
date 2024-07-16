import { gql } from 'graphql-tag'

const CREATE_PROJECT = gql`
  mutation createProject(
    $title: String!
    $description: String!
    $delivered: Boolean!
    $owner: Int!
  ) {
    createProject(title: $title, description: $description, delivered: $delivered, owner: $owner) {
      title
      description
      delivered
      owner
    }
  }
`

const LIST_PROJECTS = gql`
  query listProjects {
    listProjects {
      id
      title
      description
      owner
    }
  }
`
export { CREATE_PROJECT, LIST_PROJECTS }
