"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertTriangle, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const staticQuiz = {
  id: 1,
  title: "Quiz 1: React & Next.js",
  questions: [
    {
      id: 1,
      text: "Quel est le rôle de useEffect dans React ?",
      options: [
        { id: "a", text: "Gérer les états" },
        { id: "b", text: "Exécuter du code après le rendu" },
        { id: "c", text: "Créer des composants" },
        { id: "d", text: "Styliser les éléments" },
      ],
      correctAnswer: "b",
    },
    {
      id: 2,
      text: "Que fait Next.js par défaut avec les pages ?",
      options: [
        { id: "a", text: "Les rend côté client" },
        { id: "b", text: "Les pré-rend côté serveur" },
        { id: "c", text: "Les compile en Python" },
        { id: "d", text: "Les supprime après chargement" },
      ],
      correctAnswer: "b",
    },
    {
      id: 3,
      text: "Quel hook gère les états dans React ?",
      options: [
        { id: "a", text: "useState" },
        { id: "b", text: "useEffect" },
        { id: "c", text: "useContext" },
        { id: "d", text: "useReducer" },
      ],
      correctAnswer: "a",
    },
  ],
};

const INITIAL_TIME = 300;

export default function StartQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("quizTimeLeft");
    return savedTime ? parseInt(savedTime, 10) : INITIAL_TIME;
  });

  const totalQuestions = staticQuiz.questions.length;
  const currentQuestion = staticQuiz.questions[currentQuestionIndex];

  useEffect(() => {
    if (submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem("quizTimeLeft", newTime.toString());
        if (newTime <= 0) {
          setSubmitted(true);
          localStorage.removeItem("quizTimeLeft");
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleSubmit = () => {
    localStorage.removeItem("quizTimeLeft");
    alert("Quiz soumis !");
  };

  return (
    <div className="container mx-auto px-6 py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => {
              if (
                confirm(
                  "Voulez-vous vraiment quitter le quiz ? Votre progression ne sera pas sauvegardée."
                )
              ) {
                window.history.back();
              }
            }}
            className="text-gray-600 border hover:text-red-600 hover:bg-red-100 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200">
            <AlertTriangle className="h-5 w-5" />
            Quitter
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            {staticQuiz.title}
          </h1>
        </div>
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <Clock className="h-5 w-5 text-blue-500" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Contenu du quiz */}
      <Card className="bg-white border border-gray-200 rounded-xl transition-all duration-200 hover:border-blue-300">
        <CardHeader className="border-b border-gray-100 px-6 py-4">
          <CardTitle className="text-xl font-semibold text-gray-800">
            {submitted
              ? "Quiz terminé"
              : `Question ${currentQuestionIndex + 1} sur ${totalQuestions}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex flex-col md:flex-row gap-6">
          {/* Question à gauche */}
          <div className="flex-1 space-y-6">
            {submitted || timeLeft <= 0 ? (
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {timeLeft <= 0 ? "Temps écoulé !" : "Prêt à soumettre"}
                </h2>
                <Button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:ring-2 hover:ring-blue-200 w-full">
                  Soumettre
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 transition-all duration-200 hover:bg-gray-100 hover:border-blue-300">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {currentQuestion.text}
                  </h3>
                  <RadioGroup
                    value={answers[currentQuestion.id] || ""}
                    onValueChange={handleAnswerChange}
                    className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <RadioGroupItem
                          value={option.id}
                          id={`${currentQuestion.id}-${option.id}`}
                          className="text-blue-500 border-gray-300 focus:ring-blue-200"
                        />
                        <Label
                          htmlFor={`${currentQuestion.id}-${option.id}`}
                          className="text-gray-700 cursor-pointer hover:text-blue-600 transition-colors duration-200">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id]}
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:ring-2 hover:ring-blue-200 w-full">
                  {currentQuestionIndex === totalQuestions - 1
                    ? "Terminer"
                    : "Suivant"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Grille des numéros de questions à droite */}
          <div className="">
            <div className="flex flex-wrap gap-4 justify-end">
              {staticQuiz.questions.map((question, index) => (
                <div
                  key={question.id}
                  className={cn(
                    "flex items-center justify-center h-12 w-12 rounded-xl border border-gray-200 text-gray-700 font-medium transition-all duration-200",
                    index === currentQuestionIndex &&
                      "bg-blue-500 text-white border-blue-500",
                    index < currentQuestionIndex &&
                      "bg-gray-200 text-gray-500 opacity-50 cursor-not-allowed"
                  )}>
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
