import BookRepository from "../../repository/book";
import {BookDocument} from "db/models/book";
import {AllBooksQueryData, CreateBookInput, UpdateBookInput} from "dto";

class BookService {
    bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async getBooks({title, genres}: AllBooksQueryData): Promise<BookDocument[] | null> {
        let query: any = {};

        if (title) {
            query.title = title;
        }

        if (genres) {
            query.genres = { $all: genres }
        }

        return this.bookRepository.getBooks(query);
    }

    async getBookByTitle(title: string): Promise<BookDocument | null> {
        return this.bookRepository.getBookByTitle(title);
    }

    async createBook(input: CreateBookInput): Promise<BookDocument | null> {
        return this.bookRepository.createBook(input);
    }

    async updateBook(title: string, input: UpdateBookInput): Promise<BookDocument | null> {
        return this.bookRepository.updateBook(title, input);
    }

    async deleteBook(title: string): Promise<BookDocument | null> {
        return this.bookRepository.deleteBook(title);
    }
}

export default BookService;
