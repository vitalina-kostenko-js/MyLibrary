"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Button } from "@/pkg/theme/ui/button";
import Link from "next/link";

const LoginButtonComponent = () => {
  const t = useTranslations("auth_button");

  const params = useParams();

  const locale = (params.locale as string) ?? "en";

  return (
    <Button variant="ghost" size="default" asChild>
      <Link href={`/${locale}/sign-in`}>{t("login")}</Link>
    </Button>
  );
};

export default LoginButtonComponent;