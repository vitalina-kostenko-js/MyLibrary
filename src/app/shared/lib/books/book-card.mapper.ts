import type { Author, Book, BookCardData } from "@/app/shared/interfaces";

function joinAuthorNames(authors: Author[]): string {
  return authors.map((a) => a.name).join(", ");
}

export function mapListBookToCard(book: Book): BookCardData {
  return {
    title: book.title,
    author: joinAuthorNames(book.authors ?? []),
    subjects: book.subjects ?? [],
    first_publish_year: book.first_publish_year ?? 0,
  };
}
