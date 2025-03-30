"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle } from "lucide-react";

const staticQuiz = {
  titre: "Évaluation React & Next.js",
  description:
    "Un quiz statique pour tester vos connaissances React et Next.js",
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
    },
  ],
};

export default function StaticQuizPage() {
  // État statique pour simuler une réponse sélectionnée (pas de navigation dynamique)
  const currentQuestionIndex = 0; // Fixé à la première question pour une démo statique
  const currentQuestion = staticQuiz.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / staticQuiz.questions.length) * 100;

  const handleSubmit = () => {
    // Action statique pour simuler la soumission (pas de redirection ici)
    console.log("Quiz soumis !");
  };

  return (
    <div className="container mx-auto py-10 px-6 min-h-screen">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="ghost"
          className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
          onClick={() => console.log("Retour au tableau de bord")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div className="text-lg font-semibold text-gray-700">
          Question {currentQuestionIndex + 1} / {staticQuiz.questions.length}
        </div>
      </div>

      {/* Carte du Quiz */}
      <Card className="max-w-2xl mx-auto border border-gray-200 rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {staticQuiz.titre}
          </CardTitle>
          <p className="text-sm text-gray-500">{staticQuiz.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Barre de progression */}
          <Progress value={progress} className="h-2 bg-gray-200" />

          {/* Question */}
          <h3 className="text-xl font-medium text-gray-700">
            {currentQuestion.text}
          </h3>

          {/* Options */}
          <RadioGroup defaultValue="a" className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-3 transition-transform duration-200 hover:-translate-y-0.5">
                <RadioGroupItem
                  value={option.id}
                  id={`option-${option.id}`}
                  className="peer border-gray-300 text-blue-500 focus:ring-blue-400"
                />
                <Label
                  htmlFor={`option-${option.id}`}
                  className="flex-1 cursor-pointer p-4 border border-gray-200 rounded-md text-gray-700 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 transition-colors duration-200">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>

        {/* Pied de page */}
        <div className="flex justify-end p-6">
          <Button
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
            onClick={handleSubmit}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Soumettre
          </Button>
        </div>
      </Card>

      {/* Navigation des questions (statique) */}
      <div className="flex justify-center gap-2 mt-6">
        {staticQuiz.questions.map((_, index) => (
          <Button
            key={index}
            variant={index === currentQuestionIndex ? "default" : "outline"}
            size="sm"
            className={`w-10 h-10 rounded-full border-gray-200 ${
              index === currentQuestionIndex
                ? "bg-blue-500 text-white"
                : "text-gray-600"
            } hover:bg-gray-100 transition-colors duration-200`}
            onClick={() => console.log(`Aller à la question ${index + 1}`)}>
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
