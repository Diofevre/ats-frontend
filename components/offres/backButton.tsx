import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center mb-8 transition-colors">
      <ArrowLeft className="h-5 w-5 mr-2" />
      Retour aux offres
    </button>
  );
};

export default BackButton;
