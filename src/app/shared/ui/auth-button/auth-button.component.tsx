"use client";

import { Button } from "@/src/pkg/theme/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

export const LoginButton = () => {
  const t = useTranslations("auth_button");
  const params = useParams();
  const locale = (params.locale as string) ?? "en";

  return (
    <Button variant="ghost" size="default" asChild>
      <Link href={`/${locale}/sign-in`}>{t("login")}</Link>
    </Button>
  );
};

export const RegisterButton = () => {
  const t = useTranslations("auth_button");
  const params = useParams();
  const locale = (params.locale as string) ?? "en";

  return (
    <Button variant="ghost" size="default" asChild>
      <Link href={`/${locale}/sign-up`}>{t("register")}</Link>
    </Button>
  );
};
