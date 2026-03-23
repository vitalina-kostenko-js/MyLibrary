import { Author, Book, BookCardData } from "../../shared/interfaces";

export const getAuthors = (authors: Author[]): string => {
  return authors.map((author: Author) => author.name).join(", ");
};

export const mapToBookCard = (book: Book): BookCardData => {
  return {
    title: book.title,
    author: getAuthors(book.authors ?? []),
    subjects: book.subjects ?? [],
    first_publish_year: book.first_publish_year ?? 0,
  };
};