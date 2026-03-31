import { getBookExcerpts, IItemPageProps } from "@/app/features/item-details";
import { CardDetailsComponent } from "@/app/shared/ui/card-profile";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getItemPageData } from "../../../../features/item-details";
import { Link } from "../../../../../pkg/locale";

//dynamic
export const dynamic = "force-dynamic";

//metadata
export const generateMetadata = async (
  props: IItemPageProps,
): Promise<Metadata> => {
  const { id } = await props.params;

  const data = await getItemPageData(id);

  return {
    title: data?.book?.title || "Book",
    description:
      typeof data?.book?.description === "string"
        ? data.book.description
        : (data?.book?.description?.value ?? "Description"),
  };
};

//page
const Page = async (props: IItemPageProps) => {
  const { params } = props;

  const { id } = await params;
  const { year } = (await props.searchParams) ?? {};

  const t = await getTranslations("navigation");

  const data = await getItemPageData(id, year);

  if (!data) {
    notFound();
  }

  const excerpts = await getBookExcerpts(data.book.key);

  const { book, coverImageUrl, cardData, details, editionDetails } = data;

  return (
    <>
      <div className="pb-2">
        <Link href="/items">
          <button className="inline-flex items-center gap-1 cursor-pointer">
            <ArrowLeft size={20} />
            {t("backToList")}
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

export default Page;
