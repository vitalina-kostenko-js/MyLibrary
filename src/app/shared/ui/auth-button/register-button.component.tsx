"use client";

import { Button } from "@/pkg/theme/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

const RegisterButtonComponent = () => {
  const t = useTranslations("auth_button");

  const params = useParams();

  const locale = (params.locale as string) ?? "en";

  return (
    <Button variant="ghost" size="default" asChild>
      <Link href='/sign-up'>{t("register")}</Link>
    </Button>
  );
};

export default RegisterButtonComponent;
