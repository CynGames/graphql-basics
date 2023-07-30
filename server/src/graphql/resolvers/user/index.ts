import {UserDocument} from 'db/models/user';
import {CreateUserInput, UpdateUserInput, LoginInput} from "dto";
import {Context, Token} from "../../../types";

import {UserInputError} from "apollo-server-express";

import config from "../../../config";
import handleErrors from "../../../utils";
import jwt from "jsonwebtoken";

export default {
    Query: {
        users: handleErrors(async (root: unknown, args: unknown, {userService}: Context): Promise<UserDocument[] | null> => {
            return await userService.getUsers();
        }),
        user: handleErrors(async (root: unknown, {username}: {username: string}, {userService}: Context): Promise<UserDocument | null> => {
            return await userService.getUserByUsername(username);
        }),
    },
    Mutation: {
        createUser: handleErrors(async (root: unknown, {input}: {input: CreateUserInput}, {userService, user}: Context): Promise<UserDocument | null> => {
            return await userService.createUser(input);
        }),
        updateUser: handleErrors(async (root: unknown, {username, input}: {username: string, input: UpdateUserInput}, {userService, user}: Context): Promise<UserDocument | null> => {
            if (!user) {
                throw new Error('Unauthorized: Must be logged in to perform this action.');
            }

            return await userService.updateUser(username, input);
        }),
        deleteUser: handleErrors(async (root: unknown, {username}: {username: string}, {userService, user}: Context): Promise<UserDocument | null> => {
            if (!user) {
                throw new Error('Unauthorized: Must be logged in to perform this action.');
            }

            return await userService.deleteUser(username);
        }),
        login: handleErrors(async (root: unknown, {username, password}: LoginInput, {userService}: Context): Promise<Token> => {
            const user = await userService.getUserByUsername(username);

            if (!user) {
                throw new UserInputError('Invalid Credentials');
            }

            const passwordMatch = await userService.comparePasswords(password, user.password);
            if (!passwordMatch) {
                throw new UserInputError('Invalid Credentials');
            }

            const userForToken = {
                id: user._id,
                username: user.username,
                favoriteGenre: user.favoriteGenre
            };

            return {value: jwt.sign(userForToken, config.JWT_SECRET!)};
        })
    }
};

