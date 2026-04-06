// --- Base & API response types ---

export interface IAuthor {
  name: string;
  key: string;
}

export interface IBookBase {
  key: string;
  title: string;
  authors: IAuthor[];
  subjects: string[];
}

export interface IBookFromList extends IBookBase {
  cover_id?: number;
  first_publish_year?: number;
  languages?: string[];
  number_of_pages?: number;
  publishers?: string[];
}

export interface IWorkExcerptEntry {
  value?: string;
  excerpt?: string;
  comment?: string;
  author?: { key?: string };
}

export interface IBookFromWork extends IBookBase {
  cover_id?: number;
  covers?: number[];
  first_publish_year?: number;
  first_publish_date?: string;
  description?: string | { type?: string; value?: string };
  url?: string;
  excerpts?: IWorkExcerptEntry[];
}

export type TBook = IBookFromList | IBookFromWork;

// --- UI / view types ---

export interface IBookCardData {
  title: string;
  author: string;
  subjects: string[];
  first_publish_year: number;
  first_publish_date?: string;
}

export interface IBookDetails {
  key: string;
  author: string;
  description: string;
  url: string;
  publish_date: string;
}

export interface IBookExcerpts {
  excerpt: string;
  comment: string;
  author: string;
}

// --- OpenLibrary API response types ---

export interface IOpenLibraryWork {
  key: string;
  title: string;
  cover_id?: number;
  first_publish_year?: number;
  authors?: IAuthor[];
  subject?: string[];
}

export interface IEditionEntry {
  key?: string;
  publish_date?: string;
}

export interface IOpenLibraryEdition {
  key: string;
  title: string;
  authors?: { key?: string }[];
  subjects?: string[];
  languages?: unknown[];
  publishers?: string[];
  number_of_pages?: number;
  covers?: number[];
}
