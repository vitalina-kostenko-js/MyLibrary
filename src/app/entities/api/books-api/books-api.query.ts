//query key
export const bookKeys = {
  all: ["books"] as const,
  bySubject: (subject: string, page: number, pageSize: number) =>
    ["books", "subject", subject, page, pageSize] as const,
  detail: (id: string) => ["books", "detail", id] as const,
  work: (key: string) => ["books", "work", key] as const,
};
