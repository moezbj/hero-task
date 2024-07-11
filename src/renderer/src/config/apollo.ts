/* eslint-disable no-console */
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { ApolloClient, InMemoryCache, ApolloLink, Observable, Operation } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import { Token } from './auth'
import { Language } from './i18n'

interface UserConfig {
  language: Language
}

let token: Token = {
  accessToken: '',
  expiresIn: '',
  refreshToken: '',
  tokenType: ''
}

let userConfig: UserConfig = {
  language: Language.FR
}

export function setToken(nextToken: Token): void {
  token = nextToken
}

export function getToken(): Token {
  return token
}

export function setUserConfig(NewConfig: UserConfig): void {
  userConfig = NewConfig
}

const request = async (operation: Operation): Promise<void> => {
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token.accessToken}` : '',
      'accept-language': userConfig.language,
      'Content-Security-Policy': "default-src 'self' http://localhost:4000/graphql"
    }
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let handle: any | undefined
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (): any => {
        if (handle) handle.unsubscribe()
      }
    })
)

const url = import.meta.env.VITE_API_BASE_URL as string
console.log('url', url)
export default new ApolloClient({
  link: ApolloLink.from([
    requestLink,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    createUploadLink({
      uri: url
    })
  ]),
  cache: new InMemoryCache()
})
