import {
  IBookCardData,
  IBookDetails,
  IBookFromList,
  IBookFromWork,
} from "../../entities/models/books-api";

export interface IItemPageData {
  book: IBookFromWork;
  coverImageUrl: string;
  cleanDescription: string;
  cardData: IBookCardData;
  details: IBookDetails;
  editionDetails: IBookFromList;
}

export interface IItemPageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams?: Promise<{ year?: string }>;
}
