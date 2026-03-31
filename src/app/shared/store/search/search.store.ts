import { create } from "zustand";
import { SearchState } from "./search.interface";

//search store
export const useSearchStore = create<SearchState>()((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));
