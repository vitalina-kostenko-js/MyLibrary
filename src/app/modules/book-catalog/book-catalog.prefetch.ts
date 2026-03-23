import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getBooksBySubject } from "@/app/entities/api";

const listQueryKey = (subject: string) => ["booksBySubject", subject] as const;

export const getDehydratedBooksState = async (subject: string) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: listQueryKey(subject),
    queryFn: () => getBooksBySubject(subject),
  });
  return dehydrate(queryClient);
}