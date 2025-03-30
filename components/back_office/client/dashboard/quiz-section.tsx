"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Clock, Frown } from "lucide-react";
import Link from "next/link";

interface Quiz {
  id: string;
  offre_id: string;
  titre_offre: string;
  entreprise: string;
  titre_quiz: string;
  description: string;
  duree_minutes: number;
  nombre_questions: number;
  date_limite: string;
  status: "À faire" | "Terminé" | "Expiré";
}

const mockQuizzes: Quiz[] = [
  {
    id: "quiz1",
    offre_id: "job1",
    titre_offre: "Développeur Frontend React",
    entreprise: "TechCorp",
    titre_quiz: "Évaluation React & Next.js",
    description:
      "Ce quiz évalue vos connaissances en React, Next.js et TypeScript",
    duree_minutes: 30,
    nombre_questions: 15,
    date_limite: "2023-11-30",
    status: "À faire",
  },
  {
    id: "quiz2",
    offre_id: "job2",
    titre_offre: "UX Designer Senior",
    entreprise: "DesignStudio",
    titre_quiz: "Principes de design UX",
    description:
      "Évaluation des connaissances en design d'expérience utilisateur",
    duree_minutes: 25,
    nombre_questions: 12,
    date_limite: "2023-11-25",
    status: "Terminé",
  },
  {
    id: "quiz3",
    offre_id: "job3",
    titre_offre: "Développeur Backend Node.js",
    entreprise: "ServerSolutions",
    titre_quiz: "Node.js & Express",
    description:
      "Test de compétences sur Node.js, Express et les bases de données",
    duree_minutes: 40,
    nombre_questions: 20,
    date_limite: "2023-10-15",
    status: "Expiré",
  },
];

const statusColors = {
  "À faire": "bg-blue-50 text-blue-700 hover:bg-blue-100",
  Terminé: "bg-green-50 text-green-700 hover:bg-green-100",
  Expiré: "bg-red-50 text-red-700 hover:bg-red-100",
};

export default function QuizSection() {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Quiz à compléter</h2>
      </div>

      {mockQuizzes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12">
          <Frown className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Aucun quiz disponible
          </h3>
          <p className="text-gray-600">
            Vous n&apos;avez pas encore de quiz à compléter pour vos
            candidatures.
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-4">
          {mockQuizzes.map((quiz) => (
            <motion.div
              key={quiz.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}>
              <Card className="h-full hover:shadow-md transition-all duration-300 rounded-[12px]">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge
                      variant="secondary"
                      className={`${statusColors[quiz.status]}`}>
                      {quiz.status}
                    </Badge>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-sm text-gray-600">{`${quiz.duree_minutes} min`}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-2">
                    {quiz.titre_quiz}
                  </CardTitle>
                  <div className="text-blue-600 font-medium text-sm">{`${quiz.titre_offre} - ${quiz.entreprise}`}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{quiz.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-gray-400" />
                      {`${quiz.nombre_questions} questions`}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {`Limite: ${new Date(
                        quiz.date_limite
                      ).toLocaleDateString()}`}
                    </div>
                  </div>

                  <div className="pt-2">
                    {quiz.status === "À faire" ? (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        <Link href={`/dashboard/quiz/${quiz.id}/start`}>
                          <Button className="w-full bg-blue-600/90 hover:bg-blue-700 rounded-[12px]">
                            Commencer le quiz
                          </Button>
                        </Link>
                      </motion.div>
                    ) : quiz.status === "Terminé" ? (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        <Link href={`/dashboard/quiz/${quiz.id}/results`}>
                          <Button
                            variant="outline"
                            className="w-full rounded-[12px]">
                            Voir les résultats
                          </Button>
                        </Link>
                      </motion.div>
                    ) : (
                      <Button
                        disabled
                        className="w-full rounded-[12px] opacity-70">
                        Quiz expiré
                      </Button>
                    )}
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
