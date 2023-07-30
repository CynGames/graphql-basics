import {BookDocument} from 'db/models/book';
import {Context} from "../../../types";

import handleErrors from "../../../utils";
import {AllBooksQueryData, CreateBookInput, UpdateBookInput} from "dto";

export default {
    Query: {
        books: handleErrors(async (root: unknown, {title, genres}: AllBooksQueryData, {bookService}: Context): Promise<BookDocument[] | null> => {
            return await bookService.getBooks({title, genres});
        }),
        book: handleErrors(async (root: unknown, {title}: {title: string}, {bookService}: Context): Promise<BookDocument | null> => {
            return await bookService.getBookByTitle(title);
        }),
    },
    Mutation: {
        createBook: handleErrors(async (root: unknown, {input}: {input: CreateBookInput}, {bookService, user}: Context): Promise<BookDocument | null> => {
            if (!user) {
                throw new Error('Unauthorized: Must be logged in to perform this action.');
            }

            return await bookService.createBook(input);
        }),
        updateBook: handleErrors(async (root: unknown, {title, input}: {title: string, input: UpdateBookInput}, {bookService, user}: Context): Promise<BookDocument | null> => {
            if (!user) {
                throw new Error('Unauthorized: Must be logged in to perform this action.');
            }

            return await bookService.updateBook(title, input);
        }),
        deleteBook: handleErrors(async (root: unknown, {title}: {title: string}, {bookService, user}: Context): Promise<BookDocument | null> => {
            if (!user) {
                throw new Error('Unauthorized: Must be logged in to perform this action.');
            }

            return await bookService.deleteBook(title);
        }),
    },
    Book: {
        author: async (book: BookDocument, args: unknown, {authorService}: Context) => {

            if (book.author) {
                return await authorService.getAuthorByName(book.author);
            } else {
                return null;
            }
        }
    }
};
