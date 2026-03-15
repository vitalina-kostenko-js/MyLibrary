export const itemKeys = {
    all: ['item'] as const,
    detail: (id: string) => [...itemKeys.all, id] as const,
  };