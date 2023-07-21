import {BookDocument} from '../../../db/models/book';
import BookRepository from '../../../repository/book';

interface Context {
    bookRepository: BookRepository;
}

interface Args {
    id: string;
    input: BookDocument;
}

export default {
    Query: {
        books: async (parent: unknown, args: unknown, { bookRepository }: Context): Promise<BookDocument[]> => {
            return bookRepository.getBooks();
        },
        book: async (parent: unknown, { id }: Args, { bookRepository }: Context): Promise<BookDocument | null> => {
            return bookRepository.getBook(id);
        },
    },
    Mutation: {
        createBook: async (root: unknown, { input }: Args, { bookRepository }: Context): Promise<BookDocument> => {
            return await bookRepository.insertBook(input);
        },
        updateBook: async (root: unknown, { input }: Args, { bookRepository }: Context): Promise<BookDocument | null> => {
            return await bookRepository.updateBook(input);
        },
        deleteBook: async (root: unknown, { id }: Args, { bookRepository }: Context): Promise<string> => {
            return bookRepository.deleteBook(id);
        },
    },
};
