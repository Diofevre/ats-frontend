import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from '@/lib/utils';
import { Candidate } from "@/lib/types/candidats/candidate.types";
import { CandidateAvatar } from "./avatar";
import { CandidateActions } from "./actions";

interface CandidatesListProps {
  candidates?: Candidate[];
  isLoading: boolean;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

export function CandidatesList({ candidates, isLoading, onDelete, onView }: CandidatesListProps) {
  if (isLoading) {
    return <CandidatesListSkeleton />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidat</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Date d&apos;inscription</TableHead>
            <TableHead>Référents</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates?.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <CandidateAvatar candidate={candidate} />
                  <span className="font-medium">{candidate.nom}</span>
                </div>
              </TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>{candidate.telephone}</TableCell>
              <TableCell>{formatDate(candidate.created_at)}</TableCell>
              <TableCell>{candidate.referents?.length || 0} référents</TableCell>
              <TableCell>
                <CandidateActions
                  candidate={candidate}
                  onDelete={onDelete}
                  onView={onView}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function CandidatesListSkeleton() {
  return (
    <div className="rounded-md border p-4 space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <Skeleton className="h-8 w-8" />
        </div>
      ))}
    </div>
  );
}