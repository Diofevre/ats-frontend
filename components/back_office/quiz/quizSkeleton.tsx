import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function QuizSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex-1">
          <Skeleton className="h-10 w-40 mb-2" />
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <Skeleton className="h-12 w-32 rounded-xl" />
      </div>

      <Card className="rounded-xl border-0 bg-white dark:bg-slate-800 shadow-md overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Skeleton className="h-2 w-full mb-6" />

          <div className="space-y-6">
            <Skeleton className="h-20 w-full rounded-lg" />

            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Skeleton className="h-10 w-32 rounded-xl" />
              <Skeleton className="h-10 w-32 rounded-xl" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2 justify-center mt-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="w-10 h-10 rounded-full" />
        ))}
      </div>
    </div>
  );
}
