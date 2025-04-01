import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DetailSkeleton() {
  return (
    <div className="container mx-auto">
      <Skeleton width={150} height={32} className="mb-6" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="space-y-2">
          <Skeleton width="60%" height={36} />
          <Skeleton width="30%" height={24} />
        </div>
        <Skeleton width={100} height={28} className="mt-2 md:mt-0" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton width={200} height={24} />
            </CardHeader>
            <CardContent>
              <Skeleton count={3} width="100%" height={40} className="mb-3" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton width={200} height={24} />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Skeleton width="80%" height={20} />
                <Skeleton width="80%" height={20} />
                <Skeleton width="80%" height={20} />
                <Skeleton width="80%" height={20} />
              </div>
              <Separator />
              <Skeleton count={3} width="100%" height={16} />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton width={200} height={24} />
            </CardHeader>
            <CardContent>
              <Skeleton count={2} width="100%" height={40} className="mb-3" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
