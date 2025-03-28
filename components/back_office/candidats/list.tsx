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
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Candidat
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Téléphone
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date d&apos;inscription
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Référents
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[80px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {candidates?.map((candidate) => (
            <tr key={candidate.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <CandidateAvatar candidate={candidate} />
                  <span className="font-medium">{candidate.nom}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {candidate.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {candidate.telephone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(candidate.created_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {candidate.referents?.length || 0} référents
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <CandidateActions
                  candidate={candidate}
                  onDelete={onDelete}
                  onView={onView}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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