"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { CheckCircle, Clock, Target, Trophy } from "lucide-react";
// import { useMyStats } from "@/lib/services/client/client";
import { useClientStore } from "@/lib/store-user";
import { useEffect } from "react";

const applicationStats = {
  total: 12,
  enAttente: 5,
  entretien: 3,
  acceptees: 2,
  refusees: 2,
};

const applicationStatusData = [
  { name: "En attente", value: 5, color: "#FACC15" },
  { name: "Entretien", value: 3, color: "#3B82F6" },
  { name: "Acceptées", value: 2, color: "#22C55E" },
  { name: "Refusées", value: 2, color: "#EF4444" },
];

const quizScoresData = [
  { name: "React & Next.js", score: 85 },
  { name: "Principes UX", score: 92 },
  { name: "Node.js & Express", score: 78 },
];

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

  // const { myStats, isLoading } = useMyStats(client?.token_candidat);

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Ma progression</h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-gray-200 rounded-xl transition-all duration-200 hover:border-blue-300">
            <CardContent className="pt-6 pb-4 flex flex-col items-center">
              <Target className="h-8 w-8 text-blue-500 mb-3" />
              <h3 className="text-2xl font-semibold text-gray-900">
                {applicationStats.total}
              </h3>
              <p className="text-sm text-gray-600">Candidatures totales</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-gray-200 rounded-xl transition-all duration-200 hover:border-yellow-300">
            <CardContent className="pt-6 pb-4 flex flex-col items-center">
              <Clock className="h-8 w-8 text-yellow-500 mb-3" />
              <h3 className="text-2xl font-semibold text-gray-900">
                {applicationStats.enAttente}
              </h3>
              <p className="text-sm text-gray-600">En attente</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-gray-200 rounded-xl transition-all duration-200 hover:border-green-300">
            <CardContent className="pt-6 pb-4 flex flex-col items-center">
              <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
              <h3 className="text-2xl font-semibold text-gray-900">
                {applicationStats.entretien}
              </h3>
              <p className="text-sm text-gray-600">Entretiens</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-gray-200 rounded-xl transition-all duration-200 hover:border-purple-300">
            <CardContent className="pt-6 pb-4 flex flex-col items-center">
              <Trophy className="h-8 w-8 text-purple-500 mb-3" />
              <h3 className="text-2xl font-semibold text-gray-900">
                {applicationStats.acceptees}
              </h3>
              <p className="text-sm text-gray-600">Offres acceptées</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Graphiques */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-gray-200 rounded-xl h-full transition-all duration-200 hover:border-blue-300">
            <CardHeader className="border-b border-gray-100 px-6 py-4">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Statut des candidatures
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={applicationStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }>
                      {applicationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-gray-200 rounded-xl h-full transition-all duration-200 hover:border-blue-300">
            <CardHeader className="border-b border-gray-100 px-6 py-4">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Scores des quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={quizScoresData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis domain={[0, 100]} stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "8px",
                      }}
                    />
                    <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
