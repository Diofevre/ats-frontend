import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Candidate } from "@/lib/types/candidats/candidate.types";
import { MoreHorizontal, Trash2, Eye } from 'lucide-react';

interface CandidateActionsProps {
  candidate: Candidate;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

export function CandidateActions({ candidate, onDelete, onView }: CandidateActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onView(candidate.id)}>
          <Eye className="mr-2 h-4 w-4" />
          Voir détails
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(candidate.id)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}