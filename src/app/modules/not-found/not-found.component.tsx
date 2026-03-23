import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function NotFoundComponent() {
  const t = useTranslations("notFound");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <div className="flex items-center justify-center mb-8 select-none">
        <span className="text-[120px] md:text-[180px] font-extrabold text-black leading-none">
          4
        </span>

        <div className="w-32 md:w-48 -mx-4 md:-mx-8 z-10 animate-bounce-slow">
          <Image
            src="/404.svg"
            alt="Error illustration"
            width={200}
            height={420}
          />
        </div>

        <span className="text-[120px] md:text-[180px] font-extrabold text-black leading-none">
          4
        </span>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
          {t("title")} <span className="text-xl">⚠️</span>
        </h1>
        <p className="text-gray-500 max-w-xs mx-auto">
          {t("description")}
        </p>
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium transition-transform hover:scale-105 active:scale-95 duration-200 shadow-lg shadow-gray-200"
        >
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
