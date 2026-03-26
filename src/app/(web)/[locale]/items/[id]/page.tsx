import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBookExcerpts,
  getItemPageData,
} from "../../../../features/item-details";
import { CardDetailsComponent } from "@/app/shared/ui/card-profile";
import { IItemPageProps } from "@/app/features/item-details";
import { cache } from "react";

const getCachedPageData = cache(async (id: string, year?: string) => {
  return await getItemPageData(id, undefined, year);
});

const getResolvedParams = cache(async (props: IItemPageProps) => {
  const params = await props.params;
  const searchParams = await props.searchParams?.catch(() => ({}));
  return {
    id: params.id,
    locale: params.locale,
    year: (searchParams as { year?: string })?.year,
  };
});

export const generateMetadata = cache(
  async (props: IItemPageProps): Promise<Metadata> => {
    const { id, year } = await getResolvedParams(props);
    const t = await getTranslations("generateMetadata");

    const data = await getCachedPageData(id, year);

    if (!data) return { title: t("notFound") };

    const title = data.book.title ?? t("bookTitle");
    const description =
      typeof data.book.description === "string"
        ? data.book.description
        : (data.book.description as { value?: string })?.value;

    return {
      title: `${title} | ${t("title")}`,
      description: description?.slice(0, 160) || `${t("description")} ${title}`,
    };
  },
);

const ItemPage = async (props: IItemPageProps) => {
  const { id, locale, year } = await getResolvedParams(props);
  const t = await getTranslations("navigation");

  const data = await getCachedPageData(id, year);
  if (!data) notFound();

  const excerpts = await getBookExcerpts(data.book.key);
  const { book, coverImageUrl, cardData, details, editionDetails } = data;

  return (
    <>
      <div className="pb-2">
        <Link href={`/${locale}/items`}>
          <button className="inline-flex items-center gap-1 cursor-pointer">
            <ArrowLeft size={20} /> {t("backToList")}
          </button>
        </Link>
      </div>
      <CardDetailsComponent
        details={details}
        data={cardData}
        editionDetails={editionDetails}
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
    </>
  );
};

export default ItemPage;
