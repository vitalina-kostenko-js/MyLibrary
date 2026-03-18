"use client";
import { useBooksBySubject, useSearch } from "../../../../shared/hooks";
import { BooksListComponent } from "../../../../widgets/books-list/books-list.component";
import { DashboardLayout } from "../../../../widgets/dashboard-layout/dashboard-layout.component";

export default function SearchPage() {
  const { search, query, page } = useSearch();
  const { data, isLoading, error } = useBooksBySubject(query);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <DashboardLayout>
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
        <BooksListComponent dataBooks={data} subject={query} page={page} />
      </div>
    </DashboardLayout>
  );
}
