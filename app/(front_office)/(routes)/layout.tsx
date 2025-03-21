import React from 'react'

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children } : Props) => {
  return (
    <div className='min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {children}
    </div>
  )
}

export default Layout