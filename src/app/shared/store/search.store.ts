import { create } from "zustand";
import { SearchState } from "./search.interface";

export const useSearchStore = create<SearchState>()((set) => ({
    search: "",
    setSearch: (search) => set({ search }),
}));
