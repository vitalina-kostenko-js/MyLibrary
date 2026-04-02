import {
  getAuthorName,
  getBookDetails,
  getPreferredEditionId,
  getWorkDetails,
  mapWorkBookToCard,
} from "../../entities/api/books-api";
import {
  BookExcerpts,
  BookFromList,
  BookFromWork,
  WorkExcerptEntry,
} from "../../shared/interfaces";
import { getImageCover } from "../../shared/lib/books";
import { ensureHttpsUrl } from "../../shared/lib/ensure-https";
import { IItemPageData } from "./item-details.interface";

const getCleanDesc = (raw: string | { value?: string }) =>
  typeof raw === "string" ? raw : (raw?.value ?? "—");

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
  yearFromList?: string | null,
): Promise<IItemPageData | null> => {
  const [book, editionId] = await Promise.all([
    getWorkDetails(id),
    getPreferredEditionId(id, yearFromList),
  ]);

  const cleanDescription = getCleanDesc(book.description ?? "—");

  const [cardData, editionDetails] = await Promise.all([
    mapWorkBookToCard(book),
    editionId
      ? getBookDetails(editionId)
      : Promise.resolve(editionDetailsFromWork(book)),
  ]);

  return {
    book,
    cardData,
    cleanDescription,
    coverImageUrl: getImageCover(book.cover_id ?? book.covers?.[0] ?? 0),
    details: {
      key: book.key,
      author: cardData.author,
      description: cleanDescription,
      url: book.url ? ensureHttpsUrl(book.url) : "",
      publish_date:
        yearFromList ??
        String(
          book.first_publish_year ??
            book.first_publish_date ??
            new Date().getFullYear(),
        ),
    },
    editionDetails,
  };
};

export const getBookExcerpts = async (
  book: BookFromWork,
): Promise<BookExcerpts[]> => {
  const rows = book.excerpts ?? [];

  return Promise.all(
    rows.map(async (e: WorkExcerptEntry) => ({
      excerpt: e.value ?? e.excerpt ?? "",
      comment: e.comment ?? "",
      author: e.author?.key ? await getAuthorName(e.author.key) : "",
    })),
  );
};
