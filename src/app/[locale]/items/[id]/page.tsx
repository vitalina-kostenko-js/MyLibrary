import { notFound } from "next/navigation";
import { getBookDetails } from "../../../entities/api/books-api";
import { getAuthorName } from "../../../widgets/books-list";

interface ItemPageProps {
  params: Promise<{ locale: string; id: string }>;
}

const ItemPage = async ({ params }: ItemPageProps) => {
  const { id } = await params;
  const authorName = await getAuthorName(id);
  let book;

  try {
    book = await getBookDetails(id);
  } catch (error) {
    console.error(error);
    return notFound();
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{authorName}</p>
    </div>
  );
};

export default ItemPage;
