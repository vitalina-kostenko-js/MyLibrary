import Image from "next/image";
import { FC } from "react";
import { Link } from "../../../../pkg/locale";
import { IBookFromList } from "../../../entities/models/books-api";
import { getImageCover, mapListBookToCard } from "../../../shared/lib/books";
import { CardHorizontalComponent } from "../../card-horizontal";
import { PaginationComponent } from "../../pagination";

//interface
interface BooksListPresenterProps {
  books: IBookFromList[];
  totalItems: number;
  itemsPerPage: number;
  isLoading?: boolean;
  error?: Error | null;
  translations: {
    loading: string;
    errorPrefix: string;
  };
}

const getBookId = (key: string) => key.split("/").filter(Boolean).pop() ?? key;

//component
const BooksListPresenter: FC<BooksListPresenterProps> = ({
  books,
  totalItems,
  itemsPerPage,
  isLoading,
  error,
  translations,
}) => {
  if (isLoading) return <div>{translations.loading}</div>;
  if (error)
    return (
      <div>
        {translations.errorPrefix}: {error.message}
      </div>
    );

  return (
    <>
      <div className="py-2">
        <PaginationComponent
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.key} className="min-h-0" data-testid="item-card">
            <Link
              href={`/items/${getBookId(book.key)}?year=${book.first_publish_year ?? ""}`}
              className="block h-full"
            >
              <CardHorizontalComponent
                data={mapListBookToCard(book)}
                media={
                  <div className="relative w-[120px] h-[180px]">
                    <Image
                      src={getImageCover(book.cover_id ?? 0)}
                      alt={`${book.title} cover`}
                      fill
                      className="object-contain rounded p-2"
                    />
                  </div>
                }
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default BooksListPresenter;
