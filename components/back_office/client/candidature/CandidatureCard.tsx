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
  SOUMIS: "bg-blue-50 text-blue-700 border border-blue-100",
  Entretien: "bg-indigo-50 text-indigo-700 border border-indigo-100",
  Acceptée: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Refusée: "bg-rose-50 text-rose-700 border border-rose-100",
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
      <Card className="overflow-hidden p-4 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-blue-50/50 border border-blue-100/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge
                  className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    statusStyles[
                      application.etape_actuelle as keyof typeof statusStyles
                    ]
                  )}>
                  {application.etape_actuelle}
                </Badge>
                <h3 className="text-base font-semibold text-gray-900 leading-tight">
                  {application.offre.titre}
                </h3>
                <div className="text-xs font-medium text-blue-600/90">
                  {application.source_site}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <Button
                    size="sm"
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200"
                    onClick={() => onViewDetails(application.id)}>
                    <Eye className="h-3.5 w-3.5" />
                    Détails
                  </Button>
                </motion.div>
                {application.etape_actuelle === "Entretien" && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}>
                    <Link href={`/client/quiz/${application.offre.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-100 text-blue-700 hover:bg-blue-50 hover:border-blue-200 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200">
                        Quiz
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed border-y border-blue-50 py-3">
              {application.offre.description}
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <motion.div
                whileHover={{ x: 2 }}
                className="flex items-center text-gray-700 bg-blue-50/50 p-2 rounded-md">
                <MapPin className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                {`${application.offre.lieu}, ${application.offre.pays}`}
              </motion.div>
              <motion.div
                whileHover={{ x: 2 }}
                className="flex items-center text-gray-700 bg-blue-50/50 p-2 rounded-md">
                <Briefcase className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                {application.offre.type_emploi}
              </motion.div>
              <motion.div
                whileHover={{ x: 2 }}
                className="flex items-center text-gray-700 bg-blue-50/50 p-2 rounded-md">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                {`Soumis: ${new Date(
                  application.date_soumission
                ).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}`}
              </motion.div>
              <motion.div
                whileHover={{ x: 2 }}
                className="flex items-center text-gray-700 bg-blue-50/50 p-2 rounded-md">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
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