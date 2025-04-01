import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, User, XCircle } from "lucide-react";
import { PostulationType } from "@/lib/types/client/client.types";

interface ActionsSectionProps {
  application: PostulationType;
}

export default function ActionsSection({ application }: ActionsSectionProps) {
  return (
    <Card className="bg-white border border-gray-200 text-gray-900 shadow-sm">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-lg text-gray-700">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        <Button
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 flex items-center gap-2"
          onClick={() => window.open(application.cv, "_blank")}>
          <FileText className="h-4 w-4 text-blue-500" />
          Télécharger CV
        </Button>
        <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 flex items-center gap-2">
          <User className="h-4 w-4 text-blue-500" />
          Contacter recruteur
        </Button>
        {application.etape_actuelle === "SOUMIS" && (
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Retirer ma candidature
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
