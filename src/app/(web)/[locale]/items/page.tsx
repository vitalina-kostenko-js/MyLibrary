import { QueryClient } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { getBooksBySubject } from "../../../entities/api";
import { DashboardLayout } from "../../../widgets/dashboard-layout";
import { BooksListComponent } from "../../../widgets/books-list";
import { ReactQueryHydration } from "../../../shared/providers";

const LIST_QUERY_KEY = ["booksBySubject", "science_fiction"] as const;

export default async function ItemsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: LIST_QUERY_KEY,
    queryFn: () => getBooksBySubject("science_fiction"),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydration state={dehydratedState}>
      <div>
        <DashboardLayout>
        <BooksListComponent subject="science_fiction" page={1} />
        </DashboardLayout>
      </div>
    </ReactQueryHydration>
  );
}