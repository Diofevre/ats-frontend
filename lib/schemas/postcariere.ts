import * as z from "zod";

export const postCariereSchema = z.object({
  titre: z.string()
    .min(1, "Le titre est requis")
    .max(100, "Le titre ne peut pas dépasser 100 caractères"),
  contenu: z.string()
    .min(1, "Le contenu est requis")
    .min(10, "Le contenu doit contenir au moins 10 caractères")
    .max(5000, "Le contenu ne peut pas dépasser 5000 caractères"),
  organisation_id: z.number({
    required_error: "L'organisation est requise",
    invalid_type_error: "L'organisation doit être un nombre"
  }),
  images: z.array(z.string().url("L'URL de l'image est invalide")).max(5, "Maximum 5 images autorisées")
});

export type PostCariereFormValues = z.infer<typeof postCariereSchema>;