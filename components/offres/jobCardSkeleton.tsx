import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, CardContent } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const JobCardSkeleton = () => (
  <motion.div
    variants={itemVariants}
    className="hover:shadow-xl transition-all duration-300">
    <Card className="rounded-[12px]">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="space-y-4 w-full">
            <div>
              <Skeleton width={80} height={20} className="mb-2" />
              <Skeleton width="70%" height={24} className="mb-2" />
              <Skeleton width="40%" height={20} className="mb-2" />
              <Skeleton count={2} width="90%" height={16} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Skeleton width="80%" height={16} />
              <Skeleton width="80%" height={16} />
              <Skeleton width="80%" height={16} />
              <Skeleton width="80%" height={16} />
              <Skeleton width="80%" height={16} />
            </div>
          </div>
          <div className="flex md:flex-col gap-3 md:min-w-[140px]">
            <Skeleton width="100%" height={40} className="rounded-[12px]" />
            <Skeleton width="100%" height={40} className="rounded-[12px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function JobListSkeleton() {
  const skeletonItems = Array(3).fill(null);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6">
      {skeletonItems.map((_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </motion.div>
  );
}
