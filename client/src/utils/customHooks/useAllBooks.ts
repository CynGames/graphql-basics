import { useLazyQuery } from '@apollo/client';
import { GET_ALL_BOOKS_WITH_PARAMS } from '../../queries';
import { useState, useEffect } from 'react';
import {Author} from "./useAuthors";

interface Book {
    title: string;
    author: Author | null;
    published: number;
}

export const useAllBooks = () => {
    const [selectedGenre, setSelectedGenre] = useState('allGenres');
    const [getBooks, result] = useLazyQuery(GET_ALL_BOOKS_WITH_PARAMS);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        if (selectedGenre === 'allGenres') {
            getBooks()
                .catch(error => console.error(error));
        } else {
            getBooks({ variables: { genres: [selectedGenre] } })
                .catch(error => console.error(error));
        }
    }, [getBooks, selectedGenre]);

    useEffect(() => {
        if (result.data) {
            setBooks(result.data.books);
        }
    }, [result]);

    return { books, setSelectedGenre, loading: result.loading };
};
