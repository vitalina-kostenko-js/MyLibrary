export const getPageFromSearchParams = (
  sp: Record<string, string | string[] | undefined> | undefined,
): number => {
  const pageParam = sp?.page;

  if (pageParam === undefined) {
    return 1;
  }

  const raw = Array.isArray(pageParam) ? pageParam[0] : pageParam;

  return Math.max(1, parseInt(String(raw), 10) || 1);
};
