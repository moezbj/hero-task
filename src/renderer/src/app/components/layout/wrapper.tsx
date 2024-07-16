import React from 'react'
import Header from './header'

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  return (
    <div className="h-screen flex flex-col flex-1">
      <Header />
      <main className="h-full">{children}</main>
    </div>
  )
}

export default Wrapper
