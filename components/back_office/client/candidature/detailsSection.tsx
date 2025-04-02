"use client";

import { useRouter } from "next/navigation";
import { PostulationType } from "@/lib/types/client/client.types";
import { useEffect, useState } from "react";
import { Processus } from "@/lib/types/processus-admin/processus-admin";
import { offreService } from "@/lib/services/offres/offres";
import {
  submitTacheLink,
  submitTacheFile,
} from "@/lib/services/client/procecus";
import { ClientData } from "@/lib/store-user";
import OfferDetails from "./offerDetails";
import RecruitmentProcess from "./recruitmentProcess";
import TaskSubmissionPopup from "./taskSubmissionPopup";
import QuizCard from "./quizCard";

interface DetailsSectionProps {
  application: PostulationType;
  client: ClientData | null;
}

export default function DetailsSection({
  application,
  client,
}: DetailsSectionProps) {
  const router = useRouter();
  const [processSteps, setProcessSteps] = useState<Processus[]>([]);
  const [showFilePopup, setShowFilePopup] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [link, setLink] = useState<string>("");
  const [submissionType, setSubmissionType] = useState<"file" | "link">("file");
  const [fileError, setFileError] = useState<string | null>(null);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProcessus = async () => {
      try {
        const steps = await offreService.getProcessus(application.offre.id);
        setProcessSteps(steps);
      } catch (error) {
        console.error("Error fetching processus:", error);
        setProcessSteps([]);
      }
    };

    if (application?.offre?.id) {
      fetchProcessus();
    }
  }, [application.offre.id]);

  const handleStepAction = (step: Processus) => {
    switch (step.type) {
      case "TACHE":
        setShowFilePopup(step.id);
        break;
      case "QUESTIONNAIRE":
        router.push(`/quiz/${step.id}/start`);
        break;
      case "VISIO_CONFERENCE":
        router.push(`/visio/${step.id}`);
        break;
      default:
        console.log("Type de step non reconnu");
    }
  };

  const validateLink = (url: string) => {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
    return urlPattern.test(url);
  };

  const handleFileSubmission = async (stepId: string) => {
    if (!selectedFile) {
      setFileError("Veuillez sélectionner un fichier avant de soumettre.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      await submitTacheFile(
        formData,
        Number(stepId),
        client?.token_candidat ?? ""
      );
      console.log(
        `Fichier soumis pour le step ${stepId}: ${selectedFile.name}`
      );
      setShowFilePopup(null);
      setSelectedFile(null);
      setSubmissionType("file");
    } catch (error) {
      setFileError("Erreur lors de la soumission du fichier.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLinkSubmission = async (stepId: string) => {
    if (!link) {
      setLinkError("Veuillez entrer un lien avant de soumettre.");
      return;
    }
    if (!validateLink(link)) {
      setLinkError("Veuillez entrer un lien valide (ex. https://example.com).");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitTacheLink(link, Number(stepId), client?.token_candidat ?? "");
      console.log(`Lien soumis pour le step ${stepId}: ${link}`);
      setShowFilePopup(null);
      setLink("");
      setSubmissionType("file");
    } catch (error) {
      setLinkError("Erreur lors de la soumission du lien.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmission = (stepId: string) => {
    if (submissionType === "file") {
      handleFileSubmission(stepId);
    } else {
      handleLinkSubmission(stepId);
    }
  };

  return (
    <>
      <OfferDetails application={application} />
      <RecruitmentProcess
        processSteps={processSteps}
        handleStepAction={handleStepAction}
      />
      {showFilePopup && (
        <TaskSubmissionPopup
          stepId={showFilePopup}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          link={link}
          setLink={setLink}
          submissionType={submissionType}
          setSubmissionType={setSubmissionType}
          fileError={fileError}
          setFileError={setFileError}
          linkError={linkError}
          setLinkError={setLinkError}
          isSubmitting={isSubmitting}
          handleSubmission={handleSubmission}
          setShowFilePopup={setShowFilePopup}
        />
      )}
      {application.etape_actuelle === "Entretien" && (
        <QuizCard offreId={application.offre.id} />
      )}
    </>
  );
}
