"use client";

import type { BookFromList } from "@/app/shared/interfaces";
import { useQuery } from "@tanstack/react-query";
import { searchKeys } from "../../entities/api/search";
import { searchBooksAsList } from "../../entities/api/search";

//interface
interface IProps {
  query: string;
}

//hook
export const useBooksSearch = (props: IProps) => {
  const { query } = props;

  return useQuery<BookFromList[]>({
    queryKey: searchKeys.byQuery(query),
    queryFn: ({ signal }) => searchBooksAsList(query, signal),
    enabled: query.trim().length > 0,
  });
};
