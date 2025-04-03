import React, { useEffect, useState, FC } from "react";
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
import { Loader2, Info } from "lucide-react";
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
import { FileUpload } from "../file-upload";

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
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [lettreMotivationUrl, setLettreMotivationUrl] = useState<string | null>(
    null
  );
  const [cvError, setCvError] = useState<string | null>(null);

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

  const onSubmit = async (data: ApplicationFormData) => {
    if (!cvUrl) {
      setCvError("Le CV est requis");
      return;
    }

    setIsSubmitting(true);
    try {
      const cv = cvUrl;
      const lettre_motivation = lettreMotivationUrl;
      const email = data.email;
      const nom = data.nom;
      const telephone = data.telephone?.replace("+261", "0");
      const offre_id = data.offre_id?.toString();
      const source_site = data.source_site.toUpperCase();
      const hasReferent = data.referents;

      const response = await Postulation(
        cv,
        lettre_motivation,
        email,
        nom,
        telephone,
        offre_id,
        source_site,
        hasReferent
      );
      console.log("Réponse:", response);

      reset();
      setCvUrl(null);
      setLettreMotivationUrl(null);
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
                <Label className="text-gray-700 mb-2 flex items-center">
                  CV * (PDF, PNG, JPG, JPEG)
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
                <FileUpload
                  onUpload={(url) => {
                    setCvUrl(url);
                    setCvError(null);
                  }}
                  accept="both"
                  className="mt-2"
                />
                {cvError && (
                  <p className="text-red-500 text-sm mt-2">{cvError}</p>
                )}
              </div>
              <div>
                <Label className="text-gray-700 mb-2 flex items-center">
                  Lettre de motivation (optionnel, PDF, PNG, JPG, JPEG)
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
                <FileUpload
                  onUpload={(url) => setLettreMotivationUrl(url)}
                  accept="both"
                  className="mt-2"
                />
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
                disabled={isSubmitting || !isDirty || !cvUrl}>
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
