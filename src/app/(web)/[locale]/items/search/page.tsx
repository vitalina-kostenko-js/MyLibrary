'use client';
import { useBooksBySubject } from "@/app/entities/api/books-api";
import { useSearch } from "@/app/shared/hooks";
import { BooksListComponent } from "@/app/widgets/books-list";

const SearchPage = () => {
  const { query, page } = useSearch();
  const { data, isLoading, error } = useBooksBySubject(query);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <BooksListComponent dataBooks={data} subject={query} page={page} />
    </div>
  );
}

export default SearchPage;
