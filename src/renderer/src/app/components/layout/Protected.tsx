/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { User } from '../../../config/auth'
import useUser from '../../../hooks/useUser'
import { isUserAuthenticated, ROLE } from '../../../lib/role'

interface ProtectedProps {
  children?: React.ReactNode | ((user: User) => React.ReactNode)
  roles: ROLE[]
}

export const Protected = ({ children, roles }: ProtectedProps): JSX.Element => {
  const user = useUser()
  const location = useLocation()

  if (!user || !isUserAuthenticated(user, roles))
    return (
      <Navigate
        replace
        to={{
          pathname: user ? `/${user.role.toLowerCase()}` : '/login',
          search: user ? '' : `?${new URLSearchParams({ from: location.pathname })}`
        }}
      />
    )

  return (
    <React.Fragment>{typeof children === 'function' ? children(user) : children}</React.Fragment>
  )
}
