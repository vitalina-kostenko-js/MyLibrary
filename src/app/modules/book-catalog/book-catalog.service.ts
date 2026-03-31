import { getBooksBySubject } from "@/app/entities/api/books-api";

//interface
interface IProps {
  subject: string;
}

const loadBooksForCatalog = async (props: IProps) => {
  const { subject } = props;

  return getBooksBySubject(subject);
};

export default loadBooksForCatalog;
