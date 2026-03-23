"use client";

import {
  RegisterFormValues,
  registerSchema,
} from "@/app/features/auth-form/auth-form.schema";
import { registerUser } from "@/app/features/auth-form/auth-form.service";
import { Button } from "@/src/pkg/theme/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/pkg/theme/ui/form";
import { Input } from "@/src/pkg/theme/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function RegisterForm() {
  const t = useTranslations("form_register");
  const tSchema = useTranslations("auth_shema");

  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) ?? "en";
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema(tSchema)),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser(values);
      router.push(`/${locale}/login`);
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t("registrationFailed");
      form.setError("root", { message });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {form.formState.errors.root && (
          <p className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </p>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")}</FormLabel>
              <Input placeholder={t("enterName")} {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <Input placeholder={t("enterEmail")} {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>
              <Input
                type="password"
                placeholder={t("enterPassword")}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("confirmPassword")}</FormLabel>
              <Input
                type="password"
                placeholder={t("enterConfirmPassword")}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? t("creatingAccount") : t("register")}
        </Button>
      </form>
    </Form>
  );
}
