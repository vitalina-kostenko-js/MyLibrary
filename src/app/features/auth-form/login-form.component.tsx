"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getSession } from "next-auth/react";
import { loginSchema, type LoginFormValues } from "./auth-form.schema";
import { loginUser } from "./auth-form.service";
import { useAuthStore } from "@/app/shared/store/auth.store";
import type { User } from "@/app/shared/store/auth.interface";

export function LoginForm() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) ?? "en";
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await loginUser(values);
      if (res?.error) {
        form.setError("root", { message: res.error });
        return;
      }
      const session = await getSession();
      if (session?.user) {
        const user: User = {
          id: (session.user as { id?: string }).id ?? "",
          email: session.user.email ?? "",
          name: session.user.name ?? "",
          image: session.user.image ?? "",
        };
        const token = (session.user as { id?: string }).id ?? null;
        useAuthStore.getState().setAuth(user, token);
      }
      router.push(`/${locale}/items`);
      router.refresh();
    } catch {
      form.setError("root", { message: "Login failed" });
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Enter email" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter password" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </Form>
  );
}
