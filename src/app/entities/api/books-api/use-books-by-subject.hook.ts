"use client";

import { useQuery } from "@tanstack/react-query";
import { getBooksBySubject } from "./books.api";

import { BookFromList } from "../../../shared/interfaces";

export const useBooksBySubject = (subject: string) => {
  const { data, isLoading, error } = useQuery<BookFromList[]>({
    queryKey: ["booksBySubject", subject],
    queryFn: () => getBooksBySubject(subject),
    enabled: !!subject,
  });

  return { data, isLoading, error };
};
