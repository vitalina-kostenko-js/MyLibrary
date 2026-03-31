import { ReactQueryHydration } from "@/app/shared/providers";
import { getDehydratedBooksState } from "../../../modules/book-catalog";
import { BooksListComponent } from "../../../widgets/books-list";

//interface
interface IProps {}

//ISR configuration
export const revalidate = 3600;

const Page = async () => {
  const dehydratedState = await getDehydratedBooksState("science_fiction");

  return (
    <ReactQueryHydration state={dehydratedState}>
      <BooksListComponent subject="science_fiction" />
    </ReactQueryHydration>
  );
};

export default Page