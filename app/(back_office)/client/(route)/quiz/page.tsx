"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, PlayCircle, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const staticQuizData = [
  {
    id: 1,
    title: "Modern Web Development with React & Next.js",
    description: "Test your knowledge of React fundamentals and Next.js features",
    status: "completed",
    score: 15,
    total: 20,
    timeEstimate: "20 min",
    questions: 20,
  },
  {
    id: 2,
    title: "UX Design Principles & Best Practices",
    description: "Evaluate your understanding of user experience design principles",
    status: "pending",
    score: null,
    total: 20,
    timeEstimate: "25 min",
    questions: 20,
  },
  {
    id: 3,
    title: "Backend Development with Node.js",
    description: "Test your Node.js and Express.js knowledge",
    status: "in-progress",
    score: null,
    total: 20,
    timeEstimate: "30 min",
    questions: 20,
  },
];

const getStatusConfig = (status: string) => {
  const configs = {
    completed: {
      icon: CheckCircle,
      iconClass: "text-emerald-500",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      label: "Completed",
    },
    pending: {
      icon: PlayCircle,
      iconClass: "text-blue-500",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      label: "Available",
    },
    "in-progress": {
      icon: Clock,
      iconClass: "text-amber-500",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
      label: "In Progress",
    },
  };
  return configs[status as keyof typeof configs];
};

export default function QuizPage() {
  const router = useRouter();

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-gray-900 uppercase">Knowledge Assessment</h1>
          <p className="text-gray-500">Test your skills and track your progress</p>
        </div>
        <div className="flex items-center gap-3">
          <Trophy className="h-5 w-5 text-amber-500" />
          <span className="text-gray-700 font-medium">Your Average: 75%</span>
        </div>
      </div>

      <Card className="bg-white border border-gray-100">
        <CardHeader className="border-b border-gray-100 px-6 py-4">
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            Available Assessments
            <Badge variant="secondary" className="ml-2">
              {staticQuizData.length} Quizzes
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {staticQuizData.map((quiz) => {
            const statusConfig = getStatusConfig(quiz.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={quiz.id}
                className="group relative bg-white rounded-lg border border-gray-100 p-6 transition-all duration-200 hover:border-blue-300 hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className={cn("mt-1", statusConfig.iconClass)}>
                      <StatusIcon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {quiz.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">{quiz.description}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge
                          variant="secondary"
                          className={cn("border", statusConfig.badgeClass)}>
                          {statusConfig.label}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {quiz.timeEstimate} • {quiz.questions} questions
                        </span>
                        {quiz.score !== null && (
                          <span className="text-sm font-medium text-gray-700">
                            Score: {quiz.score}/{quiz.total} ({((quiz.score / quiz.total) * 100).toFixed(0)}%)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => router.push(`/quiz/${quiz.id}/start`)}
                    variant={quiz.status === "completed" ? "secondary" : "default"}
                    className="min-w-[120px] rounded-[12px]">
                    {quiz.status === "completed" ? "Review" : "Start Quiz"}
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}