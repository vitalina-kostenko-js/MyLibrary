import { envClient } from "../../../../config/env";
import { ensureHttpsUrl } from "../../../shared/lib/ensure-https";

const apiBase = envClient.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");

export const olRevalidate: RequestInit = { next: { revalidate: 3600 } };

export const fetchFromApi = (path: string, init?: RequestInit): Promise<Response> => {
  const p = path.startsWith("/") ? path : `/${path}`;

  return fetch(ensureHttpsUrl(`${apiBase}${p}`), init);
};

export const fetchJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
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

export const fetchJsonOrNull = async <T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> => {
  try {
    const res = await fetchFromApi(path, init);

    if (!res.ok) return null;

    return (await res.json()) as T;
  } catch {
    return null;
  }
};
