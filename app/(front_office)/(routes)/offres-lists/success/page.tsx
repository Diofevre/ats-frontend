"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SuccessPage: FC = () => {
  const router = useRouter();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.3, delay: 0.2 } },
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-fit flex mt-[5rem] justify-center px-4">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
            </motion.div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Candidature soumise avec succès !
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Merci pour votre postulation ! Votre candidature a été bien reçue.
              Nous vous contacterons sous peu pour les prochaines étapes.
              Vérifiez vos emails, y compris les spams, pour ne rien manquer.
            </p>
            <div className="flex flex-col space-y-4  items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      className="bg-blue-600 hover:bg-blue-700 rounded-[12px] h-10 px-6 flex items-center space-x-2"
                      onClick={() => handleNavigation("/")}>
                      <Home className="h-4 w-4" />
                      <span>Retour à l&apos;accueil</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Revenir à la page principale</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-[12px] h-10 px-6 flex items-center space-x-2"
                      onClick={() => handleNavigation("/offres-lists")}>
                      <PlusCircle className="h-4 w-4" />
                      <span>Soumettre une autre candidature</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Postuler à une nouvelle offre</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
