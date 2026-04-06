import { IBookFromList, IBookFromWork } from "../../models/books-api";
import { IOpenLibraryEdition, IOpenLibraryWork } from "../../models/books-api";
import { buildSubjectWorksPath, fetchJson } from "./http.api";
import { mapOpenLibraryEditionToBookFromList } from "./mappers.api";

const DEFAULT_PAGE_SIZE = 12;

type TGetBooksBySubjectOptions = {
  signal?: AbortSignal;
  offset?: number;
  limit?: number;
};

export type TBooksBySubjectPage = {
  books: IBookFromList[];
  workCount: number;
};

export const getBooksBySubject = async (
  subject: string,
  options?: TGetBooksBySubjectOptions,
): Promise<TBooksBySubjectPage> => {
  const limit = options?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = options?.offset ?? 0;
  const signal = options?.signal;

  const json = await fetchJson<{
    works?: IOpenLibraryWork[];
    work_count?: number;
  }>(buildSubjectWorksPath(subject, limit, offset), {
    next: { revalidate: 3600 },
    cache: "force-cache",
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

export const getWorkDetails = (key: string): Promise<IBookFromWork> =>
  fetchJson<IBookFromWork>(`/works/${key}.json`, {
    next: {
      revalidate: 3600,
      tags: [key],
    },
    cache: "force-cache",
  });

export const getBookDetails = async (
  edition: string,
): Promise<IBookFromList> => {
  const json = await fetchJson<IOpenLibraryEdition>(`/books/${edition}.json`, {
    next: {
      revalidate: 3600,
      tags: [edition],
    },
    cache: "force-cache",
  });

  return mapOpenLibraryEditionToBookFromList(json);
};
