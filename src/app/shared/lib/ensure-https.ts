/**
 * Replaces `http://` with `https://` so requests from an HTTPS page are not blocked (mixed content).
 */
export function ensureHttpsUrl(url: string): string {
  if (!url || typeof url !== "string") return url;
  return url.replace(/^http:\/\//i, "https://");
}

/**
 * Builds a fetch URL for Open Library JSON: supports path keys (`/authors/OL…`) or full http(s) URLs.
 */
export function openLibraryJsonUrl(keyOrUrl: string): string {
  const k = keyOrUrl.trim();
  if (!k) return k;
  if (/^https?:\/\//i.test(k)) {
    const u = ensureHttpsUrl(k);
    return u.endsWith(".json") ? u : `${u}.json`;
  }
  const path = k.startsWith("/") ? k : `/${k}`;
  return `https://openlibrary.org${path}.json`;
}
