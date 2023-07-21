import BookModel, {BookDocument} from '../../db/models/book';

export default class BookRepository {
    async getBooks(): Promise<BookDocument[]> {
        return BookModel.find({});
    }

    async getBook(id: string): Promise<BookDocument | null> {
        return BookModel.findById(id);
    }

    async insertBook(bookData: BookDocument): Promise<BookDocument> {
        const author = new BookModel(bookData);
        return await author.save();
    }

    async updateBook(bookData: BookDocument): Promise<BookDocument | null> {
        return BookModel.findByIdAndUpdate(bookData._id, bookData, {new: true});
    }

    async deleteBook(id: string): Promise<string> {
        await BookModel.findByIdAndDelete(id);
        return id;
    }
}
