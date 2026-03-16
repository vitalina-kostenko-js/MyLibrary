import { useState } from "react";

export const usePagination = (totalItems: number, itemsPerPage: number) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return {
    page,
    totalPages,
    nextPage,
    prevPage,
    setPage,
  };
};