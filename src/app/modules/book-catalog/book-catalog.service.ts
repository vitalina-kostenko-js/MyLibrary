import { getBooksBySubject } from "@/app/entities/api/books-api";

export async function loadBooksForCatalog(subject: string) {
  return getBooksBySubject(subject);
}