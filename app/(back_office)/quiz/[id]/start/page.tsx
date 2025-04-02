"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import HeaderSection from "@/components/back_office/quiz/headerSection";
import { useClientStore } from "@/lib/store-user";
import { useQuizById } from "@/lib/services/client/procecus";

// Types
interface Reponse {
  id: number;
  is_true: boolean;
  label: string;
  question_id: number;
}

interface Question {
  id: number;
  label: string;
  ordre: number;
  processus_id: number;
  reponses: Reponse[];
}

interface Quiz {
  id: number;
  titre: string;
  type: string;
  description: string;
  statut: string;
  duree: number;
  offre_id: number;
  ordre: number;
  created_at: string;
  updated_at: string;
  questions: Question[];
}

// Composant Loader personnalisé
const QuizLoader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="container mx-auto px-6 py-8 flex flex-col items-center justify-center min-h-[50vh]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
      <Loader2 className="h-12 w-12 text-blue-500" />
    </motion.div>
    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
      Chargement du quiz en cours...
    </p>
  </motion.div>
);

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;

  const { client, loadClient } = useClientStore();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { quiz: fetchedQuiz, isLoading } = useQuizById(Number(quizId));

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 0 ? `${hours}:` : ""}${
      minutes < 10 && hours > 0 ? "0" : ""
    }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }, []);

  useEffect(() => {
    if (!client) loadClient();

    const loadQuiz = async () => {
      try {
        if (fetchedQuiz) {
          setQuiz(fetchedQuiz);
          setTimeLeft(fetchedQuiz.duree * 60);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du quiz:", error);
      }
    };

    loadQuiz();
  }, [quizId, client, loadClient, fetchedQuiz]);

  // Gestion du timer
  useEffect(() => {
    if (!quiz || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timeLeft === 0) handleSubmitQuiz();

    return () => clearInterval(timer);
  }, [quiz, timeLeft]);

  // Gestion des réponses
  const handleSelectAnswer = (questionId: number, reponseId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: reponseId }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length ?? 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = useCallback(() => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push(`/quiz/${quizId}/results`);
    }, 1500);
  }, [quizId, router]);

  if (isLoading) {
    return <QuizLoader />;
  }

  if (!quiz) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-6 py-8 flex flex-col items-center justify-center min-h-[50vh]">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
          Une erreur est survenue lors du chargement du quiz.
        </p>
        <Button
          onClick={() => router.push("/client/candidature")}
          className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour aux candidatures
        </Button>
      </motion.div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isQuestionAnswered = answers[currentQuestion.id] !== undefined;
  const allQuestionsAnswered = quiz.questions.every(
    (q) => answers[q.id] !== undefined
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <HeaderSection
        title={quiz.titre}
        description={quiz.description}
        onBack={() => router.push("/client/candidature")}
        timeLeft={formatTime(timeLeft)}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8">
        <Card className="rounded-xl border-0 bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-slate-900 dark:text-white text-xl">
                  Question {currentQuestionIndex + 1} / {quiz.questions.length}
                </CardTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {quiz.type === "QUESTIONNAIRE"
                    ? "Choisissez une réponse"
                    : "Répondez"}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-slate-500">
                <span>Progression</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6">
                <h3 className="text-xl font-medium text-slate-900 dark:text-white p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-700">
                  {currentQuestion.label}
                </h3>

                <RadioGroup
                  value={answers[currentQuestion.id]?.toString()}
                  onValueChange={(value) =>
                    handleSelectAnswer(currentQuestion.id, Number(value))
                  }
                  className="space-y-3">
                  {currentQuestion.reponses.map((reponse, idx) => (
                    <motion.div
                      key={reponse.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={reponse.id.toString()}
                          id={`option-${reponse.id}`}
                          className="peer"
                        />
                        <Label
                          htmlFor={`option-${reponse.id}`}
                          className="flex-1 cursor-pointer rounded-xl border-2 p-4 peer-data-[state=checked]:border-blue-500 dark:peer-data-[state=checked]:border-blue-400 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-900/20 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all duration-200">
                          {reponse.label}
                        </Label>
                      </div>
                    </motion.div>
                  ))}
                </RadioGroup>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8 gap-4">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex-1 rounded-xl">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Précédent
              </Button>
              {isLastQuestion ? (
                <Button
                  onClick={handleSubmitQuiz}
                  disabled={!allQuestionsAnswered || isSubmitting}
                  className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="mr-2">
                        <Clock className="h-4 w-4" />
                      </motion.div>
                      Soumission...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Terminer
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  disabled={!isQuestionAnswered}
                  className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                  Suivant
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-2 justify-center mt-6">
          {quiz.questions.map((question, index) => (
            <Button
              key={question.id}
              variant={answers[question.id] ? "default" : "outline"}
              size="sm"
              className={`w-10 h-10 p-0 rounded-full ${
                answers[question.id]
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                  : "border-2"
              } ${
                currentQuestionIndex === index ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setCurrentQuestionIndex(index)}>
              {index + 1}
            </Button>
          ))}
        </motion.div>

        <AnimatePresence>
          {!allQuestionsAnswered && isLastQuestion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 flex items-center justify-center text-amber-600 bg-amber-50 p-3 rounded-lg">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="text-sm">
                Répondez à toutes les questions avant de soumettre
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
