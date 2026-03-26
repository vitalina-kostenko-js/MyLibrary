import {
  BookCardData,
  BookDetails,
  BookFromList,
  BookFromWork,
} from "../../shared/interfaces";

export interface IItemPageData {
  book: BookFromWork;
  coverImageUrl: string;
  cleanDescription: string;
  cardData: BookCardData;
  details: BookDetails;
  editionDetails: BookFromList;
}

export interface IItemPageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams?: Promise<{ year?: string }>;
}

export interface OpenLibraryExcerptEntry {
  value?: string;
  excerpt?: string;
  comment?: string;
  author?: { key?: string };
}