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
const CREATE_TASK = gql`
  mutation createTask(
    $title: String
    $description: String
    $note: String
    $type: String!
    $projectId: Int!
  ) {
    createTask(
      title: $title
      description: $description
      note: $note
      type: $type
      projectId: $projectId
    ) {
      title
      description
      type
      projectId
      createdBy
    }
  }
`
const LIST_TASKS = gql`
  query tasks($projectId: ID!) {
    tasks(projectId: $projectId) {
      id
      title
      description
      type
      projectId
      createdBy
    }
  }
`
const TASK = gql`
  query task($id: ID!) {
    task(id: $id) {
      id
      title
      description
      type
      projectId
      createdBy
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
      participants {
        id
        firstName
      }
    }
  }
`

const PROJECT = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      title
      description
      owner
      participants {
        id
        firstName
      }
    }
  }
`

export { CREATE_PROJECT, LIST_PROJECTS, PROJECT, CREATE_TASK, LIST_TASKS, TASK }
