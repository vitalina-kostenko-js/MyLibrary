import Link from "next/link";
import { DashboardLayout } from "../widgets/dashboard-layout";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");

  const session = await getServerSession();

  if (session) {
    return (
      <DashboardLayout>
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
          <div className="max-w-xl space-y-6 text-center">
            <h1 className="text-4xl font-bold">{t("welcome")} {session.user?.name}</h1>
            <p className="text-gray-600">{t("welcomeDescription")}</p>
            <Link
              href="/items"
              className="px-6 py-3 bg-black text-white rounded-md"
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
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
        <div className="max-w-xl space-y-6 text-center">
          <h1 className="text-4xl font-bold">{t("title")}</h1>

          <p className="text-gray-600">{t("description")}</p>

          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="px-6 py-3 bg-black text-white rounded-md"
            >
              {t("signIn")}
            </Link>

            <Link href="/register" className="px-6 py-3 border rounded-md">
              {t("createAccount")}
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
