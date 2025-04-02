"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, Award, Home } from "lucide-react";
import { useClientStore } from "@/lib/store-user";
import QuizSkeleton from "@/components/back_office/quiz/quizSkeleton";

// Types
interface QuizResult {
  id: number;
  titre: string;
  score: number;
  maxScore: number;
  percentage: number;
  timeTaken: string;
  completedAt: string;
  questions: {
    id: number;
    label: string;
    userAnswer: {
      id: number;
      label: string;
      isCorrect: boolean;
    };
    correctAnswer: {
      id: number;
      label: string;
    };
  }[];
}

const mockResult: QuizResult = {
  id: 2,
  titre: "Quizz test",
  score: 1,
  maxScore: 2,
  percentage: 50,
  timeTaken: "05:23",
  completedAt: "2025-04-02T19:30:00.000Z",
  questions: [
    {
      id: 1,
      label: "Quelle est la capitale de la France ?",
      userAnswer: {
        id: 1,
        label: "Paris",
        isCorrect: true,
      },
      correctAnswer: {
        id: 1,
        label: "Paris",
      },
    },
    {
      id: 2,
      label: "Quel langage est utilisé avec Laravel ?",
      userAnswer: {
        id: 4,
        label: "Python",
        isCorrect: false,
      },
      correctAnswer: {
        id: 3,
        label: "PHP",
      },
    },
  ],
};

export default function QuizResultsPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;

  const { client, loadClient } = useClientStore();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!client) {
      loadClient();
    }

    const fetchResults = async () => {
      try {
        setResult(mockResult);
      } catch (error) {
        console.error("Failed to fetch quiz results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [quizId, client, loadClient]);

  if (isLoading) {
    return <QuizSkeleton />;
  }

  if (!result) {
    return (
      <div className="container mx-auto px-6 py-8 bg-gray-50 rounded-xl text-center">
        <h1 className="text-2xl font-bold mb-4">Résultats non trouvés</h1>
        <Button
          onClick={() => router.push("/client/candidature")}
          className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour aux candidatures
        </Button>
      </div>
    );
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (percentage >= 50) return "text-amber-600 dark:text-amber-400";
    return "text-rose-600 dark:text-rose-400";
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => router.push("/client/candidature")}
        className="mb-6 flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 -ml-2">
        <ArrowLeft className="h-4 w-4" />
        Retour aux candidatures
      </Button>

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
        Résultats du quiz
      </motion.h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">{result.titre}</p>

      <Card className="mb-8 rounded-xl border-0 bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Votre score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative mb-4">
              <div className="w-40 h-40 rounded-full flex items-center justify-center border-8 border-slate-100 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 shadow-inner">
                <span
                  className={`text-4xl font-bold ${getScoreColor(
                    result.percentage
                  )}`}>
                  {result.percentage}%
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-2 -right-2">
                <div className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-md">
                  <Award className="h-10 w-10 text-amber-500" />
                </div>
              </motion.div>
            </motion.div>

            <div className="text-center">
              <h3 className="text-xl font-semibold mb-1 text-slate-900 dark:text-white">
                {result.score} sur {result.maxScore} questions correctes
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Terminé le {new Date(result.completedAt).toLocaleDateString()}{" "}
                en {result.timeTaken}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/10 rounded-xl">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {result.questions.filter((q) => q.userAnswer.isCorrect).length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Correctes
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-900/10 rounded-xl">
              <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                {result.questions.filter((q) => !q.userAnswer.isCorrect).length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Incorrectes
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {result.maxScore}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Total
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => router.push("/client/candidature")}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <Home className="h-4 w-4 mr-2" />
              Retour aux candidatures
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
        Détail des réponses
      </h2>

      <div className="space-y-6">
        {result.questions.map((question, index) => (
          <Card
            key={question.id}
            className={`rounded-xl border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
              question.userAnswer.isCorrect
                ? "bg-gradient-to-r from-emerald-50 to-white dark:from-emerald-900/10 dark:to-slate-800"
                : "bg-gradient-to-r from-rose-50 to-white dark:from-rose-900/10 dark:to-slate-800"
            }`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="rounded-full px-3 py-1 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    Question {index + 1}
                  </Badge>
                  {question.userAnswer.isCorrect ? (
                    <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full px-3 py-1">
                      Correct
                    </Badge>
                  ) : (
                    <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 rounded-full px-3 py-1">
                      Incorrect
                    </Badge>
                  )}
                </div>
                {question.userAnswer.isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-medium text-slate-900 dark:text-white p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                {question.label}
              </h3>

              <div className="space-y-3">
                <div
                  className={`p-3 rounded-lg border-2 ${
                    question.userAnswer.id === question.correctAnswer.id
                      ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/30"
                      : "bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800/30"
                  }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Votre réponse:
                      </p>
                      <p className="text-slate-700 dark:text-slate-300 font-medium">
                        {question.userAnswer.label}
                      </p>
                    </div>
                    {question.userAnswer.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                    )}
                  </div>
                </div>

                {!question.userAnswer.isCorrect && (
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800/30">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Réponse correcte:
                        </p>
                        <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                          {question.correctAnswer.label}
                        </p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
