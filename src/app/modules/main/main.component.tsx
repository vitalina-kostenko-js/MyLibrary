import { LayoutComponent } from "@/app/modules/layout";
import { authOptions } from "@/app/shared/lib/auth/auth";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { Link } from "../../../pkg/locale";

//interface
interface IMainComponentProps {
  locale: string;
}

//component
const MainComponent = async (props: IMainComponentProps) => {
  const t = await getTranslations("home");

  const session = await getServerSession(authOptions);

  return (
    <LayoutComponent showFooter>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="max-w-xl space-y-6 text-center">
          {session ? (
            <>
              <h1 className="text-4xl font-bold">
                {t("welcome")} {session.user?.name}
              </h1>

              <p className="text-gray-600">{t("welcomeDescription")}</p>

              <Link
                href="/items"
                className="rounded-md bg-black px-6 py-3 text-white"
              >
                {t("viewLibrary")}
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold">{t("title")}</h1>

              <p className="text-gray-600">{t("description")}</p>

              <div className="flex justify-center gap-4">
                <Link
                  href="/sign-in"
                  className="rounded-md bg-black px-6 py-3 text-white"
                >
                  {t("signIn")}
                </Link>

                <Link href="/sign-up" className="rounded-md border px-6 py-3">
                  {t("signUp")}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </LayoutComponent>
  );
};

export default MainComponent;
