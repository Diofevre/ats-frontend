'use client'

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { navLinks } from '@/lib/front_office/constants';

const demoButton = (
  <button className="bg-blue-600 text-white px-4 py-2.5 rounded-[12px] hover:bg-blue-700">
    Demande une démo
  </button>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <div className="relative">
            <Link href="/" className="text-4xl font-bold text-blue-600">ATS</Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-gray-600 hover:text-blue-600">
              {link.label}
            </a>
          ))}
          {demoButton}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-blue-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                {link.label}
              </a>
            ))}
            <div className="w-full mt-2">{demoButton}</div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;