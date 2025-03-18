"use client";

import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/use-section-in-view";
import { testimonials } from "@/lib/front_office/constants";
import TestimonialCard from "./TestimonialsCard";

const TestimonialsSection = () => {
  const { ref, isInView } = useSectionInView({ threshold: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="testimonials"
      className="relative py-16 overflow-hidden"
      ref={ref}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-indigo-50/40 to-transparent opacity-60" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-purple-50/30 to-transparent opacity-60" />
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-radial from-blue-50/20 to-transparent opacity-40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8">
            La confiance de nos clients fait notre fierté
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Découvrez comment notre solution ATS révolutionne le processus de recrutement 
            et transforme l&apos;expérience des recruteurs au quotidien
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group"
            >
              <TestimonialCard
                quote={testimonial.quote}
                name={testimonial.name}
                position={testimonial.position}
                avatar={testimonial.avatar}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;