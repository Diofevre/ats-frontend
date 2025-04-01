import { PostulationType } from "@/lib/types/client/client.types";
import CandidatureCard from "./CandidatureCard";

interface ApplicationListProps {
  applications: PostulationType[];
  onViewDetails: (id: number) => void;
}

export default function ApplicationList({
  applications,
  onViewDetails,
}: ApplicationListProps) {
  return (
    <div className="space-y-4">
      {applications?.map((application) => (
        <CandidatureCard
          key={application.id}
          application={application}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
