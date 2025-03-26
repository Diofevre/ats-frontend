import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserMinus } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { CandidateAvatar } from "./avatar";
import { useCandidate } from "@/hooks/use-candidats";

interface CandidateDetailsProps {
  candidateId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CandidateDetails({ candidateId, isOpen, onClose }: CandidateDetailsProps) {
  const { candidate, isLoading, removeReferent } = useCandidate(candidateId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Détails du Candidat</DialogTitle>
          <DialogDescription>
            Informations complètes et référents
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <CandidateDetailsSkeleton />
        ) : candidate && (
          <div className="mt-4 space-y-6">
            <div className="flex items-center gap-4">
              <CandidateAvatar candidate={candidate} size="lg" />
              <div>
                <h3 className="text-lg font-semibold">{candidate.nom}</h3>
                <p className="text-sm text-muted-foreground">{candidate.email}</p>
                <p className="text-sm text-muted-foreground">{candidate.telephone}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-4">Référents ({candidate.referents.length})</h4>
              <div className="grid gap-3">
                {candidate.referents.map((ref) => (
                  <div key={ref.referent.id} 
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="space-y-1">
                      <p className="font-medium">{ref.referent.nom}</p>
                      <p className="text-sm text-muted-foreground">{ref.referent.statut}</p>
                      <p className="text-sm">{ref.referent.recommendation}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeReferent(ref.referent.id)}
                    >
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CandidateDetailsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
  );
}