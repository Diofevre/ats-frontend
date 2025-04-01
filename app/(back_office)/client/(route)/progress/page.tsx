"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Target, Trophy, XCircle } from "lucide-react";
import { useMyStats } from "@/lib/services/client/client";
import { useClientStore } from "@/lib/store-user";
import { useEffect } from "react";

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

  if (isLoading) {
    return (
      <div className="space-y-4 px-6 py-8 bg-gray-50 rounded-xl mt-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 transition-all duration-200 hover:border-blue-300">
          <h2 className="text-2xl font-semibold text-gray-900">
            Ma progression
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Suivez vos statistiques et performances
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-6">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Card
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-sm animate-pulse transition-all duration-200 hover:border-blue-300">
                <CardContent className="pt-6 pb-4 flex flex-col items-center">
                  <div className="h-8 w-8 bg-gray-200 rounded-full mb-3" />
                  <div className="h-8 w-12 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-200 rounded mt-2" />
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-6 py-8 bg-gray-50 rounded-xl mt-4">
      <div className="bg-white p-6 rounded-xl border border-gray-200 transition-all duration-200 hover:border-blue-300">
        <h2 className="text-2xl font-semibold text-gray-900">Ma progression</h2>
        <p className="text-sm text-gray-500 mt-1">
          Suivez vos statistiques et performances
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-5 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-200 hover:border-blue-300">
            <CardContent className="pt-6 pb-4 flex flex-col items-center">
              <Target className="h-8 w-8 text-blue-500 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">
                {applicationStats.soumis}
              </h3>
              <p className="text-sm text-gray-500 mt-1">Totales</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-200 hover:border-blue-300">
            <CardContent className="pt-6 pb-4 flex flex-col items-center">
              <Clock className="h-8 w-8 text-yellow-500 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">
                {applicationStats.en_revision}
              </h3>
              <p className="text-sm text-gray-500 mt-1">En attente</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-200 hover:border-blue-300">
            <CardContent className="pt-6 pb-4 flex flex-col items-center">
              <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">
                {applicationStats.entretien}
              </h3>
              <p className="text-sm text-gray-500 mt-1">Entretiens</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-200 hover:border-blue-300">
            <CardContent className="pt-6 pb-4 flex flex-col items-center">
              <Trophy className="h-8 w-8 text-purple-500 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">
                {applicationStats.accepte}
              </h3>
              <p className="text-sm text-gray-500 mt-1">Acceptées</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-200 hover:border-blue-300">
            <CardContent className="pt-6 pb-4 flex flex-col items-center">
              <XCircle className="h-8 w-8 text-red-500 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">
                {applicationStats.rejete}
              </h3>
              <p className="text-sm text-gray-500 mt-1">Rejetées</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-200 hover:border-blue-300">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Scores des quiz
          </h3>
          {quizScoresData.length > 0 ? (
            <ul className="space-y-3">
              {quizScoresData.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100">
                  <span className="text-gray-700 font-medium">{item.name}</span>
                  <span className="font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {item.score}/100
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Aucun score disponible</p>
          )}
        </CardContent>
      </div>
    </div>
  );
}
