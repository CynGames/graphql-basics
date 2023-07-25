import AuthorRepository from '../../../repository/author';

import {AuthorDocument} from 'db/models/author';

interface Context {
    authorRepository: AuthorRepository;
}

interface Args {
    name: string;
    input: AuthorDocument;
}

export default {
    Query: {
        authors: async (parent: unknown, args: unknown, {authorRepository}: Context): Promise<AuthorDocument[]> => {
            return authorRepository.getAuthors();
        },
        author: async (parent: unknown, {name}: Args, {authorRepository}: Context): Promise<AuthorDocument | null> => {
            return authorRepository.getAuthorByName(name);
        },
    },
    Mutation: {
        createAuthor: async (root: unknown, {input}: Args, {authorRepository}: Context): Promise<AuthorDocument> => {
            return await authorRepository.insertAuthor(input);
        },
        updateAuthor: async (root: unknown, {input}: Args, {authorRepository}: Context): Promise<AuthorDocument | null> => {
            return await authorRepository.updateAuthor(input);
        },
        deleteAuthor: async (root: unknown, {name}: Args, {authorRepository}: Context): Promise<string> => {
            return authorRepository.deleteAuthor(name);
        },
    },
};
