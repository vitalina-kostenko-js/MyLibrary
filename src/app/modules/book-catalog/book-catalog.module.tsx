import { BooksListComponent } from "@/app/widgets/books-list";
import type { BookCatalogModuleProps } from "./book-catalog.interface";
import { loadBooksForCatalog } from "./book-catalog.service";

export async function BookCatalogModule({ locale, subject }: BookCatalogModuleProps) {
  const dataBooks = await loadBooksForCatalog(subject);
  return (
    <BooksListComponent dataBooks={dataBooks} subject={subject} />
  );
}