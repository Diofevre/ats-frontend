import Navbar from '@/components/front_office/Navbar'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children } : Props) => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout