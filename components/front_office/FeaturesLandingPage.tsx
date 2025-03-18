"use client";

import React from 'react';
import {
  Briefcase,
  Filter,
  BarChart,
  Users,
  MessageSquare,
  Layers,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const FeaturesSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 rounded-full text-cyan-100 text-sm font-medium mb-6 shadow-lg border border-cyan-500/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            Fonctionnalités
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Transformez votre{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-cyan-200 to-teal-200 text-transparent bg-clip-text">
                recrutement
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-lg -z-10" />
            </span>
          </h2>
          
          <p className="text-lg text-cyan-100/80 max-w-2xl mx-auto">
            Optimisez chaque étape avec des outils puissants et intuitifs conçus pour les recruteurs modernes.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-6">
            <motion.div
              variants={item}
              className="group relative bg-gradient-to-b from-white/[0.12] to-white/[0.08] rounded-3xl p-8 hover:from-white/[0.16] hover:to-white/[0.12] transition-all duration-300"
            >
              <div className="absolute inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-[23px] pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-transparent to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 mb-6 shadow-lg shadow-cyan-500/30">
                  <Briefcase className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">
                  Gestion des offres
                </h3>
                
                <p className="text-cyan-100/70 mb-6">
                  Créez et publiez des annonces sur plusieurs plateformes en un clic, tout en suivant leurs performances.
                </p>
                
                <div className="flex items-center text-cyan-300 font-medium group/link">
                  <span>En savoir plus</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="group relative bg-gradient-to-b from-white/[0.12] to-white/[0.08] rounded-3xl p-8 hover:from-white/[0.16] hover:to-white/[0.12] transition-all duration-300"
            >
              <div className="absolute inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-[23px] pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6 shadow-lg shadow-purple-500/30">
                  <Filter className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">
                  Filtrage intelligent
                </h3>
                
                <p className="text-cyan-100/70 mb-6">
                  Triez automatiquement les candidatures selon vos critères pour gagner du temps.
                </p>
                
                <div className="flex items-center text-purple-300 font-medium group/link">
                  <span>En savoir plus</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="group relative bg-gradient-to-b from-white/[0.12] to-white/[0.08] rounded-3xl p-8 hover:from-white/[0.16] hover:to-white/[0.12] transition-all duration-300"
            >
              <div className="absolute inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-[23px] pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/20 via-transparent to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 mb-6 shadow-lg shadow-teal-500/30">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">
                  Communication
                </h3>
                
                <p className="text-cyan-100/70 mb-6">
                  Envoyez des messages personnalisés pour engager vos candidats.
                </p>
                
                <div className="flex items-center text-teal-300 font-medium group/link">
                  <span>En savoir plus</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              variants={item}
              className="group relative bg-gradient-to-b from-white/[0.12] to-white/[0.08] rounded-3xl p-8 hover:from-white/[0.16] hover:to-white/[0.12] transition-all duration-300"
            >
              <div className="absolute inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-[23px] pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 mb-6 shadow-lg shadow-blue-500/30">
                  <Users className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">
                  Suivi des candidatures
                </h3>
                
                <p className="text-cyan-100/70 mb-6">
                  Centralisez CV, lettres et documents dans une interface intuitive.
                </p>
                
                <div className="flex items-center text-blue-300 font-medium group/link">
                  <span>En savoir plus</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="group relative bg-gradient-to-b from-white/[0.12] to-white/[0.08] rounded-3xl p-8 hover:from-white/[0.16] hover:to-white/[0.12] transition-all duration-300"
            >
              <div className="absolute inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-[23px] pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/20 via-transparent to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 mb-6 shadow-lg shadow-amber-500/30">
                  <BarChart className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">
                  Rapports & analyses
                </h3>
                
                <p className="text-cyan-100/70 mb-6">
                  Suivez vos performances avec des tableaux de bord personnalisés.
                </p>
                
                <div className="flex items-center text-amber-300 font-medium group/link">
                  <span>En savoir plus</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="group relative bg-gradient-to-b from-white/[0.12] to-white/[0.08] rounded-3xl p-8 hover:from-white/[0.16] hover:to-white/[0.12] transition-all duration-300"
            >
              <div className="absolute inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-[23px] pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 mb-6 shadow-lg shadow-rose-500/30">
                  <Layers className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">
                  Intégrations
                </h3>
                
                <p className="text-cyan-100/70 mb-6">
                  Connectez ATS à vos outils RH pour une synchronisation fluide.
                </p>
                
                <div className="flex items-center text-rose-300 font-medium group/link">
                  <span>En savoir plus</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-16"
        >
          <Button
            className="rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-400 hover:to-teal-400 font-medium px-8 h-12 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300"
          >
            <span>Toutes les fonctionnalités</span>
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;