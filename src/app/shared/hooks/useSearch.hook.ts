"use client";

import { useSearchParams } from "next/navigation";
import { useSearchStore } from "../store/search/search.store";

export const useSearch = () => {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("query") || "";
  const urlPage = Number(searchParams.get("page") || "1");

  return {
    search: useSearchStore((state) => state.search),
    setSearch: useSearchStore((state) => state.setSearch),
    query: urlQuery,
    page: urlPage,
  };
};
