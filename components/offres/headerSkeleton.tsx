import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function HeaderSkeleton() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="flex items-center space-x-2 text-blue-600 text-sm font-medium mb-4">
        <Skeleton width={20} height={20} className="mr-2" />
        <Skeleton width={100} height={16} />
      </div>
      <Skeleton width="60%" height={36} className="mb-6" />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex items-center text-gray-600">
          <Skeleton width={20} height={20} className="mr-3" />
          <div>
            <Skeleton width={100} height={16} className="mb-1" />
            <Skeleton width={80} height={14} />
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <Skeleton width={20} height={20} className="mr-3" />
          <div>
            <Skeleton width={100} height={16} className="mb-1" />
            <Skeleton width={80} height={14} />
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <Skeleton width={20} height={20} className="mr-3" />
          <div>
            <Skeleton width={100} height={16} className="mb-1" />
            <Skeleton width={80} height={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
