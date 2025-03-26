import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Candidate } from "@/lib/types/candidats/candidate.types";

interface CandidateAvatarProps {
  candidate: Candidate;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-16 w-16"
};

export function CandidateAvatar({ candidate, size = "md" }: CandidateAvatarProps) {
  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={candidate.image} alt={candidate.nom} />
      <AvatarFallback>{candidate.nom.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}