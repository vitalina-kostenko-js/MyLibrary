import { z } from "zod";
import { Translate } from "./auth-form.interface";

//login schema
export const loginSchema = (t: Translate) => {
  return z.object({
    email: z.email({ message: t("invalidEmail") }),
    password: z
      .string()
      .min(8, { message: t("passwordMustBeAtLeast8CharactersLong") }),
  });
};

//register schema
export const registerSchema = (t: Translate) => {
  return z
    .object({
      name: z.string().min(1, { message: t("nameIsRequired") }),
      email: z.email({ message: t("invalidEmail") }),
      password: z
        .string()
        .min(8, { message: t("passwordMustBeAtLeast8CharactersLong") }),
      confirmPassword: z
        .string()
        .min(1, { message: t("passwordConfirmationIsRequired") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });
};

export type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;
export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
