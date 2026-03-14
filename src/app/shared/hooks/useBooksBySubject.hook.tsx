"use client";

import { useQuery } from "@tanstack/react-query";
import { getBooksBySubject } from "../../entities/api";

import { BookFromList } from "../interfaces/books.interface";

export const useBooksBySubject = (subject: string) => {
    const { data, isLoading, error } = useQuery<BookFromList[]>({
        queryKey: ['booksBySubject', subject],
        queryFn: () => getBooksBySubject(subject),  
    });

    return { data, isLoading, error };
}