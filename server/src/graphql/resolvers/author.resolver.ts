import {AuthorDocument} from '../../db/models';
import {Context} from "../../types";

import handleErrors from "../../utils/errorHandler.hof";
import {CreateAuthorInput, UpdateAuthorInput} from "dto";

export default {
    Query: {
        authors: handleErrors(async (root: unknown, args: unknown, {authorService}: Context): Promise<AuthorDocument[] | null> => {
            return authorService.getAuthors();
        }),
        author: handleErrors(async (root: unknown, {name}: {name: string}, {authorService}: Context): Promise<AuthorDocument | null> => {
            return authorService.getAuthorByName(name);
        }),
    },
    Mutation: {
        createAuthor: handleErrors(async (root: unknown, {input}: {input: CreateAuthorInput}, {authorService, user}: Context): Promise<AuthorDocument | null> => {
            if (!user) {
                throw new Error('Unauthorized: Must be logged in to perform this action.');
            }

            return await authorService.createAuthor(input);
        }),
        updateAuthor: handleErrors(async (root: unknown, {name, input}: {name: string, input: UpdateAuthorInput }, {authorService, user}: Context): Promise<AuthorDocument | null> => {
            if (!user) {
                throw new Error('Unauthorized: Must be logged in to perform this action.');
            }

            return await authorService.updateAuthor(name, input);
        }),
        deleteAuthor: handleErrors(async (root: unknown, {name}: {name: string}, {authorService, user}: Context): Promise<AuthorDocument | null> => {
            if (!user) {
                throw new Error('Unauthorized: Must be logged in to perform this action.');
            }

            return authorService.deleteAuthor(name);
        }),
    },
};
