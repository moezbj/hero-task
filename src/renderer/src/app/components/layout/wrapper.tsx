import React from 'react'
import Drawer from './drawer'
import Header from './header'

interface WrapperProps {
  children: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

const Wrapper = ({ children, data }: WrapperProps): JSX.Element => {
  return (
    <div>
      <Header data={data} />
      <Drawer>{children}</Drawer>
    </div>
  )
}

export default Wrapper
