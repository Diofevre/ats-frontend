import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children } : Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {children}
    </div>
  )
}

export default Layout