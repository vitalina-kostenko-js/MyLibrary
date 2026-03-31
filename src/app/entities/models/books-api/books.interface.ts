import { Author } from "../../../shared/interfaces";

export interface OpenLibraryWork {
  key: string;
  title: string;
  cover_id?: number;
  first_publish_year?: number;
  authors?: Author[];
  subject?: string[];
}

export interface EditionEntry {
  key?: string;
  publish_date?: string;
}

export interface OpenLibraryEdition {
  key: string;
  title: string;
  authors?: { key?: string }[];
  subjects?: string[];
  languages?: unknown[];
  publishers?: string[];
  number_of_pages?: number;
  covers?: number[];
}
