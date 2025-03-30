"use client";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Briefcase,
  Building,
  Calendar,
  Clock,
  FileText,
  MapPin,
  User,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

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
    responsabilites: string[];
    qualifications: string[];
    avantages: string[];
  };
  status: "En attente" | "Entretien" | "Acceptée" | "Refusée";
  date_candidature: string;
  derniere_mise_a_jour: string;
  notes: string;
  etapes_recrutement: {
    nom: string;
    date: string;
    status: "Complété" | "En cours" | "À venir" | "Annulé";
  }[];
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
        "Poste de développeur frontend spécialisé en React et Next.js pour travailler sur des applications web modernes et performantes.",
      responsabilites: [
        "Développer des interfaces utilisateur réactives et intuitives",
        "Collaborer avec les designers UX/UI",
        "Optimiser les performances des applications",
        "Participer aux revues de code",
      ],
      qualifications: [
        "3+ ans d'expérience en développement React",
        "Maîtrise de TypeScript et Next.js",
        "Connaissance des principes de design responsive",
        "Expérience avec les API RESTful",
      ],
      avantages: [
        "Télétravail partiel",
        "Mutuelle d'entreprise",
        "Formation continue",
        "Tickets restaurant",
      ],
    },
    status: "En attente",
    date_candidature: "2023-10-15",
    derniere_mise_a_jour: "2023-10-20",
    notes: "Entretien technique prévu pour la semaine prochaine",
    etapes_recrutement: [
      {
        nom: "Candidature soumise",
        date: "2023-10-15",
        status: "Complété",
      },
      {
        nom: "Examen du CV",
        date: "2023-10-18",
        status: "Complété",
      },
      {
        nom: "Entretien RH",
        date: "2023-10-25",
        status: "À venir",
      },
      {
        nom: "Test technique",
        date: "2023-11-01",
        status: "À venir",
      },
      {
        nom: "Entretien final",
        date: "2023-11-10",
        status: "À venir",
      },
    ],
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
        "Conception d'interfaces utilisateur pour applications web et mobile avec focus sur l'expérience utilisateur.",
      responsabilites: [
        "Créer des wireframes et prototypes",
        "Réaliser des tests utilisateurs",
        "Analyser les parcours utilisateurs",
        "Collaborer avec l'équipe de développement",
      ],
      qualifications: [
        "5+ ans d'expérience en UX Design",
        "Maîtrise de Figma et Adobe XD",
        "Connaissance des principes d'accessibilité",
        "Portfolio démontrant des projets réussis",
      ],
      avantages: [
        "Horaires flexibles",
        "Équipement de pointe",
        "Participation aux conférences design",
        "Prime annuelle",
      ],
    },
    status: "Entretien",
    date_candidature: "2023-09-28",
    derniere_mise_a_jour: "2023-10-18",
    notes: "Premier entretien très positif, second entretien prévu",
    etapes_recrutement: [
      {
        nom: "Candidature soumise",
        date: "2023-09-28",
        status: "Complété",
      },
      {
        nom: "Examen du portfolio",
        date: "2023-10-05",
        status: "Complété",
      },
      {
        nom: "Entretien initial",
        date: "2023-10-12",
        status: "Complété",
      },
      {
        nom: "Exercice de design",
        date: "2023-10-18",
        status: "En cours",
      },
      {
        nom: "Entretien avec l'équipe",
        date: "2023-10-28",
        status: "À venir",
      },
    ],
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
        "Développement d'APIs et services backend avec Node.js et Express pour des applications à forte charge.",
      responsabilites: [
        "Concevoir et développer des APIs RESTful",
        "Optimiser les performances des bases de données",
        "Implémenter des systèmes d'authentification sécurisés",
        "Participer à l'architecture des applications",
      ],
      qualifications: [
        "4+ ans d'expérience en développement Node.js",
        "Maîtrise de Express et MongoDB",
        "Connaissance des principes de sécurité web",
        "Expérience avec les architectures microservices",
      ],
      avantages: [
        "Télétravail à 100%",
        "Assurance santé internationale",
        "Budget formation annuel",
        "Participation aux bénéfices",
      ],
    },
    status: "Acceptée",
    date_candidature: "2023-09-10",
    derniere_mise_a_jour: "2023-10-15",
    notes: "Offre acceptée, début du contrat le 1er novembre",
    etapes_recrutement: [
      {
        nom: "Candidature soumise",
        date: "2023-09-10",
        status: "Complété",
      },
      {
        nom: "Entretien téléphonique",
        date: "2023-09-15",
        status: "Complété",
      },
      {
        nom: "Test technique",
        date: "2023-09-22",
        status: "Complété",
      },
      {
        nom: "Entretien technique",
        date: "2023-09-30",
        status: "Complété",
      },
      {
        nom: "Offre d'emploi",
        date: "2023-10-10",
        status: "Complété",
      },
    ],
  },
];

const statusColors = {
  "En attente": "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
  Entretien: "bg-blue-50 text-blue-700 hover:bg-blue-100",
  Acceptée: "bg-green-50 text-green-700 hover:bg-green-100",
  Refusée: "bg-red-50 text-red-700 hover:bg-red-100",
};

const stepStatusIcons = {
  Complété: <CheckCircle className="h-5 w-5 text-green-500" />,
  "En cours": <Clock className="h-5 w-5 text-blue-500" />,
  "À venir": <AlertCircle className="h-5 w-5 text-gray-400" />,
  Annulé: <XCircle className="h-5 w-5 text-red-500" />,
};

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const applicationId = params.id as string;

  // Find the application by ID
  const application = mockApplications.find((app) => app.id === applicationId);

  if (!application) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Candidature non trouvée</h1>
        <Button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour au tableau de bord
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Retour au tableau de bord
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{application.offre.titre}</h1>
          <div className="text-xl text-blue-600">
            {application.offre.entreprise}
          </div>
        </div>
        <Badge
          variant="secondary"
          className={`mt-2 md:mt-0 text-base px-3 py-1 ${
            statusColors[application.status]
          }`}>
          {application.status}
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Détails de l&apos;offre</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">
                    {application.offre.entreprise}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{`${application.offre.lieu}, ${application.offre.pays}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">
                    {application.offre.type_emploi}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{`${application.offre.salaire} ${application.offre.devise}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{`Candidature: ${new Date(
                    application.date_candidature
                  ).toLocaleDateString()}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{`Mise à jour: ${new Date(
                    application.derniere_mise_a_jour
                  ).toLocaleDateString()}`}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{application.offre.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Responsabilités</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {application.offre.responsabilites.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Qualifications</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {application.offre.qualifications.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Avantages</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {application.offre.avantages.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {application.notes && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Notes</h3>
                    <p className="text-gray-600">{application.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {application.status === "Entretien" && (
            <Card>
              <CardHeader>
                <CardTitle>Quiz associé</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Un quiz est disponible pour cette candidature. Complétez-le
                  pour améliorer vos chances.
                </p>
                <Button
                  className="bg-blue-600/90 hover:bg-blue-700"
                  onClick={() =>
                    router.push(`/dashboard/quiz/${application.offre.id}`)
                  }>
                  Accéder au quiz
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Processus de recrutement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.etapes_recrutement.map((etape, index) => (
                  <div key={index} className="relative pl-8">
                    {index < application.etapes_recrutement.length - 1 && (
                      <div className="absolute left-[10px] top-8 w-0.5 h-full -mt-4 bg-gray-200"></div>
                    )}
                    <div className="absolute left-0 top-1">
                      {stepStatusIcons[etape.status]}
                    </div>
                    <div>
                      <h4 className="font-medium">{etape.nom}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {new Date(etape.date).toLocaleDateString()}
                      </div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {etape.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Télécharger CV
              </Button>
              <Button className="w-full" variant="outline">
                <User className="h-4 w-4 mr-2" />
                Contacter recruteur
              </Button>
              {application.status === "En attente" && (
                <Button className="w-full bg-red-500 hover:bg-red-600">
                  <XCircle className="h-4 w-4 mr-2" />
                  Retirer ma candidature
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
