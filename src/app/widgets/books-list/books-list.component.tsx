"use client";

import { useBooksBySubject } from "@/app/entities/api/books-api";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";
import { IBookFromList } from "../../entities/models/books-api";
import BooksListPresenter from "./elements/books-list-presenter";

//interface
interface IBooksListProps {
  dataBooks?: IBookFromList[];
  subject?: string;
}

const ITEMS_PER_PAGE = 12;

const BooksList: FC<IBooksListProps> = ({ dataBooks, subject }) => {
  const t = useTranslations("books_list");
  const tLoading = useTranslations("loading");

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");

  const {
    data: fetchedPage,
    isLoading,
    error,
  } = useBooksBySubject(dataBooks ? "" : (subject ?? ""), page, ITEMS_PER_PAGE);

  const { finalBooks, totalCount } = useMemo(() => {
    if (dataBooks) {
      const start = (page - 1) * ITEMS_PER_PAGE;
      return {
        finalBooks: dataBooks.slice(start, start + ITEMS_PER_PAGE),
        totalCount: dataBooks.length,
      };
    }
    return {
      finalBooks: fetchedPage?.books ?? [],
      totalCount: fetchedPage?.workCount ?? 0,
    };
  }, [dataBooks, fetchedPage, page]);

  return (
    <BooksListPresenter
      books={finalBooks}
      totalItems={totalCount}
      itemsPerPage={ITEMS_PER_PAGE}
      isLoading={!dataBooks && isLoading}
      error={error}
      translations={{
        loading: tLoading("loading"),
        errorPrefix: t("error"),
      }}
    />
  );
};

export default BooksList;
