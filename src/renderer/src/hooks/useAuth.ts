/* eslint-disable @typescript-eslint/no-explicit-any */
import localforage from 'localforage'
import { useContext } from 'react'
import { setToken } from '../config/apollo'
import { Auth } from '../config/auth'
import { AuthContext } from '../providers/AuthProvider'
import graphQLResult from '../lib/graphQLResult'
import { useMutation } from '@apollo/client'

function useAuth({ mutation, options = {}, stayConnected = true }: any): any {
  const { setUser } = useContext(AuthContext)
  function persistUser(data: Auth): void {
    const result = { ...data }
    if (!stayConnected) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete result.token.refreshToken
    }
    localforage.setItem('auth', JSON.stringify(result))
  }
  const [call, state] = useMutation(mutation, {
    ...options,
    onCompleted: (data) => {
      console.log('here')

      const result = graphQLResult(data) as unknown as Auth
      console.log('hrer ...2')

      setToken(result.token)
      persistUser(result)
      setUser(result.user)
      if (options.onCompleted) {
        options.onCompleted(data)
      }
    }
  })

  return [call, state]
}

export default useAuth
