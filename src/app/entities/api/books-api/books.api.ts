import { BookFromList, BookFromWork } from "../../../shared/interfaces";
import { OpenLibraryEdition, OpenLibraryWork } from "../../models/books-api";
import {
  buildSubjectWorksPath,
  fetchJson,
  olRevalidate,
} from "./books-api.http";
import { mapOpenLibraryEditionToBookFromList } from "./books-api.mappers";

const DEFAULT_PAGE_SIZE = 12;

export type GetBooksBySubjectOptions = {
  signal?: AbortSignal;
  offset?: number;
  limit?: number;
};

export type BooksBySubjectPage = {
  books: BookFromList[];
  workCount: number;
};

export const getBooksBySubject = async (
  subject: string,
  options?: GetBooksBySubjectOptions,
): Promise<BooksBySubjectPage> => {
  const limit = options?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = options?.offset ?? 0;
  const signal = options?.signal;

  const json = await fetchJson<{
    works?: OpenLibraryWork[];
    work_count?: number;
  }>(buildSubjectWorksPath(subject, limit, offset), {
    ...olRevalidate,
    signal,
  });

  const subjectLower = subject.toLowerCase();

  const books = (json.works ?? []).map((w) => ({
    key: w.key,
    title: w.title,
    cover_id: w.cover_id,
    first_publish_year: w.first_publish_year,
    authors: w.authors ?? [],
    subjects: (w.subject ?? []).filter((s) => s.toLowerCase() !== subjectLower),
  }));

  const workCount =
    typeof json.work_count === "number"
      ? json.work_count
      : offset + books.length;

  return { books, workCount };
};

export const getWorkDetails = (key: string): Promise<BookFromWork> =>
  fetchJson<BookFromWork>(`/works/${key}.json`, {
    next: { revalidate: 3600, tags: [key] },
  });

export const getBookDetails = async (edition: string): Promise<BookFromList> => {
  const json = await fetchJson<OpenLibraryEdition>(`/books/${edition}.json`, {
    next: { revalidate: 3600, tags: [edition] },
  });

  return mapOpenLibraryEditionToBookFromList(json);
};
