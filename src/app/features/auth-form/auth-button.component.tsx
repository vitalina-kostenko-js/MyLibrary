"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { useTranslations } from "next-intl";

export const LoginButton = () => {
  const t = useTranslations("auth_button");
  const params = useParams();
  const locale = (params.locale as string) ?? "en";

  return (
    <Button variant="ghost" size="default" asChild>
      <Link href={`/${locale}/login`}>{t("login")}</Link>
    </Button>
  );
};

export const RegisterButton = () => {
  const t = useTranslations("auth_button");
  const params = useParams();
  const locale = (params.locale as string) ?? "en";

  return (
    <Button variant="ghost" size="default" asChild>
      <Link href={`/${locale}/register`}>{t("register")}</Link>
    </Button>
  );
};
