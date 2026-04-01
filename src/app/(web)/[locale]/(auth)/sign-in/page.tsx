import { LoginFormComponent } from "@/app/modules/sign/elements";
import { Link } from "@/pkg/locale";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

//metadata
export const metadata: Metadata = {
  title: "Sign in | MyLibrary",
  description: "Sign in to your account to access your library",
};

//interface
interface ILoginPageProps {}

//page
const LoginPage = async (props: ILoginPageProps) => {
  const tLogin = await getTranslations("form_login");
  const tRegister = await getTranslations("form_register");

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">{tLogin("login")}</h1>

      <LoginFormComponent />

      <p className="text-muted-foreground text-sm">
        {tLogin("dontHaveAccount")}
        <Link
          href="/sign-up"
          className="text-primary underline-offset-4 hover:underline"
        >
          {tRegister("register")}
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
