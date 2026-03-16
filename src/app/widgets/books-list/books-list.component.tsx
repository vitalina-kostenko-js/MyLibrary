"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CardHorizontal } from "../../shared/ui/card-horizontal";
import { useBooksBySubject } from "../../shared/hooks";
import { BookFromList } from "../../shared/interfaces";
import { getImageCover, mapToBookCard } from ".";
import { useTranslations } from "next-intl";

const getBookId = (key: string) => key.split("/").filter(Boolean).pop() ?? key;

export const BooksListComponent = () => {
  const t = useTranslations("books_list");
  const tLoading = useTranslations("loading");
  const params = useParams();
  const locale = (params.locale as string) ?? "en";
  const { data, isLoading, error } = useBooksBySubject("subject");

  return (
    <>
      {isLoading && <div>{tLoading("loading")}</div>}
      {error && <div>{t("error")}: {error.message}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(data) &&
          data.map((book: BookFromList) => (
            <div key={book.key} className="min-h-0">
              <Link
                href={`/${locale}/items/${getBookId(book.key)}`}
                className="block h-full"
              >
                <CardHorizontal
                  data={mapToBookCard(book)}
                  media={
                    book.cover_id ? (
                      <div className="relative w-[120px] h-[180px]">
                        <Image
                          src={getImageCover(book.cover_id ?? 0)}
                          alt={`${book.title} cover`}
                          fill
                          className="object-contain rounded p-2"
                        />
                      </div>
                    ) : (
                      <div className="relative w-[120px] h-[180px]">
                        <Image
                          src="/No-Cover-Image-01.png"
                          alt={`${book.title} cover`}
                          fill
                          className="object-contain rounded p-2"
                        />
                      </div>
                    )
                  }
                />
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};
