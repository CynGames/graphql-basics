import { useMutation } from '@apollo/client';
import { CREATE_BOOK, GET_ALL_BOOKS } from '../../queries';
import { useNotification } from './useNotification';

interface Book {
    title: string;
    author: string;
    published: number;
    genres: string[];
}

interface GetAllBooksData {
    books: Book[];
}

interface BookInput {
    title: string;
    author: string;
    published: number;
    genres: string[];
}

export const useBooks = () => {
    const { notify } = useNotification();

    const [createBook] = useMutation(CREATE_BOOK, {
        update: (cache, { data: { createBook } }) => {
            // Use a type assertion to tell TypeScript what the returned data looks like
            const data = cache.readQuery<GetAllBooksData>({ query: GET_ALL_BOOKS });

            // Ensure that data and data.books are defined before proceeding
            if (data && data.books) {
                cache.writeQuery({
                    query: GET_ALL_BOOKS,
                    data: { books: data.books.concat([createBook]) },
                });
            }
        },
        onError: (error) => {
            notify(error.graphQLErrors[0].message);
        },
    });

    const addBook = async (book: BookInput) => {
        await createBook({variables: {input: book}});
    };

    return { addBook };
};
