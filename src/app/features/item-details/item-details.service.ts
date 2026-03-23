import {
  getBookDetails,
  getPreferredEditionId,
  getWorkDetails,
} from "../../entities/api/books-api";
import {
  ensureHttpsUrl,
  openLibraryJsonUrl,
} from "../../shared/lib/ensure-https";
import {
  BookCardData,
  BookExcerpts,
  BookFromList,
  BookFromWork,
} from "../../shared/interfaces";
import { getImageCover } from "../../shared/lib/books";
import { ItemPageData } from "./item-details.interface";

const getWorkId = (key: string) => key.split("/").filter(Boolean).pop() ?? key;

export const getAuthorName = async (workKey: string): Promise<string> => {
  const workId = getWorkId(workKey);
  const response = await fetch(
    ensureHttpsUrl(`https://openlibrary.org/works/${workId}.json`),
  );
  if (!response.ok) return "";
  const data = await response.json();
  const authorKey = data.authors?.[0]?.author?.key ?? data.authors?.[0]?.key;
  if (!authorKey || typeof authorKey !== "string") return "";
  const authorResponse = await fetch(openLibraryJsonUrl(authorKey));
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

const editionDetailsFromWork = (book: BookFromWork): BookFromList => ({
  key: book.key,
  title: book.title,
  authors: book.authors ?? [],
  subjects: book.subjects ?? [],
  languages: [],
  number_of_pages: 0,
  publishers: [],
});

export const getItemPageData = async (
  id: string,
  editionId?: string | null,
  yearFromList?: string | null,
): Promise<ItemPageData | null> => {
  const hasExplicitEdition = Boolean(editionId?.trim());
  const [book, preferredEditionId] = await Promise.all([
    getWorkDetails(id),
    hasExplicitEdition
      ? Promise.resolve<string | null>(null)
      : getPreferredEditionId(id, yearFromList ?? null),
  ]);

  let bookDetails: BookFromList;
  if (editionId?.trim()) {
    bookDetails = await getBookDetails(editionId.trim());
  } else if (preferredEditionId) {
    try {
      bookDetails = await getBookDetails(preferredEditionId);
    } catch {
      bookDetails = editionDetailsFromWork(book);
    }
  } else {
    bookDetails = editionDetailsFromWork(book);
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
    url: book.url ? ensureHttpsUrl(book.url) : "",
    publish_date:
      yearFromList ??
      (book.first_publish_year != null
        ? String(book.first_publish_year)
        : (book.first_publish_date ?? new Date().getFullYear().toString())),
  };

  const editionDetails = {
    key: bookDetails.key,
    title: bookDetails.title,
    authors: bookDetails.authors,
    subjects: bookDetails.subjects,
    languages: bookDetails.languages ?? [],
    number_of_pages: bookDetails.number_of_pages ?? 0,
    publishers: bookDetails.publishers ?? [],
  }
  return {
    book,
    coverImageUrl: coverImage,
    cleanDescription,
    cardData,
    details,
    editionDetails
  };
};

export const getBookExcerpts = async (
  workKey: string,
): Promise<BookExcerpts[]> => {
  const workId = getWorkId(workKey);
  const response = await fetch(
    ensureHttpsUrl(`https://openlibrary.org/works/${workId}.json`),
  );
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
          typeof authorKey === "string" ? await getAuthorName(authorKey) : "";
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
