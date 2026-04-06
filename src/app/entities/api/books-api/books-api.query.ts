import { useQuery } from "@tanstack/react-query";
import { TBooksBySubjectPage, getBooksBySubject } from "./books.api";

//query key
export const bookKeys = {
  all: ["books"] as const,
  bySubject: (subject: string, page: number, pageSize: number) =>
    ["books", "subject", subject, page, pageSize] as const,
  detail: (id: string) => ["books", "detail", id] as const,
  work: (key: string) => ["books", "work", key] as const,
};

const DEFAULT_PAGE_SIZE = 12;

//hook
export const useBooksBySubject = (
  subject: string,
  page: number,
  pageSize: number = DEFAULT_PAGE_SIZE,
) => {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;

  return useQuery<TBooksBySubjectPage>({
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
