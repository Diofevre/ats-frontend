"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMyPostulation } from "@/lib/services/client/client";
import { useClientStore } from "@/lib/store-user";
import DetailSkeleton from "@/components/back_office/client/candidature/detailSkeleton";
import HeaderSection from "@/components/back_office/client/candidature/headerSection";
import DetailsSection from "@/components/back_office/client/candidature/detailsSection";
import { PostulationType } from "@/lib/types/client/client.types";
import { Button } from "@/components/ui/button";
import {
  usePostulationDetail,
  useProccecusPassed,
} from "@/lib/services/client/procecus";

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const applicationId = params.id as string;

  const { client, loadClient } = useClientStore();

  const { detailPostulation } = usePostulationDetail(Number(applicationId));

  console.log(detailPostulation);

  useEffect(() => {
    if (!client) {
      loadClient();
    }
  }, [client, loadClient]);

  const { myPostulations, isLoading } = useMyPostulation(
    client?.token_candidat
  );

  const { passedProcessus } = useProccecusPassed(
    Number(applicationId),
    client?.token_candidat ?? ""
  );

  console.log(passedProcessus);

  const application = myPostulations?.find(
    (app: PostulationType) => app.id === Number(applicationId)
  );

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (!application) {
    return (
      <div className="container mx-auto px-6 py-8 bg-gray-50 rounded-xl text-center">
        <h1 className="text-2xl font-bold mb-4">Candidature non trouvée</h1>
        <Button
          onClick={() => router.push("/client/candidature")}
          className="flex items-center gap-2">
          ⟵ Retour aux candidatures
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <HeaderSection application={application} onBack={() => router.back()} />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <DetailsSection application={application} client={client} />
        </div>
      </div>
    </div>
  );
}
