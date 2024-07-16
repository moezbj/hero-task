import React from 'react'
import Drawer from './drawer'

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  return (
    <Drawer>
      <main>{children}</main>
    </Drawer>
  )
}

export default Wrapper
