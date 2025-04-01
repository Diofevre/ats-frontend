import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, CardContent } from "@/components/ui/card";

export default function CandidatureCardSkeleton() {
  return (
    <div className="hover:shadow-md transition-all duration-300">
      <Card className="rounded-[12px] border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div className="space-y-3 w-full">
              <div>
                <Skeleton width={80} height={20} className="mb-2" />
                <Skeleton width="70%" height={24} className="mb-2" />
                <Skeleton width="40%" height={20} className="mb-2" />
                <Skeleton count={1} width="90%" height={16} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Skeleton width="80%" height={16} />
                <Skeleton width="80%" height={16} />
                <Skeleton width="80%" height={16} />
                <Skeleton width="80%" height={16} />
              </div>
            </div>
            <div className="flex md:flex-col gap-3 md:min-w-[140px]">
              <Skeleton width="100%" height={40} className="rounded-[12px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
