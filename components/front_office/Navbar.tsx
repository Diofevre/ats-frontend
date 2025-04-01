"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { navLinks } from "@/lib/constants/front_office/constants";

const demoButton = (
  <Link href={"/login-client"}>
    <Button
      size="lg"
      className="rounded-[24px] h-12 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 font-semibold shadow-xl shadow-cyan-500/20 transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30">
      Mon profile
    </Button>
  </Link>
);

const Navbar = () => {
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
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setIsMenuOpen(false);
        }
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
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>service@company.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <span className="hover:cursor-pointer">Support</span>
              <Link
                href="/admin"
                className="flex flex-row items-center hover:cursor-pointer">
                <User size={16} className="mr-2" />
                Espace Client
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav
        className={`w-full backdrop-blur-xl ${
          isScrolled
            ? "fixed top-0 left-0 right-0 z-50 animate-in fade-in slide-in-from-top duration-300"
            : ""
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="relative">
                <Image src="/ats.png" alt="ats" height="50" width="50" />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-6 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-white hover:text-cyan-400 transition-colors cursor-pointer">
                  {link.label}
                </a>
              ))}
              {demoButton}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block px-3 py-2 text-white hover:text-cyan-400 transition-colors cursor-pointer">
                    {link.label}
                  </a>
                ))}
                <div className="w-full mt-2">{demoButton}</div>
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
