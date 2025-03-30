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

const applicationStats = {
  total: 12,
  enAttente: 5,
  entretien: 3,
  acceptees: 2,
  refusees: 2,
};

const applicationStatusData = [
  { name: "En attente", value: 5, color: "#EAB308" },
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Ma progression</h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Target className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="text-xl font-bold">{applicationStats.total}</h3>
                <p className="text-gray-600">Candidatures totales</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Clock className="h-8 w-8 text-yellow-500 mb-2" />
                <h3 className="text-xl font-bold">
                  {applicationStats.enAttente}
                </h3>
                <p className="text-gray-600">En attente</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                <h3 className="text-xl font-bold">
                  {applicationStats.entretien}
                </h3>
                <p className="text-gray-600">Entretiens</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Trophy className="h-8 w-8 text-purple-500 mb-2" />
                <h3 className="text-xl font-bold">
                  {applicationStats.acceptees}
                </h3>
                <p className="text-gray-600">Offres acceptées</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Statut des candidatures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
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
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Scores des quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={quizScoresData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3B82F6" />
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
