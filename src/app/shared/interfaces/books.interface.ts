export interface Book {
  key: string;
  title: string;
  cover_id?: number;
  first_publish_year?: number;
  authors: Author[];
  subjects: string[];
}

export interface BookCardData {
  title: string;
  author: string;
  subjects: string[];
  first_publish_year: number;
}

export interface BookDetails {
  key: string;
  description: string;
  url: string;
}

export interface BookExcerpts{
  excerpt: string;
  comment: string;
  author: string;
}

export interface Author {
  name: string;
  key: string;
}
