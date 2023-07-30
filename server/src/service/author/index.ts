import AuthorRepository from "../../repository/author";
import {AuthorDocument} from "../../db/models/author";
import {CreateAuthorInput, UpdateAuthorInput} from "dto";

class AuthorService {
    authorRepository: AuthorRepository;

    constructor(authorRepository: AuthorRepository) {
        this.authorRepository = authorRepository;
    }

    async getAuthors(): Promise<AuthorDocument[] | null> {
        return this.authorRepository.getAuthors();
    }

    async getAuthorByName(name: string): Promise<AuthorDocument | null> {
        return this.authorRepository.getAuthorByName(name);
    }

    async createAuthor(input: CreateAuthorInput): Promise<AuthorDocument | null> {
        return this.authorRepository.createAuthor(input);
    }

    async updateAuthor(name: string, input: UpdateAuthorInput): Promise<AuthorDocument | null> {
        return this.authorRepository.updateAuthor(name, input);
    }

    async deleteAuthor(name: string): Promise<AuthorDocument | null> {
        return this.authorRepository.deleteAuthor(name);
    }
}

export default AuthorService;
