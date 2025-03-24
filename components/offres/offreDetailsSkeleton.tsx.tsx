import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, CardContent } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function OffreDetailsSkeleton() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 max-w-4xl">
      <motion.div variants={itemVariants} className="mb-6">
        <Skeleton width={120} height={40} className="rounded-xl" />
      </motion.div>

      <motion.div variants={itemVariants} className="mb-8">
        <Card className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg">
          <CardContent className="p-6 text-center">
            <Skeleton width="60%" height={40} className="mx-auto mb-4" />
            <Skeleton width={80} height={24} className="mx-auto rounded-full" />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-white rounded-xl shadow-lg">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Skeleton width="100%" height={256} className="rounded-lg" />
                <Skeleton width="100%" height={48} className="mt-6 rounded-xl" />
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center space-x-4">
                  <Skeleton width={120} height={24} />
                  <Skeleton width={150} height={24} />
                </div>

                <div className="space-y-4">
                  <Skeleton width={150} height={28} />
                  <Skeleton count={3} width="90%" height={16} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Skeleton width="80%" height={20} />
                  <Skeleton width="80%" height={20} />
                  <Skeleton width="80%" height={20} />
                  <Skeleton width="80%" height={20} />
                  <Skeleton width="80%" height={20} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8">
        <Card className="bg-white rounded-xl shadow-lg">
          <CardContent className="p-8">
            <Skeleton width={200} height={28} className="mb-4" />
            <Skeleton width="60%" height={20} />
            <Skeleton width="60%" height={20} />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}