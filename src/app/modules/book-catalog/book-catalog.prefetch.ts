import { bookKeys, getBooksBySubject } from "@/app/entities/api/books-api";
import { QueryClient, dehydrate } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 12;

export const getDehydratedBooksState = async (
  subject: string,
  page: number = 1,
) => {
  const queryClient = new QueryClient();
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;

  await queryClient.prefetchQuery({
    queryKey: bookKeys.bySubject(subject, safePage, ITEMS_PER_PAGE),
    queryFn: () =>
      getBooksBySubject(subject, {
        limit: ITEMS_PER_PAGE,
        offset: (safePage - 1) * ITEMS_PER_PAGE,
      }),
  });

  return dehydrate(queryClient);
};
