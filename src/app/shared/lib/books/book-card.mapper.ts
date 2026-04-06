import type {
  IAuthor,
  IBookCardData,
  IBookFromList,
} from "@/app/entities/models/books-api";

function joinAuthorNames(authors: IAuthor[]): string {
  return authors.map((a) => a.name).join(", ");
}

export const mapListBookToCard = (book: IBookFromList): IBookCardData => {
  return {
    title: book.title,
    author: joinAuthorNames(book.authors ?? []),
    subjects: book.subjects ?? [],
    first_publish_year: book.first_publish_year ?? 0,
  };
};
