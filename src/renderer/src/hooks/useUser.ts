import { useContext } from 'react'

import { AuthContext } from '../providers/AuthProvider'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useUser(): any {
  return useContext(AuthContext).user
}
