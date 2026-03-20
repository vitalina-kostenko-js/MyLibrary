import {
  BookCardData,
  BookDetails,
  BookFromList,
  BookFromWork,
} from "../../shared/interfaces";

export interface ItemPageData {
  book: BookFromWork;
  coverImageUrl: string;
  cleanDescription: string;
  cardData: BookCardData;
  details: BookDetails;
  editionDetails: BookFromList;
}

export interface ItemPageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams?: Promise<{ year?: string }>;
}