import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { RegisterForm } from "../../../features/auth-form";

interface Props { params: Promise<{ locale: string }> };

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;
  const tRegister = await getTranslations("form_register");
  const tLogin = await getTranslations("form_login");
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">{tRegister("createAccount")}</h1>
      <RegisterForm />
      <p className="text-muted-foreground text-sm">
        {tRegister("alreadyHaveAccount")}{" "}
        <Link href={`/${locale}/login`} className="text-primary underline-offset-4 hover:underline">
          {tLogin("login")}
        </Link>
      </p>
    </div>
  );
}
