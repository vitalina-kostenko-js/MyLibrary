// --- Base & API response types ---

export interface Author {
  name: string;
  key: string;
}

export interface BookBase {
  key: string;
  title: string;
  authors: Author[];
  subjects: string[];
}

export interface BookFromList extends BookBase {
  cover_id?: number;
  first_publish_year?: number;
  languages?: string[];
  number_of_pages?: number;
  publishers?: string[];
}

/** Open Library work JSON `excerpts` entries */
export interface WorkExcerptEntry {
  value?: string;
  excerpt?: string;
  comment?: string;
  author?: { key?: string };
}

export interface BookFromWork extends BookBase {
  cover_id?: number;
  covers?: number[];
  first_publish_year?: number;
  first_publish_date?: string;
  description?: string | { type?: string; value?: string };
  url?: string;
  excerpts?: WorkExcerptEntry[];
}

export type Book = BookFromList | BookFromWork;

// --- UI / view types ---

export interface BookCardData {
  title: string;
  author: string;
  subjects: string[];
  first_publish_year: number;
  first_publish_date?: string;
}

export interface BookDetails {
  key: string;
  author: string;
  description: string;
  url: string;
  publish_date: string;
}

export interface BookExcerpts {
  excerpt: string;
  comment: string;
  author: string;
}

export interface ReadingStatistics {
  currently_reading_count: number;
  want_to_read_count: number;
}