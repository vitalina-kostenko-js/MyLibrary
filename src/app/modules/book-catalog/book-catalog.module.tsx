import { BooksListComponent } from "@/app/widgets/books-list";
import { IBookCatalogModuleProps } from "./book-catalog.interface";
import loadBooksForCatalog from "./book-catalog.service";

const BookCatalogModule = async (props: IBookCatalogModuleProps) => {
  const { locale, subject } = props;

  const dataBooks = await loadBooksForCatalog(subject);
  return (
    <BooksListComponent dataBooks={dataBooks} subject={subject} />
  );
}
export default BookCatalogModule;