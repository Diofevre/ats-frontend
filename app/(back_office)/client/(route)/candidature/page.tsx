"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Eye,
  Frown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Types
interface Application {
  id: string;
  offre: {
    id: string;
    titre: string;
    entreprise: string;
    lieu: string;
    pays: string;
    type_emploi: string;
    salaire: string;
    devise: string;
    description: string;
  };
  status: "En attente" | "Entretien" | "Acceptée" | "Refusée";
  date_candidature: string;
  derniere_mise_a_jour: string;
}

// Mock data
const mockApplications: Application[] = [
  {
    id: "app1",
    offre: {
      id: "job1",
      titre: "Développeur Frontend React",
      entreprise: "TechCorp",
      lieu: "Paris",
      pays: "France",
      type_emploi: "CDI",
      salaire: "45000",
      devise: "€/an",
      description:
        "Poste de développeur frontend spécialisé en React et Next.js",
    },
    status: "En attente",
    date_candidature: "2023-10-15",
    derniere_mise_a_jour: "2023-10-20",
  },
  {
    id: "app2",
    offre: {
      id: "job2",
      titre: "UX Designer Senior",
      entreprise: "DesignStudio",
      lieu: "Lyon",
      pays: "France",
      type_emploi: "CDD",
      salaire: "40000",
      devise: "€/an",
      description:
        "Conception d'interfaces utilisateur pour applications web et mobile",
    },
    status: "Entretien",
    date_candidature: "2023-09-28",
    derniere_mise_a_jour: "2023-10-18",
  },
  {
    id: "app3",
    offre: {
      id: "job3",
      titre: "Développeur Backend Node.js",
      entreprise: "ServerSolutions",
      lieu: "Marseille",
      pays: "France",
      type_emploi: "CDI",
      salaire: "48000",
      devise: "€/an",
      description:
        "Développement d'APIs et services backend avec Node.js et Express",
    },
    status: "Acceptée",
    date_candidature: "2023-09-10",
    derniere_mise_a_jour: "2023-10-15",
  },
];

const statusColors = {
  "En attente": "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
  Entretien: "bg-blue-50 text-blue-700 hover:bg-blue-100",
  Acceptée: "bg-green-50 text-green-700 hover:bg-green-100",
  Refusée: "bg-red-50 text-red-700 hover:bg-red-100",
};

export default function Candidature() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredApplications = mockApplications.filter(
    (app) =>
      app.offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.offre.entreprise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleViewDetails = (applicationId: string) => {
    router.push(`/client/candidature/${applicationId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mes candidatures</h2>
        <div className="relative w-64">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Rechercher..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12">
          <Frown className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Aucune candidature trouvée
          </h3>
          <p className="text-gray-600">
            Vous n&apos;avez pas encore postulé à des offres ou votre recherche
            n&apos;a donné aucun résultat.
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4">
          {filteredApplications.map((application) => (
            <motion.div
              key={application.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}>
              <Card className="hover:shadow-md transition-all duration-300 rounded-[12px]">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="space-y-3">
                      <div>
                        <Badge
                          variant="secondary"
                          className={`mb-2 ${
                            statusColors[application.status]
                          }`}>
                          {application.status}
                        </Badge>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {application.offre.titre}
                        </h3>
                        <div className="text-base font-medium text-blue-600">
                          {application.offre.entreprise}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {`${application.offre.lieu}, ${application.offre.pays}`}
                        </motion.div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center text-gray-600">
                          <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                          {application.offre.type_emploi}
                        </motion.div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {`Candidature: ${new Date(
                            application.date_candidature
                          ).toLocaleDateString()}`}
                        </motion.div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {`Mise à jour: ${new Date(
                            application.derniere_mise_a_jour
                          ).toLocaleDateString()}`}
                        </motion.div>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-3 md:min-w-[140px]">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                          className="flex-1 bg-blue-600/90 hover:bg-blue-700 rounded-[12px] w-full h-10"
                          onClick={() => handleViewDetails(application.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Détails
                        </Button>
                      </motion.div>
                      {application.status === "Entretien" && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}>
                          <Link href={`#`}>
                            <Button
                              variant="outline"
                              className="flex-1 rounded-[12px] w-full h-10">
                              Quiz
                            </Button>
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
