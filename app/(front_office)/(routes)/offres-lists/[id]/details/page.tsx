"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Users,
  DollarSign,
  FileText,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useOneOffre } from "@/lib/services/offres/offres";
import OffreDetailsSkeleton from "@/components/offres/offreDetailsSkeleton.tsx";

export default function OffreDetails() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [idPost, setIdPost] = useState<number | undefined>();

  useEffect(() => {
    if (params?.id) {
      const decodedId = JSON.parse(decodeURIComponent(params?.id as string));
      setIdPost(decodedId);
    }
  }, [params?.id]);

  const { mockJob, isLoading } = useOneOffre(Number(idPost));

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <OffreDetailsSkeleton />
      </div>
    );
  }

  if (!mockJob) {
    return <div className="text-center py-12">Offre non trouvée</div>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center mb-8 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour aux offres
          </button>
        </div>

        <div className="mb-8">
          <Card className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg">
            <CardContent className="p-6 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {mockJob?.titre}
              </h1>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {mockJob?.status}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-white rounded-xl shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <Image
                      src={
                        mockJob?.image_url ?? "/assets/images/default-offre.png"
                      }
                      alt={mockJob?.titre}
                      width={400}
                      height={256}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6">
                    <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl py-3">
                      Postuler maintenant
                    </Button>
                  </motion.div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-700">
                      <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                      <span className="text-lg font-medium">
                        {mockJob?.salaire} {mockJob?.devise}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                      <span>
                        {mockJob?.lieu}, {mockJob?.pays}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Description
                    </h2>
                    <p className="text-gray-600">{mockJob?.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-700">
                      <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                      <span>{mockJob?.type_emploi}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users className="h-5 w-5 mr-2 text-blue-500" />
                      <span>{mockJob?.nombre_requis} poste(s) requis</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-5 w-5 mr-2 text-blue-500" />
                      <span>
                        {mockJob?.horaire_ouverture} -{" "}
                        {mockJob?.horaire_fermeture}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                      <span>
                        Créé le :{" "}
                        {new Date(mockJob?.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FileText className="h-5 w-5 mr-2 text-blue-500" />
                      <span>
                        Date limite :{" "}
                        {new Date(mockJob?.date_limite).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <Card className="bg-white rounded-xl shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Informations supplémentaires
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Utilisateur créateur :</strong> ID {mockJob?.user_id}
                </p>
                <p>
                  <strong>Dernière mise à jour :</strong>{" "}
                  {new Date(mockJob?.updated_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
