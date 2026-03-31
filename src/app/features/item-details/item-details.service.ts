import { envClient } from "../../../config/env";
import { getWorkDetails } from "../../entities/api/books-api";
import {
  BookCardData,
  BookExcerpts,
  BookFromList,
  BookFromWork,
} from "../../shared/interfaces";
import { getImageCover } from "../../shared/lib/books";
import { ensureHttpsUrl } from "../../shared/lib/ensure-https";
import {
  IItemPageData,
  OpenLibraryExcerptEntry,
} from "./item-details.interface";

//api link
const apiBase = envClient.NEXT_PUBLIC_API_BASE_URL;

const getWorkId = (key: string) => key.split("/").filter(Boolean).pop() ?? key;

const getCleanDesc = (raw: string | { value?: string }) =>
  typeof raw === "string" ? raw : (raw?.value ?? "—");

const fetchApiJson = async <T>(path: string): Promise<T | null> => {
  const res = await fetch(ensureHttpsUrl(`${apiBase}${path}`));

  return res.ok ? ((await res.json()) as T) : null;
};

//type
type WorkAuthorRow = { author?: { key?: string }; key?: string };

export const getAuthorName = async (workKey: string): Promise<string> => {
  const data = await fetchApiJson<{ authors?: WorkAuthorRow[] }>(
    `/works/${getWorkId(workKey)}.json`,
  );

  const first = data?.authors?.[0];

  const authorKey =
    first?.author?.key ??
    (typeof first?.key === "string" ? first.key : undefined);
  if (!authorKey) {
    return "";
  }

  const author = await fetchApiJson<{ name?: string }>(
    `/authors/${authorKey}.json`,
  );

  return author?.name ?? "";
};

export const mapToBookCard = async (
  book: BookFromWork,
): Promise<BookCardData> => {
  const inline = book.authors?.[0]?.name?.trim();

  return {
    title: book.title,
    author: inline || (await getAuthorName(book.key)),
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
  yearFromList?: string | null,
): Promise<IItemPageData | null> => {
  const book = await getWorkDetails(id);

  const bookDetails = editionDetailsFromWork(book);
  const cardData = await mapToBookCard(book);
  const cleanDescription = getCleanDesc(book.description ?? "");

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
    editionDetails: { ...bookDetails, languages: bookDetails.languages ?? [] },
  };
};

export const getBookExcerpts = async (
  workKey: string,
): Promise<BookExcerpts[]> => {
  const data = await fetchApiJson<{ excerpts?: OpenLibraryExcerptEntry[] }>(
    `/works/${getWorkId(workKey)}.json`,
  );

  const rows = data?.excerpts ?? [];

  return Promise.all(
    rows.map(async (e) => ({
      excerpt: e.value ?? e.excerpt ?? "",
      comment: e.comment ?? "",
      author:
        typeof e.author?.key === "string"
          ? await getAuthorName(e.author.key)
          : "",
    })),
  );
};
