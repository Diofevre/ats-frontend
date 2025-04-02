"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Video,
  Code,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PostulationType } from "@/lib/types/client/client.types";
import { useEffect, useState } from "react";
import { Processus } from "@/lib/types/processus-admin/processus-admin";
import { offreService } from "@/lib/services/offres/offres";
import EmptyState from "./emptyState";

interface DetailsSectionProps {
  application: PostulationType;
}

const processTypeIcons = {
  QUESTIONNAIRE: FileText,
  VISIO_CONFERENCE: Video,
  TACHE: Code,
};

export default function DetailsSection({ application }: DetailsSectionProps) {
  const router = useRouter();
  const [processSteps, setProcessSteps] = useState<Processus[]>([]);
  
  useEffect(() => {
    const fetchProcessus = async () => {
      try {
        const steps = await offreService.getProcessus(application.offre.id);
        setProcessSteps(steps);
      } catch (error) {
        console.error("Error fetching processus:", error);
        setProcessSteps([]);
      }
    };

    if (application?.offre?.id) {
      fetchProcessus();
    }
  }, [application.offre.id]);

  return (
    <>
      <Card className="bg-white border border-gray-100 text-gray-900 shadow-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-lg text-gray-700">
            Détails de l&apos;offre
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <span>{`${application.offre.lieu}, ${application.offre.pays}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              <span>{application.offre.type_emploi}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span>{`Soumis: ${new Date(
                application.date_soumission
              ).toLocaleDateString()}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span>{`Limite: ${new Date(
                application.offre.date_limite
              ).toLocaleDateString()}`}</span>
            </div>
          </div>
          <Separator className="bg-gray-200" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 text-sm">
              {application.offre.description}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border border-gray-100 text-gray-900 shadow-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-lg text-gray-700">
            Processus de recrutement
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {processSteps.length > 0 ? (
              processSteps.map((step, index) => {
                const IconComponent = processTypeIcons[step.type];
                const isLast = index === processSteps.length - 1;

                return (
                  <div key={step.id} className="relative flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        step.statut === "TERMINE"
                          ? "bg-green-100"
                          : step.statut === "EN_COURS"
                          ? "bg-blue-100"
                          : "bg-yellow-100"
                      }`}>
                        <IconComponent className={`h-5 w-5 ${
                          step.statut === "TERMINE"
                            ? "text-green-500"
                            : step.statut === "EN_COURS"
                            ? "text-blue-500"
                            : "text-yellow-500"
                        }`} />
                      </div>
                      {!isLast && (
                        <div className="h-full w-0.5 bg-gray-300 absolute top-8 -bottom-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{step.titre}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>{`Durée: ${step.duree} minutes`}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {step.description}
                      </p>
                      <Badge className={`mt-2 ${
                        step.statut === "TERMINE"
                          ? "bg-green-100 text-green-800"
                          : step.statut === "EN_COURS"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      } text-xs font-medium px-2 py-0.5 rounded-full`}>
                        {step.statut === "TERMINE"
                          ? "Terminé"
                          : step.statut === "EN_COURS"
                          ? "En cours"
                          : "À venir"}
                      </Badge>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-500 py-4">
                <EmptyState title="Processus" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {application.etape_actuelle === "Entretien" && (
        <Card className="bg-white border border-gray-200 text-gray-900 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg text-gray-700">
              Quiz associé
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="mb-4 text-gray-600 text-sm">
              Un quiz est disponible pour cette candidature. Complétez-le pour
              améliorer vos chances.
            </p>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white w-full"
              onClick={() =>
                router.push(`/client/quiz/${application.offre.id}`)
              }>
              Accéder au quiz
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}