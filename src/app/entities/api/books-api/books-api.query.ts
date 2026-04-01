//query key
export const bookKeys = {
  all: ["books"] as const,
  bySubject: (subject: string) =>
    ["books", "subject", subject] as const,
  detail: (id: string) => ["books", "detail", id] as const,
  work: (key: string) => ["books", "work", key] as const,
};
