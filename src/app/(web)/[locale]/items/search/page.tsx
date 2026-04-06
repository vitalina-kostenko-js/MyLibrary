import { BooksListComponent } from "@/app/widgets/books-list";
import { FC } from "react";
import { getDehydratedBooksState } from "../../../../modules/book-catalog/book-catalog.prefetch";
import { ReactQueryHydration } from "../../../../shared/providers/react-query-provider";

//interface
interface IProps {
  searchParams: Promise<{ query?: string }>;
}

//page
const SearchPage: FC<Readonly<IProps>> = async (props) => {
  const { searchParams } = props;

  const { query } = await searchParams;
  const dehydratedState = await getDehydratedBooksState(query ?? "");

  return (
    <ReactQueryHydration state={dehydratedState}>
      <BooksListComponent subject={query} />
    </ReactQueryHydration>
  );
};
export default SearchPage;
