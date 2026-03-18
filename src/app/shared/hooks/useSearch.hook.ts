"use client";

import { useSearchStore } from "../store/search.store";
import { useSearchParams } from "next/navigation";

export const useSearch = () => {
  const searchParams = useSearchParams(); 
  const urlQuery = searchParams.get('query') || '';
  const urlPage = Number(searchParams.get('page') || '1');

  return {
      search: useSearchStore((state) => state.search),
      setSearch: useSearchStore((state) => state.setSearch),
      query: urlQuery,
      page: urlPage,
    };
};