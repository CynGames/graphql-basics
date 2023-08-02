import { UserInputError } from "apollo-server-express";
import { JsonWebTokenError } from 'jsonwebtoken';
import { IFieldResolver } from "@graphql-tools/utils";

import { Context } from "../types";

type ResolverFn = IFieldResolver<any, Context, any>;

const handleErrors = (fn: ResolverFn): ResolverFn => async (...args) => {
    try {
        return await fn(...args);
    } catch (error: any) {

        if (error instanceof JsonWebTokenError) {
            throw new UserInputError('Authentication failed due to invalid token');

        } else if (error.name === 'ValidationError') {

            throw new UserInputError(
                error.message,
                {invalidArgs: Object.keys(error.errors)}
            );
        } else {
            throw error;
        }
    }
}

export default handleErrors;
