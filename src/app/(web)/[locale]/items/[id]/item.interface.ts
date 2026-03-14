import {
  BookCardData,
  BookDetails,
  BookFromWork,
} from "../../../../shared/interfaces";

export interface ItemPageData {
  book: BookFromWork;
  coverImageUrl: string;
  cleanDescription: string;
  cardData: BookCardData;
  details: BookDetails;
}
