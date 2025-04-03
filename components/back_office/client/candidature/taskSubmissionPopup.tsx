import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaskSubmissionPopupProps {
  stepId: string;
  link: string;
  setLink: (link: string) => void;
  linkError: string | null;
  setLinkError: (error: string | null) => void;
  isSubmitting: boolean;
  handleSubmission: (stepId: string) => void;
  setShowFilePopup: (value: string | null) => void;
}

export default function TaskSubmissionPopup({
  stepId,
  link,
  setLink,
  linkError,
  setLinkError,
  isSubmitting,
  handleSubmission,
  setShowFilePopup,
}: TaskSubmissionPopupProps) {
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    setLinkError(null);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Soumettre une tâche
        </h2>
        <div className="space-y-6">
          <div>
            <Label
              htmlFor="taskLink"
              className="text-gray-700 mb-2 flex items-center">
              Lien requis * (URL valide)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-1 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Un lien valide est requis (ex. https://example.com).</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="taskLink"
              type="text"
              placeholder="https://example.com"
              value={link}
              onChange={handleLinkChange}
              className="w-full"
              disabled={isSubmitting}
            />
            {linkError && (
              <p className="text-red-500 text-sm mt-2">{linkError}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button
            onClick={() => {
              setShowFilePopup(null);
              setLink("");
              setLinkError(null);
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            disabled={isSubmitting}>
            Annuler
          </Button>
          <Button
            onClick={() => handleSubmission(stepId)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isSubmitting}>
            {isSubmitting ? "Soumission..." : "Soumettre"}
          </Button>
        </div>
      </div>
    </div>
  );
}
