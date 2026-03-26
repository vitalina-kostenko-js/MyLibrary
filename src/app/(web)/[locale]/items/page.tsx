import { ReactQueryHydration } from "@/app/shared/providers";
import { BooksListComponent } from "@/app/widgets/books-list";
import { getPageFromSearchParams } from "@/app/shared/lib";
import { getDehydratedBooksState, IItemsPageProps } from "@/app/modules/book-catalog";

const SUBJECT = "science_fiction";

export default async function ItemsPage({ searchParams }: IItemsPageProps) {
  const dehydratedState = await getDehydratedBooksState(SUBJECT);

  const sp = await searchParams?.catch(() => ({}));
  const pageNumber = getPageFromSearchParams(sp as Record<string, string | string[] | undefined>);

  return (
    <ReactQueryHydration state={dehydratedState}>
      <BooksListComponent subject={SUBJECT} page={pageNumber} />
    </ReactQueryHydration>
  );
}