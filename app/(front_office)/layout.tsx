import Navbar from '@/components/front_office/Navbar'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children } : Props) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#4BB3DA] to-[#548293]'>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout