import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeaderSkeleton = () => (
  <div className="mb-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between transition-transform duration-300 hover:-translate-y-1">
    <div className="flex items-center space-x-6">
      <Skeleton
        circle
        width={56}
        height={56}
        className="border-2 border-gray-70"
      />
      <div className="space-y-2">
        <Skeleton width={180} height={28} />
        <Skeleton width={220} height={16} />
      </div>
    </div>
    <Skeleton width={120} height={40} className="rounded-full" />
  </div>
);

export default HeaderSkeleton;
