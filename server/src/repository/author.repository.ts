import {AuthorModel, AuthorDocument} from '../db/models';
import {CreateAuthorInput, UpdateAuthorInput} from "dto";

export class AuthorRepository {
    async getAuthors(): Promise<AuthorDocument[] | null> {
        return AuthorModel.find({});
    }

    async getAuthorByName(name: string): Promise<AuthorDocument | null> {
        return AuthorModel.findOne({name: name});
    }

    async createAuthor(input: CreateAuthorInput): Promise<AuthorDocument | null> {
        return new AuthorModel(input).save();
    }

    async updateAuthor(name: string, input: UpdateAuthorInput): Promise<AuthorDocument | null> {
        return AuthorModel.findOneAndUpdate({name}, input, {new: true});
    }

    async deleteAuthor(name: string): Promise<AuthorDocument | null> {
        return AuthorModel.findOneAndDelete({name});
    }
}
