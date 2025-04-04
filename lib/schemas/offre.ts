import { z } from "zod";

const baseSchema = {
  organisation_id: z.string(),
  titre: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  date_limite: z.string().min(1, "La date limite est requise"),
  nombre_requis: z.number().min(1, "Le nombre de postes doit être supérieur à 0"),
  lieu: z.string().min(1, "Le lieu est requis"),
  pays: z.string().min(1, "Le pays est requis"),
  type_emploi: z.enum(["CDI", "CDD", "STAGE", "ALTERNANCE"] as const),
  type_temps: z.enum(["PLEIN_TEMPS", "TEMPS_PARTIEL"] as const),
  salaire: z.string().optional(),
  devise: z.enum(["EURO", "DOLLAR", "DOLLAR_CANADIEN", "LIVRE", "YEN", "ROUPIE", "ARIARY"] as const),
  image_url: z.string().optional(),
};

export const createOffreSchema = z.object(baseSchema);

export const updateOffreSchema = z.object({
  ...baseSchema,
  id: z.number(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateOffreSchema = z.infer<typeof createOffreSchema>;
export type UpdateOffreSchema = z.infer<typeof updateOffreSchema>;