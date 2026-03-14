import { useQuery } from "@tanstack/react-query";
import { getBookDetails } from "../../entities/api";
import { Book } from "../interfaces";

export const useBookDetails = (key: string) => {
    const { data, isLoading, error } = useQuery<Book>({
        queryKey: ['bookDetails', key],
        queryFn: () => getBookDetails(key),
    });
    return { data, isLoading, error };
}