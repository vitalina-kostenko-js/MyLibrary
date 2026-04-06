import { fetchJsonOrNull } from "./http.api";

type TWorkAuthorRow = { author?: { key?: string }; key?: string };

const authorKeyToJsonPath = (raw: string): string | null => {
  const k = raw.trim().replace(/^\/+/, "");
  if (!k) {
    return null;
  }

  if (k.startsWith("people/") || k.startsWith("authors/")) {
    return `/${k}.json`;
  }

  return `/authors/${k}.json`;
};

const extractAuthorKeyString = (
  authorKeyOrList: string | TWorkAuthorRow[],
): string | undefined => {
  if (typeof authorKeyOrList === "string") {
    return authorKeyOrList;
  }

  if (Array.isArray(authorKeyOrList) && authorKeyOrList.length > 0) {
    const first = authorKeyOrList[0];

    return first?.author?.key ?? first?.key;
  }

  return "";
};

export const getAuthorName = async (
  authorKeyOrList: string | TWorkAuthorRow[],
): Promise<string> => {
  const rawKey = extractAuthorKeyString(authorKeyOrList);
  const path = rawKey ? authorKeyToJsonPath(rawKey) : null;

  if (!path) {
    return "";
  }

  const doc = await fetchJsonOrNull<{ name?: string; displayname?: string }>(
    path,
    { next: { revalidate: 3600 } },
  );

  return doc?.name ?? doc?.displayname ?? "";
};
