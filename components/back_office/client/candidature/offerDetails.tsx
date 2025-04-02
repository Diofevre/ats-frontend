import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Calendar, Clock, MapPin } from "lucide-react";
import { PostulationType } from "@/lib/types/client/client.types";

interface OfferDetailsProps {
  application: PostulationType;
}

export default function OfferDetails({ application }: OfferDetailsProps) {
  return (
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
  );
}
