import { z } from "zod";

export const applicationSchema = z.object({
  email: z
    .string()
    .email("Adresse email invalide")
    .min(1, "L'email est requis"),
  nom: z.string().min(1, "Le nom est requis"),
  telephone: z.string().optional(),
  offre_id: z.number().min(1, "L'ID de l'offre est requis"),
  source_site: z.string().min(1, "Veuillez sélectionner une source"),
  hasReferent: z.enum(["yes", "no"]).default("no"),
  referents: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true;
      try {
        const parsed = JSON.parse(value);
        return (
          Array.isArray(parsed) &&
          parsed.every((ref) => typeof ref === "string")
        );
      } catch {
        return false;
      }
    }, "Les référents doivent être un tableau JSON valide de chaînes de caractères"),
  privacy: z
    .boolean()
    .refine(
      (val) => val === true,
      "Vous devez accepter la politique de confidentialité"
    ),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
