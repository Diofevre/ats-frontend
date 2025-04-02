"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Target, Trophy, XCircle } from "lucide-react";
import { useMyStats } from "@/lib/services/client/client";
import { useClientStore } from "@/lib/store-user";
import { useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export default function ProgressSection() {
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

  const { client, loadClient } = useClientStore();

  useEffect(() => {
    if (!client) {
      loadClient();
    }
  }, [client, loadClient]);

  const { myStats, isLoading } = useMyStats(client?.token_candidat);

  const applicationStats = myStats?.etapes_actuelles || {
    soumis: 0,
    en_revision: 0,
    entretien: 0,
    accepte: 0,
    rejete: 0,
  };

  const quizScoresData =
    myStats?.postulations_scores?.map((postulation) => ({
      name: postulation.offre_titre,
      score: postulation.score_total,
    })) || [];

  const totalApplications = Object.values(applicationStats).reduce((a, b) => a + b, 0);

  if (isLoading) {
    return (
      <div className="space-y-6 py-8">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-64 bg-gray-100 rounded animate-pulse" />
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-5 gap-4">
          {Array(5).fill(0).map((_, index) => (
            <Card key={index} className="border-gray-200 shadow-sm">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse mb-3" />
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-100 rounded animate-pulse mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-8">
      <Card className="border-gray-200 shadow-sm hover:border-blue-300 transition-all duration-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900">Tableau de bord des candidatures</h2>
          <p className="text-sm text-gray-500 mt-1">
            Suivi de vos candidatures et performances
          </p>
          {totalApplications > 0 && (
            <div className="mt-4">
              <Progress value={(applicationStats.accepte / totalApplications) * 100} className="h-2" />
              <p className="text-sm text-gray-600 mt-2">
                Taux de réussite: {((applicationStats.accepte / totalApplications) * 100).toFixed(1)}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-5 gap-4">
        <motion.div variants={itemVariants}>
          <Card className="border-gray-200 shadow-sm hover:border-blue-300 transition-all duration-200">
            <CardContent className="p-6 flex flex-col items-center">
              <Target className="h-8 w-8 text-blue-500 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">{applicationStats.soumis}</h3>
              <p className="text-sm text-gray-500 mt-1">Candidatures</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-gray-200 shadow-sm hover:border-blue-300 transition-all duration-200">
            <CardContent className="p-6 flex flex-col items-center">
              <Clock className="h-8 w-8 text-amber-500 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">{applicationStats.en_revision}</h3>
              <p className="text-sm text-gray-500 mt-1">En cours</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-gray-200 shadow-sm hover:border-blue-300 transition-all duration-200">
            <CardContent className="p-6 flex flex-col items-center">
              <CheckCircle className="h-8 w-8 text-emerald-500 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">{applicationStats.entretien}</h3>
              <p className="text-sm text-gray-500 mt-1">Entretiens</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-gray-200 shadow-sm hover:border-blue-300 transition-all duration-200">
            <CardContent className="p-6 flex flex-col items-center">
              <Trophy className="h-8 w-8 text-purple-500 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">{applicationStats.accepte}</h3>
              <p className="text-sm text-gray-500 mt-1">Acceptées</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-gray-200 shadow-sm hover:border-blue-300 transition-all duration-200">
            <CardContent className="p-6 flex flex-col items-center">
              <XCircle className="h-8 w-8 text-red-500 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">{applicationStats.rejete}</h3>
              <p className="text-sm text-gray-500 mt-1">Refusées</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Card className="border-gray-200 shadow-sm hover:border-blue-300 transition-all duration-200">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 uppercase">Résultats des évaluations</h3>
          {quizScoresData.length > 0 ? (
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-3">
              {quizScoresData.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  <span className="text-gray-700 font-medium">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <Progress value={(item.score / 5) * 100} className="w-24 h-2" />
                    <span className="font-semibold px-6 py-1 bg-blue-100 text-blue-700 rounded-full text-">
                      {item.score}/5
                    </span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <p className="text-gray-500 italic">Aucune évaluation disponible</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}