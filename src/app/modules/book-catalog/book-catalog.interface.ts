export interface BookCatalogModuleProps {
  locale: string;
  subject: string;
}

export interface ItemsPageProps {
  searchParams?: Promise<{ page: number }>;
}
