"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useOneOffre } from "@/lib/services/offres/offres";
import BackButton from "@/components/offres/backButton";
import JobHeader from "@/components/offres/jobHeader";
import ApplicationFormulaire from "@/components/offres/formPostulation";

const ApplicationForm = () => {
  const params = useParams<{ id: string }>();
  const [idPost, setIdPost] = useState<number | undefined>();

  useEffect(() => {
    if (params?.id) {
      try {
        const decodedId = JSON.parse(decodeURIComponent(params.id));
        setIdPost(decodedId);
      } catch (error) {
        console.error("Erreur lors du décodage de l'ID:", error);
        setIdPost(undefined);
      }
    }
  }, [params?.id]);

  const { mockJob, isLoading } = useOneOffre(idPost);

  return (
    <div className="min-h-screen rounded-[12px] mt-6">
      <div className="max-w-4xl mx-auto py-8">
        <BackButton />
        <div className="max-w-4xl mx-auto space-y-8 px-1">
          <JobHeader
            job={mockJob}
            isLoading={isLoading || idPost === undefined}
          />
          <ApplicationFormulaire idPost={idPost} />
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
