import BookModel, {BookDocument} from '../../db/models/book';

export default class BookRepository {
    async getBooks(): Promise<BookDocument[]> {
        return BookModel.find({});
    }

    async getBook(title: string): Promise<BookDocument | null> {
        return BookModel.findOne({title});
    }

    async createBook(bookData: BookDocument): Promise<BookDocument> {
        const book = new BookModel(bookData);
        return await book.save();
    }

    async updateBook(title: string, bookData: BookDocument): Promise<BookDocument | null> {
        return BookModel.findOneAndUpdate({title}, bookData, {new: true});
    }

    async deleteBook(title: string): Promise<BookDocument | null> {
        return BookModel.findOneAndDelete({title});
    }
}
