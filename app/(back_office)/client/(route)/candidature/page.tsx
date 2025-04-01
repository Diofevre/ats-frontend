"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useMyPostulation } from "@/lib/services/client/client";
import { useClientStore } from "@/lib/store-user";
import ApplicationList from "@/components/back_office/client/candidature/CandidatureList";
import CandidatureCardSkeleton from "@/components/back_office/client/candidature/CandidatureCardSkeleton";
import EmptyState from "@/components/back_office/client/candidature/emptyState";

export default function Candidature() {
  const [searchTerm, setSearchTerm] = useState("");
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
    <div className="space-y-4 px-6 py-8 bg-gray-50 rounded-xl mt-4">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-200 transition-all duration-200 hover:border-blue-300">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-gray-900">
            Mes candidatures
          </h2>
          <p className="text-sm text-gray-500">
            Gérez vos candidatures et suivez leur progression
          </p>
        </div>
        <div className="relative w-72">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200 group-hover:text-blue-500"
            size={18}
          />
          <Input
            type="text"
            placeholder="Rechercher une candidature..."
            className="pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-200 group-hover:border-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className=" rounded-xl  shadow-sm space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <CandidatureCardSkeleton key={index} />
              ))}
          </div>
        ) : myPostulations?.length === 0 ? (
          <EmptyState />
        ) : (
          <ApplicationList
            applications={myPostulations}
            onViewDetails={(id) => router.push(`/client/candidature/${id}`)}
          />
        )}
      </div>
    </div>
  );
}
