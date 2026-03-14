import { getBookDetails } from "../../../../entities/api/books-api";
import { BookCardData, BookFromWork } from "../../../../shared/interfaces";
import { getImageCover } from "../../../../widgets/books-list";
import { ItemPageData } from "./item.interface";

export const getAuthorName = async (workId: string): Promise<string> => {
  const response = await fetch(`https://openlibrary.org/works/${workId}.json`);
  if (!response.ok) return "";
  const data = await response.json();
  const authorKey = data.authors?.[0]?.author?.key;
  if (!authorKey || typeof authorKey !== "string") return "";
  const authorResponse = await fetch(
    `https://openlibrary.org${authorKey}.json`,
  );
  if (!authorResponse.ok) return "";
  const authorData = await authorResponse.json();
  return authorData?.name ?? "";
};

export const mapToBookCard = async (
  book: BookFromWork,
): Promise<BookCardData> => {
  return {
    title: book.title,
    author: await getAuthorName(book.key),
    subjects: book.subjects ?? [],
    first_publish_year: book.first_publish_year ?? 0,
  };
};

export const getItemPageData = async (
  id: string,
): Promise<ItemPageData | null> => {
  let book: BookFromWork;
  try {
    book = await getBookDetails(id);
  } catch {
    return null;
  }
  const coverImage = getImageCover(book.cover_id ?? book.covers?.[0] ?? 0);

  const rawDescription = book.description;
  const cleanDescription =
    typeof rawDescription === "string"
      ? rawDescription
      : ((rawDescription as unknown as { value?: string })?.value ??
        "—");

  const cardData = await mapToBookCard(book);
  const details = {
    key: book.key,
    description: cleanDescription,
    url: book.url ?? "",
  };
  return {
    book,
    coverImageUrl: coverImage,
    cleanDescription,
    cardData,
    details,
  };
};
