"use client";

import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeaderSectionProps {
  title: string;
  description: string;
  onBack: () => void;
  timeLeft: string;
}

export default function HeaderSection({
  title,
  description,
  onBack,
  timeLeft,
}: HeaderSectionProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="flex-1">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-2 flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 -ml-2">
          <ArrowLeft className="h-4 w-4" />
          Retour aux candidatures
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {description}
          </p>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 shadow-sm">
        <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <span className="text-lg font-medium">{timeLeft}</span>
      </div>
    </div>
  );
}
