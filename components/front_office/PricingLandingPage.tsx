"use client";

import { useSectionInView } from "@/lib/use-section-in-view";
import { motion } from "framer-motion";
import { PricingForm } from "./PricingForm";

const PricingLandingPage = () => {
  const { ref, isInView } = useSectionInView({ threshold: 0.1 });

  return (
    <section
      id="pricing"
      className="py-24 relative text-white overflow-hidden"
      ref={ref}
    >
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <div className="container relative z-10  mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Demande de <span className="text-cyan-300">tarifs</span>
          </h2>
          <p className="text-lg relative md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Remplissez ce formulaire pour en savoir plus sur nos tarifs adaptés
            à vos besoins et découvrez comment ATS peut transformer votre
            recrutement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl" />
          <PricingForm />
          <div className="absolute top-[-2rem] left-[-2rem] w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[-2rem] right-[-2rem] w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

export default PricingLandingPage;