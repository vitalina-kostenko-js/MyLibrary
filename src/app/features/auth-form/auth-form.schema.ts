import { z } from "zod";
import { Translate } from "./auth-form.interface";

export function loginSchema(t: Translate) {
    return z.object({
      email: z.string().email({ message: t("invalidEmail") }),
      password: z.string().min(8, { message: t("passwordMustBeAtLeast8CharactersLong") }),
    });
  }

  export function registerSchema(t: Translate) {
    return z
      .object({
        name: z.string().min(1, { message: t("nameIsRequired") }),
        email: z.string().email({ message: t("invalidEmail") }),
        password: z.string().min(8, { message: t("passwordMustBeAtLeast8CharactersLong") }),
        confirmPassword: z.string().min(1, { message: t("passwordConfirmationIsRequired") }),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: t("passwordsDoNotMatch"),
        path: ["confirmPassword"],
      });
  }
  

export type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;
export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
