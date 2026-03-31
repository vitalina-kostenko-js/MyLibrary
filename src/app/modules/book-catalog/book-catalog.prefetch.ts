import { bookKeys, getBooksBySubject } from "@/app/entities/api/books-api";
import { QueryClient, dehydrate } from "@tanstack/react-query";

export const getDehydratedBooksState = async (subject: string) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: bookKeys.bySubject(subject),
    queryFn: () => getBooksBySubject(subject),
  });

  return dehydrate(queryClient);
};
