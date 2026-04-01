"use client";

import { bookKeys, getBooksBySubject } from "@/app/entities/api/books-api";
import { useQuery } from "@tanstack/react-query";

//hook
export const useBooksBySubject = (subject: string) => {
  return useQuery({
    queryKey: bookKeys.bySubject(subject),
    queryFn: () => getBooksBySubject(subject),
    enabled: !!subject ,
    staleTime: 5 * 60 * 1000,
  });
};
