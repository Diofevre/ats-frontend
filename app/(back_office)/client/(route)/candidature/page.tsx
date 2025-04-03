"use client";

import { useEffect } from "react";
import { Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMyPostulation } from "@/lib/services/client/client";
import { useClientStore } from "@/lib/store-user";
import ApplicationList from "@/components/back_office/client/candidature/CandidatureList";
import CandidatureCardSkeleton from "@/components/back_office/client/candidature/CandidatureCardSkeleton";
import EmptyState from "@/components/back_office/client/candidature/emptyState";
import Link from "next/link";

export default function Candidature() {
  const router = useRouter();
  const { client, loadClient } = useClientStore();

  useEffect(() => {
    if (!client) {
      loadClient();
    }
  }, [client, loadClient]);

  const { myPostulations, isLoading } = useMyPostulation(
    client?.token_candidat
  );

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl mb-6">
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:6px_6px]" />
          <div className="relative px-6 py-8 md:px-8 md:py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-blue-100" />
                  <span className="text-sm font-medium text-white">Mes candidatures</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Tableau de bord des candidatures
                </h1>
                <p className="text-blue-100 max-w-2xl">
                  Gérez et suivez vos candidatures en temps réel. Restez organisé et ne manquez aucune opportunité.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white overflow-hidden">
          <>
            {isLoading ? (
              <div className="space-y-4">
                {Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <CandidatureCardSkeleton key={index} />
                  ))}
              </div>
            ) : myPostulations?.length === 0 ? (
              <div className="flex flex-col items-center justify-center hover:text-blue-600">
                <EmptyState title="Candidature" />
                <Link href='/offres-lists'>
                  ⟶
                  Voir plus
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <ApplicationList
                  applications={myPostulations}
                  onViewDetails={(id) => router.push(`/client/candidature/${id}`)}
                />
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}