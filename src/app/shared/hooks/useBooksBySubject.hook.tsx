"use client";

import { useQuery } from "@tanstack/react-query";
import { getBooksBySubject } from "../../entities/api";

import { Book } from "../interfaces/books.interface";

export const useBooksBySubject = (subject: string) => {
    const { data, isLoading, error } = useQuery<Book[]>({
        queryKey: ['booksBySubject', subject],
        queryFn: () => getBooksBySubject(subject),  
    });

    return { data, isLoading, error };
}