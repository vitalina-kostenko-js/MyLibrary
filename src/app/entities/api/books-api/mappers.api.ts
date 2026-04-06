import {
  IBookCardData,
  IBookFromList,
  IBookFromWork,
} from "../../models/books-api";
import {
  IOpenLibraryEdition,
  normalizePublishers,
} from "../../models/books-api";
import { getAuthorName } from "./authors.api";

const normalizeLanguageEntry = (raw: unknown): string => {
  if (typeof raw === "string") {
    return raw;
  }

  if (raw && typeof raw === "object" && "key" in raw) {
    const k = (raw as { key?: string }).key;

    if (typeof k === "string") {
      const seg = k.split("/").filter(Boolean).pop();
      return seg ?? k;
    }
  }

  return "";
};

export const mapOpenLibraryEditionToBookFromList = (
  json: IOpenLibraryEdition,
): IBookFromList => ({
  key: json.key,
  title: json.title,
  cover_id: json.covers?.[0],
  authors: (json.authors ?? []).map((a) => ({ key: a.key ?? "", name: "" })),
  subjects: json.subjects ?? [],
  languages: Array.isArray(json.languages)
    ? json.languages.map(normalizeLanguageEntry).filter(Boolean)
    : [],
  publishers: normalizePublishers(json.publishers),
  number_of_pages: json.number_of_pages ?? 0,
});

export const mapWorkBookToCard = async (
  book: IBookFromWork,
): Promise<IBookCardData> => {
  const inlineName = book.authors?.[0]?.name;

  return {
    title: book.title,
    author: inlineName || (await getAuthorName(book.authors)),
    subjects: book.subjects ?? [],
    first_publish_year: book.first_publish_year ?? 0,
  };
};
