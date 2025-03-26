import React, { useEffect, useState, FC, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Postulation } from "@/lib/services/postulations/postulations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Loader2, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const applicationSchema = z.object({
  email: z.string().email("Email invalide").nonempty("Email requis"),
  nom: z.string().nonempty("Nom requis"),
  telephone: z.string().optional(),
  offre_id: z.number().optional(),
  source_site: z.enum(["LINKEDIN", "WEBSITE", "REFERRAL", "OTHER"]),
  hasReferent: z.enum(["true", "false"]),
  referents: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        try {
          const parsed = JSON.parse(val);
          return Array.isArray(parsed);
        } catch {
          return false;
        }
      },
      { message: "Format JSON invalide pour les référents" }
    ),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationFormulaireProps {
  idPost: number | undefined;
}

const ApplicationFormulaire: FC<ApplicationFormulaireProps> = ({ idPost }) => {
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
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      email: "",
      nom: "",
      telephone: "",
      offre_id: idPost,
      source_site: "LINKEDIN",
      hasReferent: "false",
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
    e: ChangeEvent<HTMLInputElement>,
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
      if (lettreMotivationFile)
        formData.append("lettre_motivation", lettreMotivationFile);
      formData.append("email", data.email);
      formData.append("nom", data.nom);
      if (data.telephone)
        formData.append("telephone", data.telephone.replace("+261", "0"));
      if (data.offre_id) formData.append("offre_id", data.offre_id.toString());
      formData.append("source_site", data.source_site.toUpperCase());
      formData.append(
        "hasReferent",
        data.hasReferent === "true" ? "true" : "false"
      );
      if (data.hasReferent === "true" && data.referents) {
        formData.append("referents", data.referents);
      }

      const response = await Postulation(formData);
      console.log("Réponse:", response);

      reset();
      setCvFile(null);
      setLettreMotivationFile(null);
      router.push("/offres-lists/success");
    } catch (error) {
      console.error("Erreur dans onSubmit:", error);
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
              Comment avez-vous découvert cette opportunité ? *
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Aidez-nous à comprendre votre parcours
            </p>
            <Controller
              name="source_site"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting}>
                  <SelectTrigger className="w-full md:w-1/2">
                    <SelectValue placeholder="Choisissez une source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LINKEDIN">LinkedIn</SelectItem>
                    <SelectItem value="WEBSITE">
                      Site web de l&apos;entreprise
                    </SelectItem>
                    <SelectItem value="REFERRAL">Recommandation</SelectItem>
                    <SelectItem value="OTHER">Autre</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
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
                <Label
                  htmlFor="nom"
                  className="text-gray-700 flex items-center">
                  Nom *
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Votre nom complet est requis.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Controller
                  name="nom"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="nom"
                      placeholder="Entrez votre nom complet"
                      className={`mt-2 ${errors.nom ? "border-red-500" : ""}`}
                      {...field}
                      disabled={isSubmitting}
                    />
                  )}
                />
                {errors.nom && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.nom.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-gray-700 flex items-center">
                  Courriel *
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Un email valide est requis pour vous contacter.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@domaine.com"
                      className={`mt-2 ${errors.email ? "border-red-500" : ""}`}
                      {...field}
                      disabled={isSubmitting}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="telephone"
                  className="text-gray-700 flex items-center">
                  Téléphone (optionnel)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ajoutez un numéro pour faciliter le contact.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Controller
                  name="telephone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="telephone"
                      type="tel"
                      placeholder="+261 34 230 4165 ou 034 230 4165"
                      className="mt-2"
                      {...field}
                      disabled={isSubmitting}
                    />
                  )}
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
                <Label
                  htmlFor="cv"
                  className="text-gray-700 mb-2 flex items-center">
                  CV * (PDF, DOC, DOCX, PNG, JPEG, JPG, max 5MB)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Un CV est requis pour valider votre candidature.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="mt-2">
                  <label
                    htmlFor="cv"
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
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx,image/png,image/jpeg,image/jpg"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "cv")}
                      disabled={isSubmitting}
                    />
                  </label>
                </div>
                {cvFile && (
                  <p className="text-sm text-gray-600 mt-2">
                    Fichier sélectionné : {cvFile.name} (
                    {(cvFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
                {cvError && (
                  <p className="text-red-500 text-sm mt-2">{cvError}</p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="lettre_motivation"
                  className="text-gray-700 mb-2 flex items-center">
                  Lettre de motivation (optionnel, PDF, DOC, DOCX, PNG, JPEG,
                  JPG, max 5MB)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Optionnel, mais recommandé pour renforcer votre
                          candidature.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="mt-2">
                  <label
                    htmlFor="lettre_motivation"
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
                      id="lettre_motivation"
                      type="file"
                      accept=".pdf,.doc,.docx,image/png,image/jpeg,image/jpg"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "lettre_motivation")}
                      disabled={isSubmitting}
                    />
                  </label>
                </div>
                {lettreMotivationFile && (
                  <p className="text-sm text-gray-600 mt-2">
                    Fichier sélectionné : {lettreMotivationFile.name} (
                    {(lettreMotivationFile.size / 1024 / 1024).toFixed(2)} MB)
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
                <Label className="text-gray-700 flex items-center">
                  Avez-vous des référents à inclure ?
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Indiquez si vous avez des personnes pour appuyer votre
                          candidature.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Controller
                  name="hasReferent"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}>
                      <SelectTrigger className="w-full md:w-1/2 mt-2">
                        <SelectValue placeholder="Sélectionnez une option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="false">Non</SelectItem>
                        <SelectItem value="true">Oui</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.hasReferent && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.hasReferent.message}
                  </p>
                )}
              </div>
              {hasReferent === "true" && (
                <div>
                  <Label
                    htmlFor="referents"
                    className="text-gray-700 flex items-center">
                    Référents (format JSON)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Exemple</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Controller
                    name="referents"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="referents"
                        placeholder='Exemple : ["Jean Dupont", {"nom": "Marie Curie", "email": "marie@example.com"}]'
                        className={`mt-2 h-32 resize-none ${
                          errors.referents ? "border-red-500" : ""
                        }`}
                        {...field}
                        disabled={isSubmitting}
                      />
                    )}
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
              <Controller
                name="privacy"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="privacy"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                  />
                )}
              />
              <Label htmlFor="privacy" className="text-sm text-gray-500">
                En soumettant ce formulaire, j&apos;accepte que mes informations
                soient traitées conformément à la{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  politique de confidentialité
                </a>
                .
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
                onClick={() => router.back()}
                disabled={isSubmitting}>
                Annuler
              </Button>
              <Button
                type="submit"
                className="px-6 bg-blue-600 hover:bg-blue-700 rounded-[12px] h-10"
                disabled={isSubmitting || !isDirty || !cvFile}>
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
