import { TypedDocumentNode } from '@apollo/client'
import { gql } from 'graphql-tag'

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

const signup = gql`
  mutation register($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
    register(email: $email, lastName: $lastName, firstName: $firstName, password: $password) {
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
        role
      }
    }
  }
`
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
        role
      }
    }
  }
`

const profile = gql`
  query user($token: String!) {
    user(token: $token) {
      id
      firstName
      lastName
      email
      role
    }
  }
` as TypedDocumentNode<{ user: User }>

const refreshToken = gql`
  mutation refresh($token: String!, $userId: String!) {
    refresh(token: $token, userId: $userId) {
      tokenType
      accessToken
      refreshToken
      expiresIn
    }
  }
`

const forgotPassword = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`
const resetPassword = gql`
  mutation resetPassword($password: String!, $confirm: String!, $token: String!) {
    resetPassword(password: $password, confirm: $confirm, token: $token)
  }
`

const logout = gql`
  mutation logout($token: String!) {
    logout(token: $token)
  }
`
const validToken = gql`
  query validToken($tokenType: String!, $token: String!, $userId: String!) {
    validToken(tokenType: $tokenType, token: $token, userId: $userId) {
      user {
        id
      }
      token {
        accessToken
      }
    }
  }
`

export { signin, signup, profile, refreshToken, logout, forgotPassword, resetPassword, validToken }
