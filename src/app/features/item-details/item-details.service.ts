import { getBookDetails } from "../../entities/api/books-api";
import {
  BookCardData,
  BookExcerpts,
  BookFromWork,
} from "../../shared/interfaces";
import { getImageCover } from "../../widgets/books-list";
import { ItemPageData } from "./item-details.interface";

const getWorkId = (key: string) => key.split("/").filter(Boolean).pop() ?? key;

export const getAuthorName = async (workKey: string): Promise<string> => {
  const workId = getWorkId(workKey);
  const response = await fetch(`https://openlibrary.org/works/${workId}.json`);
  if (!response.ok) return "";
  const data = await response.json();
  const authorKey = data.authors?.[0]?.author?.key ?? data.authors?.[0]?.key;
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
  yearFromList?: string | null,
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
      : ((rawDescription as unknown as { value?: string })?.value ?? "—");

  const cardData = await mapToBookCard(book);
  const details = {
    key: book.key,
    author: cardData.author,
    description: cleanDescription,
    url: book.url ?? "",
    publish_date:
      yearFromList ??
      (book.first_publish_year != null
        ? String(book.first_publish_year)
        : (book.first_publish_date ?? new Date().getFullYear().toString())),
  };
  return {
    book,
    coverImageUrl: coverImage,
    cleanDescription,
    cardData,
    details,
  };
};

export const getBookExcerpts = async (
  workKey: string,
): Promise<BookExcerpts[]> => {
  const workId = getWorkId(workKey);
  const response = await fetch(`https://openlibrary.org/works/${workId}.json`);
  if (!response.ok) return [];
  const data = await response.json();
  const rawExcerpts = data.excerpts ?? [];
  if (!Array.isArray(rawExcerpts)) return [];

  const excerpts: BookExcerpts[] = await Promise.all(
    rawExcerpts.map(
      async (e: {
        value?: string;
        excerpt?: string;
        comment?: string;
        author?: { key?: string };
      }) => {
        const authorKey = e.author?.key;
        const author =
          typeof authorKey === "string" ? await getAuthorName(workKey) : "";
        return {
          excerpt: e.value ?? e.excerpt ?? "",
          comment: e.comment ?? "",
          author,
        };
      },
    ),
  );
  return excerpts;
};
