import type { BookFromList } from "@/app/shared/interfaces";
import { envClient } from "../../../../config/env";

//interface
interface IProps  {
  key?: string;
  title?: string;
  author_name?: string[];
  author_key?: string[];
  first_publish_year?: number;
  cover_i?: number;
};

//limit
const DEFAULT_WORKS_LIMIT = 100;

//api link
const apiBase = envClient.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");

//search books
export const searchBooksAsList = async (
  query: string,
  signal?: AbortSignal,
): Promise<BookFromList[]> => {
  const q = query.trim();
  if (!q) return [];

  const url = `${apiBase}/search.json?q=${encodeURIComponent(q)}&limit=${DEFAULT_WORKS_LIMIT}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Failed to search books");
  }

  const json = (await response.json()) as { docs?: IProps[] };
  const docs = Array.isArray(json.docs) ? json.docs : [];

  return docs.map((d) => {
    const names = Array.isArray(d.author_name) ? d.author_name : [];
    const keys = Array.isArray(d.author_key) ? d.author_key : [];
    const authors = names.map((name, i) => ({
      name,
      key: keys[i] ?? "",
    }));

    return {
      key: d.key ?? "",
      title: d.title ?? "",
      authors,
      subjects: [],
      cover_id: d.cover_i,
      first_publish_year: d.first_publish_year,
    };
  });
}