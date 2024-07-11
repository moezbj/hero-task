export interface Token {
  accessToken: string
  expiresIn: string
  refreshToken: string
  tokenType: string
}
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}
export interface Auth {
  user: User
  token: Token
}
