import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { RegisterFormComponent } from "@/app/modules/sign/elements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | MyLibrary",
  description: "Sign up to create your account to access your library",
};

interface IRegisterPageProps {
  params: Promise<{ locale: string }>;
}

const RegisterPage = async (props: IRegisterPageProps) => {
  const { params } = props;

  const { locale } = await params;

  const tRegister = await getTranslations("form_register");
  const tLogin = await getTranslations("form_login");
  
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">{tRegister("createAccount")}</h1>
      <RegisterFormComponent />
      <p className="text-muted-foreground text-sm">
        {tRegister("alreadyHaveAccount")}{" "}
        <Link
          href={`/${locale}/sign-in`}
          className="text-primary underline-offset-4 hover:underline"
        >
          {tLogin("login")}
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
