/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden text-white mt-12">
      <div className="container relative z-10 py-16 md:py-28 h-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 max-w-xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 rounded-full text-cyan-100 font-medium text-sm shadow-lg border border-cyan-500/20 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              Solution de recrutement intelligente
            </motion.div>

            <h1 className="text-4xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              Simplifiez votre{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-teal-200 to-cyan-200 text-transparent bg-clip-text">
                  processus
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-lg -z-10" />
                <img
                  src="/assets/icons/abstract1-hero.svg"
                  alt="abstract-1"
                  className="absolute -bottom-4 -z-10 -right-0 w-32 md:w-[18rem] opacity-80"
                />
              </span>
              <br />
              de recrutement
            </h1>

            <p className="text-lg md:text-xl text-cyan-100/90 max-w-md leading-relaxed">
              ATS est une solution complète pour attirer, évaluer et embaucher
              les meilleurs talents rapidement et efficacement.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="rounded-[12px] h-12 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 font-semibold shadow-xl shadow-cyan-500/20 transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
              >
                Commencer gratuitement
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-[12px] h-12 bg-transparent backdrop-blur-sm border border-white text-white hover:bg-white/10 font-semibold transition-all hover:scale-105 hover:border-white/40"
              >
                Voir la démo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <div className="relative">
              {/* Glow Effects */}
              <div className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-teal-500/30 rounded-full filter blur-3xl opacity-30 -z-10 animate-pulse" />
              <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl opacity-20 -z-10 animate-pulse delay-300" style={{ animationDuration: '4s' }} />
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/assets/images/hero-image.png"
                  alt="Professionnel utilisant ATS"
                  className="relative z-10 w-full max-w-md lg:max-w-lg object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full border border-cyan-500/20 backdrop-blur-sm" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full border border-teal-500/20 backdrop-blur-sm" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;