"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Types
interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
}

interface QuizResult {
  titre: string;
  score: number;
  maxScore: number;
  percentage: number;
  answers: {
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
  }[];
  questions: Question[];
}

// Données statiques
const staticResult: QuizResult = {
  titre: "Évaluation React & Next.js",
  score: 4,
  maxScore: 5,
  percentage: 80,
  answers: [
    { questionId: "q1", selectedOptionId: "a", isCorrect: true },
    { questionId: "q2", selectedOptionId: "c", isCorrect: true },
    { questionId: "q3", selectedOptionId: "b", isCorrect: true },
    { questionId: "q4", selectedOptionId: "a", isCorrect: true },
    { questionId: "q5", selectedOptionId: "b", isCorrect: false },
  ],
  questions: [
    {
      id: "q1",
      text: "Quelle méthode de cycle de vie React est appelée après qu'un composant a été monté dans le DOM ?",
      options: [
        { id: "a", text: "componentDidMount" },
        { id: "b", text: "componentWillMount" },
        { id: "c", text: "componentDidUpdate" },
        { id: "d", text: "componentWillUpdate" },
      ],
      correctOptionId: "a",
    },
    {
      id: "q2",
      text: "Quelle est la différence principale entre les Server Components et les Client Components dans Next.js ?",
      options: [
        {
          id: "a",
          text: "Les Server Components sont plus rapides mais moins interactifs",
        },
        { id: "b", text: "Les Client Components sont rendus côté serveur" },
        {
          id: "c",
          text: "Les Server Components sont rendus côté serveur et n'incluent pas de JavaScript client",
        },
        { id: "d", text: "Il n'y a pas de différence significative" },
      ],
      correctOptionId: "c",
    },
    {
      id: "q3",
      text: "Quelle est la meilleure façon de gérer les effets de bord dans un composant fonctionnel React ?",
      options: [
        { id: "a", text: "Utiliser componentDidMount" },
        { id: "b", text: "Utiliser le hook useEffect" },
        { id: "c", text: "Utiliser des variables globales" },
        { id: "d", text: "Utiliser des classes au lieu de fonctions" },
      ],
      correctOptionId: "b",
    },
    {
      id: "q4",
      text: "Comment optimiser les performances d'un composant React qui re-render trop souvent ?",
      options: [
        { id: "a", text: "Utiliser React.memo pour mémoiser le composant" },
        { id: "b", text: "Ajouter plus d'états locaux" },
        { id: "c", text: "Augmenter la complexité du composant" },
        { id: "d", text: "Utiliser setTimeout pour retarder les renders" },
      ],
      correctOptionId: "a",
    },
    {
      id: "q5",
      text: "Quelle est la principale différence entre le App Router et le Pages Router dans Next.js ?",
      options: [
        { id: "a", text: "Le App Router est plus ancien et moins performant" },
        { id: "b", text: "Le Pages Router supporte les Server Components" },
        {
          id: "c",
          text: "Le App Router utilise un système de fichiers pour le routing et supporte les Server Components",
        },
        { id: "d", text: "Il n'y a pas de différence significative" },
      ],
      correctOptionId: "c",
    },
  ],
};

export default function StaticQuizResultsPage() {
  const result = staticResult;
  const router = useRouter();

  const getScoreColor = (percentage: number) =>
    percentage >= 80
      ? "text-green-600"
      : percentage >= 60
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="container mx-auto py-12 px-6  min-h-screen">
      {/* En-tête */}
      <div className="flex max-w-3xl mx-auto  items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-800">{result.titre}</h1>
        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
      </div>

      {/* Résumé des Résultats */}
      <Card className="max-w-3xl mx-auto border border-gray-200 rounded-xl mb-12">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-semibold text-gray-700">
            Résultats
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          {/* Score Principal */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-4 border-gray-200 flex items-center justify-center">
                <span
                  className={`text-3xl font-bold ${getScoreColor(
                    result.percentage
                  )}`}>
                  {result.percentage}%
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">Score global</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 border border-gray-200 rounded-md">
                <p className="text-xl font-semibold text-green-600">
                  {result.answers.filter((a) => a.isCorrect).length}
                </p>
                <p className="text-sm text-gray-600">Correctes</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md">
                <p className="text-xl font-semibold text-red-600">
                  {result.answers.filter((a) => !a.isCorrect).length}
                </p>
                <p className="text-sm text-gray-600">Incorrectes</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md">
                <p className="text-xl font-semibold text-gray-700">
                  {result.maxScore}
                </p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </div>

          {/* Bouton */}
          <div className="flex justify-end">
            <Button
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              onClick={() => console.log("Retour au tableau de bord")}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Terminé
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Détail des Réponses */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Détail des réponses
        </h2>
        <div className="space-y-6">
          {result.questions.map((question, index) => {
            const answer = result.answers.find(
              (a) => a.questionId === question.id
            );
            const correctOption = question.options.find(
              (o) => o.id === question.correctOptionId
            );

            return (
              <Card
                key={question.id}
                className="border border-gray-200 rounded-xl">
                <CardHeader className="border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="text-gray-600 border-gray-300">
                      Question {index + 1}
                    </Badge>
                    <Badge
                      className={
                        answer?.isCorrect
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }>
                      {answer?.isCorrect ? "Correcte" : "Incorrecte"}
                    </Badge>
                  </div>
                  {answer?.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    {question.text}
                  </h3>
                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <div
                        key={option.id}
                        className={`p-3 border rounded-md flex justify-between items-center transition-colors duration-200 ${
                          option.id === question.correctOptionId
                            ? "border-green-300 bg-green-50"
                            : option.id === answer?.selectedOptionId &&
                              !answer.isCorrect
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200 bg-white"
                        }`}>
                        <span className="text-gray-700">{option.text}</span>
                        {option.id === question.correctOptionId ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : option.id === answer?.selectedOptionId &&
                          !answer.isCorrect ? (
                          <XCircle className="h-4 w-4 text-red-600" />
                        ) : null}
                      </div>
                    ))}
                  </div>
                  {!answer?.isCorrect && (
                    <div className="mt-2">
                      <span className="font-medium text-gray-700">
                        Réponse correcte :{" "}
                      </span>
                      <span className="text-green-600">
                        {correctOption?.text}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
