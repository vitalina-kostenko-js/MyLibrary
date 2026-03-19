import { QueryClient } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { getBooksBySubject } from "../../../entities/api";
import { DashboardLayout } from "../../../widgets/dashboard-layout";
import { BooksListComponent } from "../../../widgets/books-list";
import { ReactQueryHydration } from "../../../shared/providers";

const LIST_QUERY_KEY = ["booksBySubject", "science_fiction"] as const;

interface ItemsPageProps {
  searchParams?: Promise<{ page: number }>;
}

export default async function ItemsPage({ searchParams }: ItemsPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: LIST_QUERY_KEY,
    queryFn: () => getBooksBySubject("science_fiction"),
  });

  const dehydratedState = dehydrate(queryClient);

  const sp = await searchParams?.catch(() => ({}));
  const pageParam = (sp as { page: number })?.page;
  const pageNumber =
    pageParam === undefined
      ? 1
      : Math.max(1, parseInt(Array.isArray(pageParam) ? pageParam[0] : pageParam, 10) || 1);

  return (
    <ReactQueryHydration state={dehydratedState}>
      <div>
        <DashboardLayout>
          <BooksListComponent subject="science_fiction" page={pageNumber} />
        </DashboardLayout>
      </div>
    </ReactQueryHydration>
  );
}