'use client'

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/front_office/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

const demoButton = (
  <Button
    size="lg"
    className="rounded-[24px] h-12 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 font-semibold shadow-xl shadow-cyan-500/20 transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
  >
    Demander une démo
  </Button>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2'>
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <Link href='/' className="relative">
            <Image 
              src='/ats.png'
              alt='ats'
              height='50'
              width='50'
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-white">
              {link.label}
            </a>
          ))}
          {demoButton}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
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
              <a key={link.label} href={link.href} className="block px-3 py-2 text-white">
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