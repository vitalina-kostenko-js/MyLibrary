"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { getImageCover, mapToBookCard } from ".";
import { useBooksBySubject } from "../../shared/hooks";
import { BookFromList } from "../../shared/interfaces";
import { CardHorizontal } from "../../shared/ui/card-horizontal";
import { PaginationComponent } from "../pagination";

interface BooksListComponentProps {
  dataBooks?: BookFromList[];
  subject?: string;
  page?: number;
}

const getBookId = (key: string) => key.split("/").filter(Boolean).pop() ?? key;

export const BooksListComponent = ({ dataBooks, subject, page }: BooksListComponentProps) => {
  const itemsPerPage = 12;

  const t = useTranslations("books_list");
  const tLoading = useTranslations("loading");
  const params = useParams();
  const locale = (params.locale as string) ?? "en";
  const { data: fetchedData, isLoading, error } = useBooksBySubject(subject ?? "");
  const data = dataBooks ?? fetchedData;

  const paginatedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const start = ((page ?? 1) - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, page]);

  return (
    <>
      {isLoading && <div>{tLoading("loading")}</div>}
      {error && (
        <div>
          {t("error")}: {error.message}
        </div>
      )}

      <div className="py-2">
        <PaginationComponent
          totalItems={data?.length ?? 0}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(data) &&
          paginatedData.map((book: BookFromList) => (
            <div key={book.key} className="min-h-0" data-testid="item-card">
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
