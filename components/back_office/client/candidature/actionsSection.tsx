import { FileText, Mail, XCircle } from "lucide-react";
import { PostulationType } from "@/lib/types/client/client.types";

interface ActionsSectionProps {
  application: PostulationType;
}

export default function ActionsSection({ application }: ActionsSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100 border border-gray-100">
      <div className="px-6 py-4">
        <h2 className="text-base font-medium text-gray-900">Actions rapides</h2>
      </div>
      
      <div className="px-3 py-3">
        <button
          onClick={() => window.open(application.cv, "_blank")}
          className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg group transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <span className="font-medium">Consulter le CV</span>
          </div>
          <span className="text-xs text-gray-400 group-hover:text-gray-600">PDF</span>
        </button>

        <button 
          className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg group transition-colors mt-1"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Mail className="h-4 w-4 text-blue-600" />
            </div>
            <span className="font-medium">Contacter le recruteur</span>
          </div>
          <span className="text-xs text-gray-400 group-hover:text-gray-600">→</span>
        </button>

        {application.etape_actuelle === "SOUMIS" && (
          <button 
            className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-red-50 rounded-lg group transition-colors mt-1"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
              <span className="font-medium group-hover:text-red-600">Retirer ma candidature</span>
            </div>
            <span className="text-xs text-gray-400 group-hover:text-red-600">Annuler</span>
          </button>
        )}
      </div>
    </div>
  );
}