"use client";

import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useId } from "react";
import { useSearch } from "../../shared/hooks/useSearch.hook";

const SearchBar = () => {
  const router = useRouter();
  const id = useId();
  const { search, setSearch } = useSearch();
  const params = useParams();
  const locale = (params.locale as string) ?? "en";

  const handleSearch = () => {
    router.push(`/${locale}/items/search?query=${encodeURIComponent(search)}`);
    setSearch("");
  };

  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="relative">
        <div className="text-muted-foreground absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
          <button className="cursor-pointer" onClick={handleSearch}>
            <SearchIcon className="size-4" />
          </button>
        </div>
        <Input
          id={id}
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="peer px-9 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
