"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PostulationType } from "@/lib/types/client/client.types";

interface ApplicationCardProps {
  application: PostulationType;
  onViewDetails: (id: number) => void;
}

const statusStyles = {
  SOUMIS: "bg-yellow-100 text-yellow-800",
  Entretien: "bg-blue-100 text-blue-800",
  Acceptée: "bg-green-100 text-green-800",
  Refusée: "bg-red-100 text-red-800",
};

export default function CandidatureCard({
  application,
  onViewDetails,
}: ApplicationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group">
      <Card className="overflow-hidden border border-gray-200 bg-white rounded-xl shadow-sm transition-all duration-300  hover:border-blue-300">
        <CardContent className="p-6">
          <div className="flex flex-col gap-5">
            {/* En-tête */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Badge
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-full",
                    statusStyles[
                      application.etape_actuelle as keyof typeof statusStyles
                    ]
                  )}>
                  {application.etape_actuelle}
                </Badge>
                <h3 className="text-lg font-semibold text-gray-900">
                  {application.offre.titre}
                </h3>
                <div className="text-sm font-medium text-blue-600">
                  {application.source_site}
                </div>
              </div>
              <div className="flex gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
                    onClick={() => onViewDetails(application.id)}>
                    <Eye className="h-4 w-4" />
                    Détails
                  </Button>
                </motion.div>
                {application.etape_actuelle === "Entretien" && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Link href={`/client/quiz/${application.offre.id}`}>
                      <Button
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-blue-500 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200">
                        Quiz
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {application.offre.description}
            </p>

            {/* Détails en grille */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center text-sm text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                {`${application.offre.lieu}, ${application.offre.pays}`}
              </motion.div>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center text-sm text-gray-700">
                <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                {application.offre.type_emploi}
              </motion.div>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center text-sm text-gray-700">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                {`Soumis: ${new Date(
                  application.date_soumission
                ).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}`}
              </motion.div>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center text-sm text-gray-700">
                <Clock className="h-4 w-4 mr-2 text-blue-500" />
                {`Limite: ${new Date(
                  application.offre.date_limite
                ).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}`}
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
