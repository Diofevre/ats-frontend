"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/use-section-in-view";

const Footer = () => {
  const { ref, isInView } = useSectionInView({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <footer
      id="footer"
      ref={ref}
      className="relative py-10 overflow-hidden"
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-6 xl:gap-12"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                ATS
              </span>
            </div>
            <p className="text-blue-100/80 text-sm leading-relaxed max-w-sm">
              Révolutionnez votre processus de recrutement avec notre solution ATS innovante. 
              Simplifiez, optimisez et transformez votre façon de recruter.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">
              Fonctionnalités
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-blue-100/80 hover:text-white transition-colors text-sm">
                  Gestion des offres
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100/80 hover:text-white transition-colors text-sm">
                  Suivi des candidatures
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100/80 hover:text-white transition-colors text-sm">
                  Rapports & Analyses
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">
              Entreprise
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-blue-100/80 hover:text-white transition-colors text-sm">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100/80 hover:text-white transition-colors text-sm">
                  Témoignages
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100/80 hover:text-white transition-colors text-sm">
                  Carrières
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-blue-100/80 hover:text-white transition-colors text-sm">
                  Centre d&apos;aide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100/80 hover:text-white transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100/80 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">
              Suivez-nous
            </h3>
            <div className="flex space-x-2.5">
              <Link
                href="#"
                className="text-blue-100/80 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-blue-100/80 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-blue-100/80 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-blue-100/80 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100/60 text-sm">
              © {new Date().getFullYear()} ATS. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-blue-100/60 hover:text-white transition-colors text-sm"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="#"
                className="text-blue-100/60 hover:text-white transition-colors text-sm"
              >
                Conditions d&apos;utilisation
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;