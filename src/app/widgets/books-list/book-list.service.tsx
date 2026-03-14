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

export const getImageCover = (cover_id: number): string => {
  return cover_id ? `https://covers.openlibrary.org/b/id/${cover_id}-L.jpg` : "/No-Cover-Image-01.png";
};

export const getAuthorName = async (workId: string) => {
    const response = await fetch(`https://openlibrary.org/works/${workId}.json`);
    const data = await response.json();
    const authorKey = data.authors?.[0]?.author?.key;
    const authorResponse = await fetch(`https://openlibrary.org${authorKey}.json`);
    const authorData = await authorResponse.json();
    return authorData.name;
};