import React from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Drawer from './drawer'
import { PROJECT } from '../../../requests/project/projectRequests'

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  const location = useLocation()
  const projectId = location.pathname.split('project/')[1].split('/')[0]
  const { data } = useQuery(PROJECT, {
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network'
  })
  return (
    <Drawer data={data?.project} location={location.pathname}>
      <main>{children}</main>
    </Drawer>
  )
}

export default Wrapper
