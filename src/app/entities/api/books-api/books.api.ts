import { envClient } from "../../../../config/env";
import { BookFromList, BookFromWork } from "../../../shared/interfaces";
import { ensureHttpsUrl } from "../../../shared/lib/ensure-https";
import {
  EditionEntry,
  normalizePublishers,
  OpenLibraryEdition,
  OpenLibraryWork,
  parseYear,
} from "../../models/books-api";

//limit
const DEFAULT_WORKS_LIMIT = 100;

//api link
const apiBase = envClient.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");

// HTTP helper
const fetchFromApi = (path: string, init?: RequestInit): Promise<Response> => {
  const p = path.startsWith("/") ? path : `/${path}`;

  return fetch(ensureHttpsUrl(`${apiBase}${p}`), init);
};

const fetchJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
  try {
    const res = await fetchFromApi(path, init);

    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${path}`);
    }

    return res.json() as Promise<T>;
  } catch (error) {
    console.error(`[API] Request failed: ${path}`, error);
    throw error;
  }
};

//normalize data
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

//utility for search edition
const getEditionId = (e: EditionEntry): string | null => {
  const k = e.key;

  if (typeof k !== "string" || !k.includes("/books/")) {
    return null;
  }

  const id = k.split("/").filter(Boolean).pop();

  return id?.startsWith("OL") ? id : null;
};

//public api function
export const getBooksBySubject = async (
  subject: string,
  signal?: AbortSignal,
  limit: number = DEFAULT_WORKS_LIMIT,
): Promise<BookFromList[]> => {
  const json = await fetchJson<{ works?: OpenLibraryWork[] }>(
    `/subjects/${encodeURIComponent(subject)}.json?limit=${limit}`,
    { next: { revalidate: 3600 }, signal },
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
    cache: "force-cache",
    next: {
      revalidate: 3600,
      tags: [key],
    },
  });

export const getPreferredEditionId = async (
  workId: string,
  preferredYear?: string | null,
  limit: number = DEFAULT_WORKS_LIMIT,
): Promise<string | null> => {
  const json = await fetchJson<{ entries?: EditionEntry[] }>(
    `/works/${workId}/editions.json?limit=${limit}`,

    { next: { revalidate: 3600 } },
  );

  const entries = json?.entries;

  if (!Array.isArray(entries) || entries.length === 0) {
    return null;
  }

  const targetYear = preferredYear?.trim()
    ? parseInt(preferredYear.trim(), 10)
    : null;

  if (Number.isFinite(targetYear)) {
    for (const e of entries) {
      const id = getEditionId(e);

      if (!id) continue;

      if (parseYear(e.publish_date) === targetYear) {
        return id;
      }
    }
  }

  return entries.map(getEditionId).find(Boolean) ?? null;
};

export const getBookDetails = async (
  edition: string,
): Promise<BookFromList> => {
  const json = await fetchJson<OpenLibraryEdition>(`/books/${edition}.json`, {
    cache: "force-cache",
    next: { revalidate: 3600, tags: [edition] },
  });

  return {
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
  };
};
