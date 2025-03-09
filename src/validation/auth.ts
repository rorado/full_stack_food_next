import { Translations } from "@/types/translations";
import * as z from "zod";

export const loginSchema = (translations: Translations) => {
  return z.object({
    email: z.string().trim().email({
      message: translations.Validation.validEmail,
    }),
    password: z
      .string()
      .min(6, { message: translations.Validation.passwordMinLength })
      .max(40, { message: translations.Validation.passwordMaxLength }),
  });
};
export const signupSchema = (translations: Translations) => {
  return z
    .object({
      name: z
        .string()
        .trim()
        .min(3, { message: translations.Validation.passwordMinLength }),
      email: z.string().trim().email({
        message: translations.Validation.validEmail,
      }),
      password: z
        .string()
        .min(6, { message: translations.Validation.passwordMinLength })
        .max(40, { message: translations.Validation.passwordMaxLength }),
      confirmPassword: z
        .string()
        .min(6, { message: translations.Validation.confirmPasswordRequired }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translations.Validation.passwordMismatch,
      path: ["confirmPassword"],
    });
};
