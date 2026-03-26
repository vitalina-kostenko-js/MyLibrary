import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LoginFormComponent } from "@/app/modules/sign/elements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in | MyLibrary",
  description: "Sign in to your account to access your library",
};

interface ILoginPageProps {
  params: Promise<{ locale: string }>;
}

const LoginPage = async (props: ILoginPageProps) => {
  const { params } = props;

  const { locale } = await params;

  const tLogin = await getTranslations("form_login");
  const tRegister = await getTranslations("form_register");
  
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">{tLogin("login")}</h1>
      <LoginFormComponent />
      <p className="text-muted-foreground text-sm">
        {tLogin("dontHaveAccount")}{" "}
        <Link
          href={`/${locale}/sign-up`}
          className="text-primary underline-offset-4 hover:underline"
        >
          {tRegister("register")}
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
