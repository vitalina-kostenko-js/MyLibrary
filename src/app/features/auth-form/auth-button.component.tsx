"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "../../../../components/ui/button";

export const LoginButton = () => {
  const params = useParams();
  const locale = (params.locale as string) ?? "en";

  return (
    <Button variant="ghost" size="default" asChild>
      <Link href={`/${locale}/login`}>Login</Link>
    </Button>
  );
};

export const RegisterButton = () => {
  const params = useParams();
  const locale = (params.locale as string) ?? "en";

  return (
    <Button variant="ghost" size="default" asChild>
      <Link href={`/${locale}/register`}>Register</Link>
    </Button>
  );
};
