import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicationSchema,
  ApplicationFormData,
} from "@/lib/services/postulations/shemaPost";
import { Postulation } from "@/lib/services/postulations/postulations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ApplicationFormulaireProps {
  idPost: number | undefined;
}

const ApplicationFormulaire: React.FC<ApplicationFormulaireProps> = ({
  idPost,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [lettreMotivationFile, setLettreMotivationFile] = useState<File | null>(
    null
  );
  const [lettreMotivationError, setLettreMotivationError] = useState<
    string | null
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      email: "",
      nom: "",
      telephone: "",
      offre_id: idPost,
      source_site: "",
      hasReferent: "no",
      referents: "",
      privacy: false,
    },
  });

  useEffect(() => {
    if (idPost) {
      setValue("offre_id", idPost);
    }
  }, [idPost, setValue]);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cv" | "lettre_motivation"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];
      if (!allowedTypes.includes(file.type)) {
        if (type === "cv") {
          setCvError(
            "Le CV doit être un fichier PDF, DOC, DOCX, PNG, JPEG ou JPG"
          );
          setCvFile(null);
        } else {
          setLettreMotivationError(
            "La lettre de motivation doit être un fichier PDF, DOC, DOCX, PNG, JPEG ou JPG"
          );
          setLettreMotivationFile(null);
        }
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        if (type === "cv") {
          setCvError("Le CV ne doit pas dépasser 5MB");
          setCvFile(null);
        } else {
          setLettreMotivationError(
            "La lettre de motivation ne doit pas dépasser 5MB"
          );
          setLettreMotivationFile(null);
        }
        return;
      }
      if (type === "cv") {
        setCvFile(file);
        setCvError(null);
      } else {
        setLettreMotivationFile(file);
        setLettreMotivationError(null);
      }
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (!cvFile) {
      setCvError("Le CV est requis");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("cv", cvFile);
      if (lettreMotivationFile) {
        formData.append("lettre_motivation", lettreMotivationFile);
      }
      formData.append("email", data.email);
      formData.append("nom", data.nom);
      if (data.telephone) formData.append("telephone", data.telephone);
      if (data.offre_id) formData.append("offre_id", data.offre_id.toString());
      formData.append("source_site", data.source_site);
      formData.append("hasReferent", data.hasReferent);
      if (data.hasReferent === "yes" && data.referents) {
        formData.append("referents", data.referents);
      }

      const response = await Postulation(formData);
      console.log(response);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasReferent = watch("hasReferent");

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Comment avez-vous découvert cette opportunité ?
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Aidez-nous à comprendre votre parcours
            </p>
            <Select
              onValueChange={(value) => setValue("source_site", value)}
              defaultValue="">
              <SelectTrigger className="w-full md:w-1/2">
                <SelectValue placeholder="Sélectionnez une option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="website">
                  Site web de l'entreprise
                </SelectItem>
                <SelectItem value="referral">Recommandation</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
            {errors.source_site && (
              <p className="text-red-500 text-sm mt-2">
                {errors.source_site.message}
              </p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Informations personnelles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nom" className="text-gray-700">
                  Nom
                </Label>
                <Input
                  id="nom"
                  placeholder="Votre nom"
                  className="mt-2"
                  {...register("nom")}
                />
                {errors.nom && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.nom.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Courriel
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  className="mt-2"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="telephone" className="text-gray-700">
                  Téléphone (optionnel)
                </Label>
                <Input
                  id="telephone"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  className="mt-2"
                  {...register("telephone")}
                />
                {errors.telephone && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.telephone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Documents
            </h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="cv" className="text-gray-700 mb-2 block">
                  CV (PDF, DOC, DOCX, PNG, JPEG, JPG)
                </Label>
                <div className="mt-2">
                  <label htmlFor="cv" className="relative block group">
                    <div className="flex items-center justify-center w-full px-6 py-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
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
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx,image/png,image/jpeg,image/jpg"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "cv")}
                    />
                  </label>
                </div>
                {cvFile && (
                  <p className="text-sm text-gray-600 mt-2">
                    Fichier sélectionné : {cvFile.name}
                  </p>
                )}
                {cvError && (
                  <p className="text-red-500 text-sm mt-2">{cvError}</p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="lettre_motivation"
                  className="text-gray-700 mb-2 block">
                  Lettre de motivation (optionnel, PDF, DOC, DOCX, PNG, JPEG,
                  JPG)
                </Label>
                <div className="mt-2">
                  <label
                    htmlFor="lettre_motivation"
                    className="relative block group">
                    <div className="flex items-center justify-center w-full px-6 py-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
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
                      id="lettre_motivation"
                      type="file"
                      accept=".pdf,.doc,.docx,image/png,image/jpeg,image/jpg"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "lettre_motivation")}
                    />
                  </label>
                </div>
                {lettreMotivationFile && (
                  <p className="text-sm text-gray-600 mt-2">
                    Fichier sélectionné : {lettreMotivationFile.name}
                  </p>
                )}
                {lettreMotivationError && (
                  <p className="text-red-500 text-sm mt-2">
                    {lettreMotivationError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Référents (optionnel)
            </h2>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-700">
                  Avez-vous des référents à inclure ?
                </Label>
                <Select
                  onValueChange={(value) =>
                    setValue("hasReferent", value as "yes" | "no")
                  }
                  defaultValue="no">
                  <SelectTrigger className="w-full md:w-1/2 mt-2">
                    <SelectValue placeholder="Sélectionnez une option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">Non</SelectItem>
                    <SelectItem value="yes">Oui</SelectItem>
                  </SelectContent>
                </Select>
                {errors.hasReferent && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.hasReferent.message}
                  </p>
                )}
              </div>
              {hasReferent === "yes" && (
                <div>
                  <Label htmlFor="referents" className="text-gray-700">
                    Référents (format JSON, ex: ["Nom1", "Nom2"])
                  </Label>
                  <Textarea
                    id="referents"
                    placeholder='["Nom1", "Nom2"]'
                    className="mt-2 h-32 resize-none"
                    {...register("referents")}
                  />
                  {errors.referents && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.referents.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="border-t mt-4 flex flex-col">
            <div className="flex mt-5 items-center mb-8 space-x-2">
              <Checkbox
                id="privacy"
                {...register("privacy")}
                onCheckedChange={(checked) =>
                  setValue("privacy", checked === true)
                }
              />
              <Label htmlFor="privacy" className="text-sm text-gray-500">
                En soumettant ce formulaire, j'accepte que mes informations
                soient traitées conformément à la politique de confidentialité.
              </Label>
            </div>
            {errors.privacy && (
              <p className="text-red-500 text-sm mt-2">
                {errors.privacy.message}
              </p>
            )}
            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                className="px-6 rounded-[12px] h-10"
                onClick={() => router.back()}>
                Annuler
              </Button>
              <Button
                type="submit"
                className="px-6 bg-blue-600 hover:bg-blue-700 rounded-[12px] h-10"
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Envoi en cours...</span>
                  </div>
                ) : (
                  "Soumettre ma candidature"
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApplicationFormulaire;
