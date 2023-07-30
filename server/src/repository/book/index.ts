import BookModel, {BookDocument} from '../../db/models/book';
import {BookQuery, CreateBookInput, UpdateBookInput} from "dto";

export default class BookRepository {
    async getBooks(query: BookQuery): Promise<BookDocument[] | null> {
        return BookModel.find(query);
    }

    async getBookByTitle(title: string): Promise<BookDocument | null> {
        return BookModel.findOne({title});
    }

    async createBook(input: CreateBookInput): Promise<BookDocument | null> {
        return new BookModel(input).save();
    }

    async updateBook(title: string, input: UpdateBookInput): Promise<BookDocument | null> {
        return BookModel.findOneAndUpdate({title}, input, {new: true});
    }

    async deleteBook(title: string): Promise<BookDocument | null> {
        return BookModel.findOneAndDelete({title});
    }
}
