import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface QuizCardProps {
  offreId: number;
}

export default function QuizCard({ offreId }: QuizCardProps) {
  const router = useRouter();

  return (
    <Card className="bg-white border border-gray-200 text-gray-900 shadow-sm">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-lg text-gray-700">Quiz associé</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="mb-4 text-gray-600 text-sm">
          Un quiz est disponible pour cette candidature. Complétez-le pour
          améliorer vos chances.
        </p>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white w-full"
          onClick={() => router.push(`/client/quiz/${offreId}`)}>
          Accéder au quiz
        </Button>
      </CardContent>
    </Card>
  );
}
