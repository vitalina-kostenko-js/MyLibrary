import { useQuery } from "@tanstack/react-query";
import { getBookDetails } from "../../entities/api";
import { BookFromWork } from "../interfaces";

export const useBookDetails = (key: string) => {
    const { data, isLoading, error } = useQuery<BookFromWork>({
        queryKey: ['bookDetails', key],
        queryFn: () => getBookDetails(key),
    });
    return { data, isLoading, error };
}