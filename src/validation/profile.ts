import { Translations } from "@/types/translations";
import { z } from "zod";

export const updateProfileSchema = (translations: Translations) => {
  return z.object({
    id: z.string(),
    name: z
      .string()
      .trim()
      .min(1, { message: translations.Validation.nameRequired }),
    email: z.string().trim().email({
      message: translations.Validation.validEmail,
    }),
    phone: z.union([z.string().trim(), z.null()]).optional(),
    streetAddress: z.union([z.string().trim(), z.null()]).optional(),
    postalCode: z.union([z.string().trim(), z.null()]).optional(),
    city: z.union([z.string().trim(), z.null()]).optional(),
    country: z.union([z.string().trim(), z.null()]).optional(),
    image: z.union([z.instanceof(File), z.string()]).optional(),
  });
};
