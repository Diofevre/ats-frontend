import Navbar from '@/components/front_office/Navbar'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children } : Props) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#2C9CC6] to-[#231818]'>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout