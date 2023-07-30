import BookService from "service/book";
import AuthorService from "service/author";
import UserService from "service/user";

import {UserDocument} from "db/models/user";

export type Context = {
    bookService: BookService;
    authorService: AuthorService;
    userService: UserService;
    user?: UserDocument | null;
};
