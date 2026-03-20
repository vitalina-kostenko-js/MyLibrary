import { ensureHttpsUrl } from "../../../shared/lib/ensure-https";
import { BookFromList, BookFromWork } from "../../../shared/interfaces";

const DEFAULT_WORKS_LIMIT = 100;

export const getBooksBySubject = async (
  subject: string,
  limit: number = DEFAULT_WORKS_LIMIT,
): Promise<BookFromList[]> => {
  const response = await fetch(
    ensureHttpsUrl(
      `https://openlibrary.org/subjects/${subject}.json?limit=${limit}`,
    ),
    { next: { revalidate: 3600 } },
  );
  if (!response.ok)
    throw new Error(
      `Failed to fetch books for subject "${subject}" - ${response.status}`,
    );
  const json = await response.json();
  const works = json?.works;
  if (!Array.isArray(works)) return [];

  const subjectLower = subject.toLowerCase();
  return works.map(
    (w: {
      key: string;
      title: string;
      cover_id?: number;
      first_publish_year?: number;
      authors?: { name: string; key: string }[];
      subject?: string[];
    }) => {
      const raw = Array.isArray(w.subject) ? w.subject : [];
      const subjects = raw.filter((s) => s.toLowerCase() !== subjectLower);
      return {
        key: w.key,
        title: w.title,
        cover_id: w.cover_id,
        first_publish_year: w.first_publish_year,
        authors: Array.isArray(w.authors) ? w.authors : [],
        subjects,
      };
    },
  );
};

export const getWorkDetails = async (key: string): Promise<BookFromWork> => {
  const response = await fetch(ensureHttpsUrl(`https://openlibrary.org/works/${key}.json`), {
    cache: "no-store",
  });
  if (!response.ok)
    throw new Error(
      `Failed to fetch book details for key "${key}" - ${response.status}`,
    );
  const json = await response.json();
  return json;
};

const normalizeLanguageEntry = (raw: unknown): string => {
  if (typeof raw === "string") return raw;
  if (raw && typeof raw === "object" && "key" in raw) {
    const key = (raw as { key?: string }).key;
    if (typeof key === "string") {
      const seg = key.split("/").filter(Boolean).pop();
      return seg ?? key;
    }
  }
  return "";
};

const normalizePublishers = (pub: unknown): string[] => {
  if (!Array.isArray(pub)) return [];
  return pub.map((p) => (typeof p === "string" ? p : String(p)));
};

/** Picks an edition OLID for a work; prefers publish year matching `preferredYear`. */
export const getPreferredEditionId = async (
  workId: string,
  preferredYear?: string | null,
): Promise<string | null> => {
  const response = await fetch(
    ensureHttpsUrl(
      `https://openlibrary.org/works/${workId}/editions.json?limit=100`,
    ),
    { cache: "no-store" },
  );
  if (!response.ok) return null;
  const json = (await response.json()) as {
    entries?: Array<{ key?: string; publish_date?: string }>;
  };
  const entries = json?.entries;
  if (!Array.isArray(entries) || entries.length === 0) return null;

  const getEditionId = (e: { key?: string }): string | null => {
    const k = e.key;
    if (typeof k !== "string" || !k.includes("/books/")) return null;
    const id = k.split("/").filter(Boolean).pop();
    return id?.startsWith("OL") ? id : null;
  };

  const parseYear = (publishDate?: string): number | null => {
    if (!publishDate || typeof publishDate !== "string") return null;
    const m = publishDate.match(/\b(1[0-9]{3}|20[0-9]{2})\b/);
    if (m) return parseInt(m[0], 10);
    const y = parseInt(publishDate.slice(0, 4), 10);
    return Number.isFinite(y) ? y : null;
  };

  const targetYear = preferredYear?.trim()
    ? parseInt(preferredYear.trim(), 10)
    : NaN;

  if (Number.isFinite(targetYear)) {
    for (const e of entries) {
      const id = getEditionId(e);
      if (!id) continue;
      const y = parseYear(e.publish_date);
      if (y === targetYear) return id;
    }
  }

  for (const e of entries) {
    const id = getEditionId(e);
    if (id) return id;
  }
  return null;
};

export const getBookDetails = async (edition: string): Promise<BookFromList> => {
  const response = await fetch(
    ensureHttpsUrl(`https://openlibrary.org/books/${edition}.json`),
    {
      cache: "no-store",
    },
  );
  if (!response.ok)
    throw new Error(
      `Failed to fetch book details for key "${edition}" - ${response.status}`,
    );
  const json = (await response.json()) as Record<string, unknown>;
  const languagesRaw = json.languages;
  const languages = Array.isArray(languagesRaw)
    ? languagesRaw.map(normalizeLanguageEntry).filter(Boolean)
    : [];

  return {
    ...(json as unknown as BookFromList),
    languages,
    publishers: normalizePublishers(json.publishers),
    number_of_pages:
      typeof json.number_of_pages === "number" ? json.number_of_pages : 0,
  };
};