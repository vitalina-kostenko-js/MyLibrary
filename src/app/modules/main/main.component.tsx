import Link from "next/link";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { DashboardLayout } from "@/app/widgets/dashboard-layout";

interface MainComponentProps {
  locale: string;
}

export async function MainComponent({ locale }: MainComponentProps) {
  const t = await getTranslations("home");
  const session = await getServerSession();

  if (session) {
    return (
      <DashboardLayout>
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="max-w-xl space-y-6 text-center">
            <h1 className="text-4xl font-bold">
              {t("welcome")} {session.user?.name}
            </h1>
            <p className="text-gray-600">{t("welcomeDescription")}</p>
            <Link
              href={`/${locale}/items`}
              className="rounded-md bg-black px-6 py-3 text-white"
            >
              {t("viewLibrary")}
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="max-w-xl space-y-6 text-center">
          <h1 className="text-4xl font-bold">{t("title")}</h1>
          <p className="text-gray-600">{t("description")}</p>
          <div className="flex justify-center gap-4">
            <Link
              href={`/${locale}/sign-in`}
              className="rounded-md bg-black px-6 py-3 text-white"
            >
              {t("signIn")}
            </Link>
            <Link
              href={`/${locale}/sign-up`}
              className="rounded-md border px-6 py-3"
            >
              {t("signUp")}
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
