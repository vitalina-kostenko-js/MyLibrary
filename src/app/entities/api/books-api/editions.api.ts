import { IEditionEntry, parseYear } from "../../models/books-api";
import { fetchJson } from "./http.api";

const DEFAULT_WORKS_LIMIT = 100;

const getEditionId = (e: IEditionEntry): string | null => {
  const k = e.key;

  if (typeof k !== "string" || !k.includes("/books/")) {
    return null;
  }

  const id = k.split("/").filter(Boolean).pop();

  return id?.startsWith("OL") ? id : null;
};

export const getPreferredEditionId = async (
  workId: string,
  preferredYear?: string | null,
  limit: number = DEFAULT_WORKS_LIMIT,
): Promise<string | null> => {
  const json = await fetchJson<{ entries?: IEditionEntry[] }>(
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

      if (!id) {
        continue;
      }

      if (parseYear(e.publish_date) === targetYear) {
        return id;
      }
    }
  }

  return entries.map(getEditionId).find(Boolean) ?? null;
};
