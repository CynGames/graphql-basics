import BookRepository from '../../../repository/book';
import AuthorRepository from "../../../repository/author";

import {BookDocument} from 'db/models/book';

interface Context {
    bookRepository: BookRepository;
    authorRepository: AuthorRepository;
}

interface BookData {
    title: string;
    input: BookDocument;
}

export default {
    Query: {
        books: async (parent: unknown, args: unknown, {bookRepository}: Context): Promise<BookDocument[]> => {
            return bookRepository.getBooks();
        },
        book: async (parent: unknown, {title}: BookDocument, {bookRepository}: Context): Promise<BookDocument | null> => {
            return bookRepository.getBook(title);
        },
    },
    Mutation: {
        createBook: async (root: unknown, bookData: BookData, {bookRepository}: Context): Promise<BookDocument> => {
            return await bookRepository.createBook(bookData.input);
        },
        updateBook: async (root: unknown, bookData: BookData, {bookRepository}: Context): Promise<BookDocument | null> => {
            return await bookRepository.updateBook(bookData.title, bookData.input);
        },
        deleteBook: async (root: unknown, {title}: BookDocument, {bookRepository}: Context): Promise<BookDocument | null> => {
            return bookRepository.deleteBook(title);
        },
    },
    Book: {
        author: async (book: BookDocument, args: unknown, {authorRepository}: Context) => {

            if (book.author) {
                return authorRepository.getAuthorByName(book.author);
            } else {
                return null;
            }
        }
    }
};
