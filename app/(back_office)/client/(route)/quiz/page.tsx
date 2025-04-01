"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const staticQuizData = [
  {
    id: 1,
    title: "Quiz 1: React & Next.js",
    status: "Terminé",
    score: 15,
    total: 20,
  },
  {
    id: 2,
    title: "Quiz 2: Principes UX",
    status: "À faire",
    score: null,
    total: 20,
  },
  {
    id: 3,
    title: "Quiz 3: Node.js & Express",
    status: "En cours",
    score: null,
    total: 20,
  },
];

export default function QuizPage() {
  const router = useRouter();
  return (
    <div className="mx-auto px-6 py-8 bg-gray-50 rounded-xl min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Evaluations</h1>
        </div>
      </div>

      <Card className="bg-white border border-gray-200 rounded-xl transition-all duration-200 hover:border-blue-300">
        <CardHeader className="border-b border-gray-100 px-6 py-4">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Liste des quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {staticQuizData.map((quiz) => (
            <div
              key={quiz.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200 hover:bg-gray-100 hover:border-blue-300">
              <div className="flex items-center gap-4">
                {quiz.status === "Terminé" && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
                {quiz.status === "À faire" && (
                  <PlayCircle className="h-6 w-6 text-blue-500" />
                )}
                {quiz.status === "En cours" && (
                  <Clock className="h-6 w-6 text-yellow-500" />
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {quiz.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded-full",
                        quiz.status === "Terminé" &&
                          "bg-green-100 text-green-800",
                        quiz.status === "À faire" &&
                          "bg-blue-100 text-blue-800",
                        quiz.status === "En cours" &&
                          "bg-yellow-100 text-yellow-800"
                      )}>
                      {quiz.status}
                    </Badge>
                    {quiz.score !== null && (
                      <span className="text-sm text-gray-600">
                        {quiz.score}/{quiz.total} -{" "}
                        {((quiz.score / quiz.total) * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button
                onClick={() => router.push("/quiz/1/start")}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                  quiz.status === "Terminé"
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600 hover:ring-2 hover:ring-blue-200"
                )}>
                {quiz.status === "Terminé" ? "Revoir" : "Commencer"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
