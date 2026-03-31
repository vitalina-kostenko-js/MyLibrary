import { RegisterFormComponent } from "@/app/modules/sign/elements";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/pkg/locale";

//metadata
export const metadata: Metadata = {
  title: "Sign up | MyLibrary",
  description: "Sign up to create your account to access your library",
};

//interfase
interface IRegisterPageProps {
  params: Promise<{ locale: string }>;
}

//page
const RegisterPage = async (props: IRegisterPageProps) => {
  const { params } = props;

  const tRegister = await getTranslations("form_register");
  const tLogin = await getTranslations("form_login");

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">{tRegister("createAccount")}</h1>
      <RegisterFormComponent />
      <p className="text-muted-foreground text-sm">
        {tRegister("alreadyHaveAccount")}{" "}
        <Link
          href={"/sign-in"}
          className="text-primary underline-offset-4 hover:underline"
        >
          {tLogin("login")}
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
