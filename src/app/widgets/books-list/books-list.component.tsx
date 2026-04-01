"use client";

import { useBooksBySubject } from "@/app/features/books-by-subject";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";
import { BookFromList } from "../../shared/interfaces";
import { getImageCover } from "../../shared/lib/books";
import { CardHorizontalComponent } from "../../shared/ui/card-horizontal";
import { PaginationComponent } from "../pagination";
import { mapToBookCard } from "./book-list.service";
import { Link } from "../../../pkg/locale";

//interface
interface BooksListComponentProps {
  dataBooks?: BookFromList[];
  subject?: string;
}

const getBookId = (key: string) => key.split("/").filter(Boolean).pop() ?? key;

//component
const BooksListComponent: FC<Readonly<BooksListComponentProps>> = (props) => {
  const { dataBooks, subject } = props;

  const t = useTranslations("books_list");
  const tLoading = useTranslations("loading");

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const itemsPerPage = 12;

  const {
    data: fetchedData,
    isLoading,
    error,
  } = useBooksBySubject(subject ?? "");

  const data = dataBooks ?? fetchedData;

  const paginatedData = useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }

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
                href={`/items/${getBookId(book.key)}?year=${book.first_publish_year ?? ""}`}
                className="block h-full"
              >
                <CardHorizontalComponent
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

export default BooksListComponent;
