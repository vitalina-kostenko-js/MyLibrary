//query key
export const searchKeys = {
  all: ["booksSearch"] as const,
  byQuery: (query: string) => [...searchKeys.all, query] as const,
};
