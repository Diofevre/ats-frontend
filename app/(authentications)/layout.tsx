import Link from 'next/link'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children } : Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Children */}
      {children}

      {/* Home Link */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors group"
        aria-label="Return to home"
      >
        <span className="text-2xl font-light group-hover:-translate-x-1 transition-transform">⟵</span>
        <span className="text-sm font-medium">Back to home</span>
      </Link>
    </div>
  )
}

export default Layout