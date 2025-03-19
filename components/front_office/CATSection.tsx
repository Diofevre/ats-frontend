"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/use-section-in-view";

const CTASection = () => {
  const { ref, isInView } = useSectionInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative">
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute top-1/3 left-10 w-48 h-48 bg-cyan-100 rounded-full opacity-20 blur-2xl" />
        <div className="absolute bottom-1/4 right-10 w-56 h-56 bg-cyan-300 rounded-full opacity-25 blur-3xl" />
      </div>

      <div className="container relative z-10 h-full mx-auto y">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
              Vous souhaitez optimiser vos recrutements ?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Notre logiciel ATS centralise les données candidats, automatise
              les tâches et vous fait gagner du temps !
            </p>
            <div className="flex justify-center md:justify-start">
              <Button
                size="lg"
                className="rounded-[24px] h-12 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 font-semibold shadow-xl shadow-cyan-500/20 transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
              >
                Demander une démo
              </Button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              <Image
                src="/assets/images/cta-section.png"
                alt="Équipe de recrutement utilisant ATS"
                width={400}
                height={300}
                className="object-contain "
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;