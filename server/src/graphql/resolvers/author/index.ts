import {AuthorDocument} from '../../../db/models/author';
import AuthorRepository from '../../../repository/author';

interface Context {
    authorRepository: AuthorRepository;
}

interface Args {
    id: string;
    input: AuthorDocument;
}

export default {
    Query: {
        authors: async (parent: unknown, args: unknown, { authorRepository }: Context): Promise<AuthorDocument[]> => {
            return authorRepository.getAuthors();
        },
        author: async (parent: unknown, { id }: Args, { authorRepository }: Context): Promise<AuthorDocument | null> => {
            return authorRepository.getAuthor(id);
        },
    },
    Mutation: {
        createAuthor: async (root: unknown, { input }: Args, { authorRepository }: Context): Promise<AuthorDocument> => {
            return await authorRepository.insertAuthor(input);
        },
        updateAuthor: async (root: unknown, { input }: Args, { authorRepository }: Context): Promise<AuthorDocument | null> => {
            return await authorRepository.updateAuthor(input);
        },
        deleteAuthor: async (root: unknown, { id }: Args, { authorRepository }: Context): Promise<string> => {
            return authorRepository.deleteAuthor(id);
        },
    },
};
