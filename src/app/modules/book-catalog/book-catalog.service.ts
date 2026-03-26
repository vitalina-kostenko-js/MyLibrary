import { getBooksBySubject } from "@/app/entities/api/books-api";

const loadBooksForCatalog = async (subject: string) => {
  return getBooksBySubject(subject);
}

export default loadBooksForCatalog;