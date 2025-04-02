import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PostulationType } from "@/lib/types/client/client.types";

interface HeaderSectionProps {
  application: PostulationType;
  onBack: () => void;
}

export default function HeaderSection({
  application,
  onBack,
}: HeaderSectionProps) {
  return (
    <div className="bg-white my-5 border rounded-xl border-gray-100 px-6 py-4 transition-all duration-200">
      <div className="flex flex-col gap-4">
        {/* Bouton Retour */}
        <span
          className="hover:text-black/80 cursor-pointer text-sm"
          onClick={onBack}
        >
          ⟵
          Retour aux candidatures
        </span>

        {/* Titre et Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
              {application.offre.titre}
            </h1>
            <div className="text-lg text-blue-600 font-medium">
              {application.source_site}
            </div>
          </div>
          <Badge
            className={cn(
              "mt-2 md:mt-0 text-xs px-4 font-semibold py-1 rounded-full transition-colors duration-200",
              application.etape_actuelle === "SOUMIS" &&
                "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
              application.etape_actuelle === "Entretien" &&
                "bg-blue-100 text-blue-800 hover:bg-blue-200",
              application.etape_actuelle === "Acceptée" &&
                "bg-green-100 text-green-800 hover:bg-green-200",
              application.etape_actuelle === "Refusée" &&
                "bg-red-100 text-red-800 hover:bg-red-200"
            )}>
            {application.etape_actuelle}
          </Badge>
        </div>
      </div>
    </div>
  );
}
