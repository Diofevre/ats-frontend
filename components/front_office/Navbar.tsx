"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { navLinks } from "@/lib/constants/front_office/constants";
import { useAuth } from "@/hooks/use-auth";

const baseTextClasses = "transition-colors text-white group-hover:text-white";
const baseHoverClasses = "hover:text-indigo-600 transition-colors";

const Navbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      if (pathname === "/") {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      } else {
        router.push(`/${href}`);
        setIsMenuOpen(false);
      }
    } else {
      router.push(href);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            {[{ icon: Phone, text: "+33 1 23 45 67 89" }, { icon: Mail, text: "service@company.com" }].map((item, index) => (
              <div key={index} className="flex items-center group">
                <item.icon size={16} className={`mr-2 ${baseTextClasses}`} />
                <span className={baseTextClasses}>{item.text}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-6">
            <span className={baseTextClasses + " cursor-pointer"}>Support</span>
            <Link href="/login-client" className={`flex items-center group ${baseTextClasses}`}>
              <User size={16} className="mr-2" /> Espace Candidature
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`w-full ${isScrolled ? "fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link href="/" className="relative">
              <Image src="/ats.png" alt="ats" height={50} width={50} className="transform transition-transform hover:scale-105" />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-white text-sm font-medium cursor-pointer ${baseHoverClasses}`}>
                  {link.label}
                </a>
              ))}
              
              {/* Button */}
              <Link href="/admin">
                <Button
                  size="lg"
                  className="rounded-[12px] text-black px-8 bg-gradient-to-r from-teal-400 to-cyan-400 font-medium shadow-lg shadow-indigo-500/20 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-teal-300 hover:to-cyan-300"
                >
                  { user ? (
                    <>Se connecter</>
                  ) : (
                    <>Administrateur</>
                  ) }
                </Button>
              </Link>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={baseHoverClasses + " md:hidden flex items-center"}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-slate-100">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                    {link.label}
                  </a>
                ))}

                {/* Button */}
                <div className="px-3 py-2">
                <Link href="/admin">
                  <Button
                    size="lg"
                    className="rounded-[12px] text-black px-8 bg-gradient-to-r from-teal-400 to-cyan-400 font-medium shadow-lg shadow-indigo-500/20 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-teal-300 hover:to-cyan-300"
                  >
                    { user ? (
                      <>Se connecter</>
                    ) : (
                      <>Administrateur</>
                    ) }
                  </Button>
                </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      {isScrolled && <div className="h-20" />}
    </div>
  );
};

export default Navbar;