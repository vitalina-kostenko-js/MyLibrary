import { Book } from "../../../shared/interfaces";

export const getBooksBySubject = async (subject: string): Promise<Book[]> => {
  const response = await fetch(
    `https://openlibrary.org/subjects/${subject}.json`
  );
  if (!response.ok)
    throw new Error(
      `Failed to fetch books for subject "${subject}" - ${response.status}`
    );
  const json = await response.json();
  const works = json?.works;
  if (!Array.isArray(works)) return [];

  const subjectLower = subject.toLowerCase();
  return works.map(
    (w: {
      key: string;
      title: string;
      cover_id?: number;
      first_publish_year?: number;
      authors?: { name: string; key: string }[];
      subject?: string[];
    }) => {
      const raw = Array.isArray(w.subject) ? w.subject : [];
      const subjects = raw.filter((s) => s.toLowerCase() !== subjectLower);
      return {
        key: w.key,
        title: w.title,
        cover_id: w.cover_id,
        first_publish_year: w.first_publish_year,
        authors: Array.isArray(w.authors) ? w.authors : [],
        subjects,
      };
    }
  );
};

export const getBookDetails = async (key: string): Promise<Book> => {
  const response = await fetch(
    `https://openlibrary.org/works/${key}.json`
  );
  if (!response.ok)
    throw new Error(
      `Failed to fetch book details for key "${key}" - ${response.status}`
    );
  const json = await response.json();
  return json;
};