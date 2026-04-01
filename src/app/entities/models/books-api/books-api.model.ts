export const parseYear = (publishDate?: string): number | null => {
  if (!publishDate) {
    return null;
  }

  const m = publishDate.match(/\b(1[0-9]{3}|20[0-9]{2})\b/);
  
  return m ? parseInt(m[0], 10) : null;
};

export const normalizePublishers = (pub: unknown): string[] => {
  return Array.isArray(pub) ? pub.map(String) : [];
};
