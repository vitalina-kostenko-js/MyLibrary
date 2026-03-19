import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardDetails } from "../../../../shared/ui/card-profile";
import { DashboardLayout } from "../../../../widgets/dashboard-layout";
import { getBookExcerpts, getItemPageData, ItemPageProps } from "../../../../features/item-details";

export async function generateMetadata({
  params,
  searchParams,
}: ItemPageProps): Promise<Metadata> {
  const t = await getTranslations("generateMetadata");
  const { id } = await params;
  const sp = (await searchParams?.catch(() => ({}))) as
    | { year?: string }
    | undefined;
  const data = await getItemPageData(id, sp?.year);
  if (!data) {
    return { title: t("notFound") };
  }
  const title = data.book.title ?? t("bookTitle");
  const description =
    typeof data.book.description === "string"
      ? data.book.description.slice(0, 160)
      : ((data.book.description as { value?: string })?.value?.slice(0, 160) ??
        data.cardData.title);
  return {
    title: `${title} | ${t("title")}`,
    description: description || `${t("description")} ${title}`,
  };
}

export default async function ItemPage({
  params,
  searchParams,
}: ItemPageProps) {
  const t = await getTranslations("navigation");
  const { locale, id } = await params;
  const sp = (await searchParams?.catch(() => ({}))) as
    | { year?: string }
    | undefined;

  const data = await getItemPageData(id, sp?.year);
  if (!data) notFound();

  const excerpts = await getBookExcerpts(data.book.key);
  const { book, coverImageUrl, cardData, details } = data;

  return (
    <DashboardLayout>
      <div className="pb-2">
        <Link href={`/${locale}/items`}>
          <button className="inline-flex items-center gap-1 cursor-pointer">
            <ArrowLeft size={20} /> {t("backToList")}
          </button>
        </Link>
      </div>
      <CardDetails
        details={details}
        data={cardData}
        media={
          <Image
            src={coverImageUrl}
            alt={book.title}
            fill
            className="object-cover rounded p-2"
          />
        }
        excerpts={excerpts}
      />
    </DashboardLayout>
  );
}
