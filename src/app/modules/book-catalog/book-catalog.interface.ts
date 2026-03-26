export interface IBookCatalogModuleProps {
  locale: string;
  subject: string;
}

export interface IItemsPageProps {
  searchParams?: Promise<{ page: number }>;
}
