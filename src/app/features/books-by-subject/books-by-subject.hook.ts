"use client";

import {
  bookKeys,
  getBooksBySubject,
  type BooksBySubjectPage,
} from "@/app/entities/api/books-api";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_PAGE_SIZE = 12;

//hook
export const useBooksBySubject = (
  subject: string,
  page: number,
  pageSize: number = DEFAULT_PAGE_SIZE,
) => {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;

  return useQuery<BooksBySubjectPage>({
    queryKey: bookKeys.bySubject(subject, safePage, pageSize),
    queryFn: ({ signal }) =>
      getBooksBySubject(subject, {
        signal,
        limit: pageSize,
        offset: (safePage - 1) * pageSize,
      }),
    enabled: !!subject,
    staleTime: 5 * 60 * 1000,
  });
};
