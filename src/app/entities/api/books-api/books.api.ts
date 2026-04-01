import { BookFromList, BookFromWork } from "../../../shared/interfaces";
import { OpenLibraryEdition, OpenLibraryWork } from "../../models/books-api";
import { fetchJson, olRevalidate } from "./books-api.http";
import { mapOpenLibraryEditionToBookFromList } from "./books-api.mappers";

const DEFAULT_WORKS_LIMIT = 100;

export const getBooksBySubject = async (
  subject: string,
  signal?: AbortSignal,
  limit: number = DEFAULT_WORKS_LIMIT,
): Promise<BookFromList[]> => {
  const json = await fetchJson<{ works?: OpenLibraryWork[] }>(
    `/subjects/${encodeURIComponent(subject)}.json?limit=${limit}`,
    { ...olRevalidate, signal },
  );

  const subjectLower = subject.toLowerCase();

  return (json.works ?? []).map((w) => ({
    key: w.key,
    title: w.title,
    cover_id: w.cover_id,
    first_publish_year: w.first_publish_year,
    authors: w.authors ?? [],
    subjects: (w.subject ?? []).filter((s) => s.toLowerCase() !== subjectLower),
  }));
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
