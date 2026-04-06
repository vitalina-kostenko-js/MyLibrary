import {
  getAuthorName,
  getBookDetails,
  getPreferredEditionId,
  getWorkDetails,
  mapWorkBookToCard,
} from "../../entities/api/books-api";
import {
  IBookExcerpts,
  IBookFromList,
  IBookFromWork,
  IWorkExcerptEntry,
} from "../../entities/models/books-api";
import { getImageCover } from "../../shared/lib/books";
import { ensureHttpsUrl } from "../../shared/lib/ensure-https";
import { IItemPageData } from "./item-details.interface";

const getCleanDesc = (raw: string | { value?: string }) =>
  typeof raw === "string" ? raw : (raw?.value ?? "—");

const editionDetailsFromWork = (book: IBookFromWork): IBookFromList => ({
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
  const bookPromise = getWorkDetails(id);
  const editionIdPromise = getPreferredEditionId(id, yearFromList);

  const cardDataPromise = bookPromise.then((book) => mapWorkBookToCard(book));

  const editionDetailsPromise = Promise.all([
    bookPromise,
    editionIdPromise,
  ]).then(([book, editionId]) => {
    return editionId ? getBookDetails(editionId) : editionDetailsFromWork(book);
  });

  const [book, editionId, cardData, editionDetails] = await Promise.all([
    bookPromise,
    editionIdPromise,
    cardDataPromise,
    editionDetailsPromise,
  ]);

  const cleanDescription = getCleanDesc(book.description ?? "—");

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
  book: IBookFromWork,
): Promise<IBookExcerpts[]> => {
  const rows = book.excerpts ?? [];

  return Promise.all(
    rows.map(async (e: IWorkExcerptEntry) => ({
      excerpt: e.value ?? e.excerpt ?? "",
      comment: e.comment ?? "",
      author: e.author?.key ? await getAuthorName(e.author.key) : "",
    })),
  );
};
