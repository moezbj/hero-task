import React from 'react'
import Drawer from './drawer'
import Header from './header'

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  return (
    <Drawer>
      <Header />
      <main>{children}</main>
    </Drawer>
  )
}

export default Wrapper
