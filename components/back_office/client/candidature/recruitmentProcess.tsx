import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Video, Code } from "lucide-react";
import { Processus } from "@/lib/types/processus-admin/processus-admin";
import EmptyState from "./emptyState";

interface RecruitmentProcessProps {
  processSteps: Processus[];
  handleStepAction: (step: Processus) => void;
  passedProcessus: { statut: string; type_processus: string };
}

const processTypeIcons = {
  QUESTIONNAIRE: FileText,
  VISIO_CONFERENCE: Video,
  TACHE: Code,
};

export default function RecruitmentProcess({
  processSteps,
  handleStepAction,
  passedProcessus,
}: RecruitmentProcessProps) {
  console.log(passedProcessus);

  return (
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

              const isPassed =
                step.type === passedProcessus.type_processus &&
                passedProcessus.statut === "TERMINER";

              const stepStatus = isPassed ? "TERMINER" : step.statut;

              return (
                <div key={step.id} className="relative flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        stepStatus === "TERMINER"
                          ? "bg-green-100"
                          : stepStatus === "EN_COURS"
                          ? "bg-blue-100"
                          : "bg-yellow-100"
                      }`}>
                      <IconComponent
                        className={`h-5 w-5 ${
                          stepStatus === "TERMINER"
                            ? "text-green-500"
                            : stepStatus === "EN_COURS"
                            ? "text-blue-500"
                            : "text-yellow-500"
                        }`}
                      />
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
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`mt-2 ${
                          stepStatus === "TERMINER"
                            ? "bg-green-100 text-green-800"
                            : stepStatus === "EN_COURS"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        } text-xs font-medium px-2 py-0.5 rounded-full`}>
                        {stepStatus === "TERMINER"
                          ? "Terminé"
                          : stepStatus === "EN_COURS"
                          ? "En cours"
                          : "À venir"}
                      </Badge>

                      {/* Bouton Commencer seulement si non passé + non visio */}
                      {stepStatus === "EN_COURS" &&
                        step.type !== "VISIO_CONFERENCE" &&
                        !isPassed && (
                          <Badge
                            onClick={() => handleStepAction(step)}
                            className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-md">
                            Commencer
                          </Badge>
                        )}
                    </div>
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
  );
}
