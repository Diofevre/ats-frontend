import { motion } from "framer-motion";
import { Frown } from "lucide-react";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12">
      <Frown className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Aucune candidature trouvée
      </h3>
      <p className="text-gray-600">
        Vous n&apos;avez pas encore postulé à des offres ou votre recherche
        n&apos;a donné aucun résultat.
      </p>
    </motion.div>
  );
}
