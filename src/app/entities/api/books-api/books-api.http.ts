import { envClient } from "../../../../config/env";
import { ensureHttpsUrl } from "../../../shared/lib/ensure-https";

const apiBase = envClient.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");

export function buildSubjectWorksPath(
  subject: string,
  limit: number,
  offset: number,
): string {
  const q = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  }).toString();
  const encoded = encodeURIComponent(subject);
  if (apiBase.includes("openlibrary.org")) {
    return `/subjects/${encoded}.json?${q}`;
  }
  return `/books/subjects/${encoded}?${q}`;
}

export const olRevalidate: RequestInit = { next: { revalidate: 3600 } };

export const fetchFromApi = (
  path: string,
  init?: RequestInit,
): Promise<Response> => {
  const p = path.startsWith("/") ? path : `/${path}`;

  return fetch(ensureHttpsUrl(`${apiBase}${p}`), init);
};

export const fetchJson = async <T>(
  path: string,
  init?: RequestInit,
): Promise<T> => {
  try {
    const res = await fetchFromApi(path, init);

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`API error ${res.status}: ${path} — ${body}`);
    }

    return res.json() as Promise<T>;
  } catch (error) {
    console.error(`[API] Request failed: ${path}`, error);
    throw error;
  }
};

export const fetchJsonOrNull = async <T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> => {
  try {
    const res = await fetchFromApi(path, init);

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`API error ${res.status}: ${path} — ${body}`);
    }

    return (await res.json()) as T;
  } catch {
    return null;
  }
};
