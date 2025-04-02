import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaskSubmissionPopupProps {
  stepId: string;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  link: string;
  setLink: (link: string) => void;
  submissionType: "file" | "link";
  setSubmissionType: (type: "file" | "link") => void;
  fileError: string | null;
  setFileError: (error: string | null) => void;
  linkError: string | null;
  setLinkError: (error: string | null) => void;
  isSubmitting: boolean;
  handleSubmission: (stepId: string) => void;
  setShowFilePopup: (value: string | null) => void;
}

export default function TaskSubmissionPopup({
  stepId,
  selectedFile,
  setSelectedFile,
  link,
  setLink,
  submissionType,
  setSubmissionType,
  fileError,
  setFileError,
  linkError,
  setLinkError,
  isSubmitting,
  handleSubmission,
  setShowFilePopup,
}: TaskSubmissionPopupProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const acceptedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];
      if (!acceptedTypes.includes(file.type)) {
        setFileError(
          "Type de fichier non supporté. Utilisez PDF, DOC, DOCX, PNG, JPEG ou JPG."
        );
        setSelectedFile(null);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setFileError("Le fichier dépasse la limite de 5MB.");
        setSelectedFile(null);
        return;
      }

      setFileError(null);
      setSelectedFile(file);
    }
  };

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
            <Label className="text-gray-700 mb-2">Type de soumission *</Label>
            <Select
              value={submissionType}
              onValueChange={(value: "file" | "link") => {
                setSubmissionType(value);
                setSelectedFile(null);
                setLink("");
                setFileError(null);
                setLinkError(null);
              }}
              disabled={isSubmitting}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="file">Fichier</SelectItem>
                <SelectItem value="link">Lien</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {submissionType === "file" ? (
            <div>
              <Label
                htmlFor="taskFile"
                className="text-gray-700 mb-2 flex items-center">
                Fichier requis * (PDF, DOC, DOCX, PNG, JPEG, JPG, max 5MB)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Un fichier est requis pour valider cette tâche.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <div className="mt-2">
                <label
                  htmlFor="taskFile"
                  className={`relative block group ${
                    isSubmitting
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}>
                  <div className="flex items-center justify-center w-full px-6 py-4 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold text-blue-600">
                          Cliquez pour télécharger
                        </span>{" "}
                        ou glissez-déposez
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, PNG, JPEG, JPG (Max. 5MB)
                      </p>
                    </div>
                  </div>
                  <Input
                    id="taskFile"
                    type="file"
                    accept=".pdf,.doc,.docx,image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isSubmitting}
                  />
                </label>
              </div>
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-2">
                  Fichier sélectionné : {selectedFile.name} (
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
              {fileError && (
                <p className="text-red-500 text-sm mt-2">{fileError}</p>
              )}
            </div>
          ) : (
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
                      <p>
                        Un lien valide est requis (ex. https://example.com).
                      </p>
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
          )}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button
            onClick={() => {
              setShowFilePopup(null);
              setSelectedFile(null);
              setLink("");
              setFileError(null);
              setLinkError(null);
              setSubmissionType("file");
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
