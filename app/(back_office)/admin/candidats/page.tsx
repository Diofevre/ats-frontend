'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Trash2, UserMinus, Eye } from 'lucide-react';

import { toast } from 'sonner';
import { Candidate } from '@/lib/types/candidats/candidate.types';
import { deleteCandidate, getAllCandidates, getCandidateById, removeReferentFromCandidate } from '@/lib/services/candidats/candidats';
import { formatDate } from '@/lib/utils';
import WelcomeUser from '@/components/back_office/WelcomeUser';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const data = await getAllCandidates();
      setCandidates(data);
    } catch (error) {
      console.log(error);
      toast.error('Impossible de charger les candidats');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCandidate(id);
      toast.success('Candidat supprimé avec succès');
      loadCandidates();
    } catch (error) {
      console.log(error);
      toast.error('Impossible de supprimer le candidat');
    }
  };

  const handleViewDetails = async (id: number) => {
    try {
      const candidate = await getCandidateById(id);
      setSelectedCandidate(candidate);
      setIsDetailsOpen(true);
    } catch (error) {
      console.log(error);
      toast.error('Impossible de charger les détails du candidat');
    }
  };

  return (
    <div className="container mx-auto py-10">
      {/* Components Welcome */}
      <WelcomeUser />

      {/* Candidats */}
      <h1 className="text-2xl font-bold my-6">Gestion des Candidats</h1>
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
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={candidate.image} alt={candidate.nom} />
                      <AvatarFallback>{candidate.nom.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{candidate.nom}</span>
                  </div>
                </TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.telephone}</TableCell>
                <TableCell>{formatDate(candidate.created_at)}</TableCell>
                <TableCell>Erreur</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleViewDetails(candidate.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir détails
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(candidate.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du Candidat</DialogTitle>
            <DialogDescription>
              Informations complètes et référents
            </DialogDescription>
          </DialogHeader>

          {selectedCandidate && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedCandidate.image} alt={selectedCandidate.nom} />
                  <AvatarFallback>{selectedCandidate.nom.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedCandidate.nom}</h3>
                  <p className="text-sm text-gray-500">{selectedCandidate.email}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Référents ({selectedCandidate.referents.length})</h4>
                <div className="space-y-3">
                  {selectedCandidate.referents.map((ref) => (
                    <div key={ref.referent.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <p className="font-medium">{ref.referent.nom}</p>
                        <p className="text-sm text-gray-500">{ref.referent.statut}</p>
                        <p className="text-sm">{ref.referent.recommendation}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeReferentFromCandidate(selectedCandidate.id, { referent_id: ref.referent.id })}
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
    </div>
  );
}