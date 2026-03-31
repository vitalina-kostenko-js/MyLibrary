export function ensureHttpsUrl(url: string): string {
  if (!url || typeof url !== "string") {
    return url;
  }

  return url.replace(/^http:\/\//i, "https://");
}

export function openLibraryJsonUrl(keyOrUrl: string): string {
  const k = keyOrUrl.trim();

  if (!k) {
    return k;
  }

  if (/^https?:\/\//i.test(k)) {
    const u = ensureHttpsUrl(k);

    return u.endsWith(".json") ? u : `${u}.json`;
  }
  const path = k.startsWith("/") ? k : `/${k}`;

  return `https://openlibrary.org${path}.json`;
}
