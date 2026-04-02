import { ReactQueryHydration } from "@/app/shared/providers";
import { getDehydratedBooksState } from "../../../modules/book-catalog";
import { BooksListComponent } from "../../../widgets/books-list";

//ISR configuration
export const revalidate = 3600;

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const dehydratedState = await getDehydratedBooksState(
    "science_fiction",
    page,
  );

  return (
    <ReactQueryHydration state={dehydratedState}>
      <BooksListComponent subject="science_fiction" />
    </ReactQueryHydration>
  );
};

export default Page