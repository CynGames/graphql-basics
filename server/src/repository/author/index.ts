import AuthorModel, {AuthorDocument} from '../../db/models/author';

export default class AuthorRepository {
    async getAuthors(): Promise<AuthorDocument[]> {
        return AuthorModel.find({});
    }

    async getAuthorByName(name: string): Promise<AuthorDocument | null> {
        return AuthorModel.findOne({ name: name });
    }

    async insertAuthor(authorData: { name: string, dateOfBirth?: number }): Promise<AuthorDocument> {
        const author = new AuthorModel(authorData);
        return await author.save();
    }

    async updateAuthor(authorData: { _id: string, name: string, dateOfBirth?: number }): Promise<AuthorDocument | null> {
        return AuthorModel.findByIdAndUpdate(authorData._id, authorData, {new: true});
    }

    async deleteAuthor(id: string): Promise<string> {
        await AuthorModel.findByIdAndDelete(id);
        return id;
    }
}
