"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Button } from "@/pkg/theme/ui/button";
import {Link} from "@/pkg/locale";

const LoginButtonComponent = () => {
  const t = useTranslations("auth_button");

  const params = useParams();

  return (
    <Button variant="ghost" size="default" asChild>
      <Link href='/sign-in'>{t("login")}</Link>
    </Button>
  );
};

export default LoginButtonComponent;