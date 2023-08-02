import {BookService, AuthorService, UserService} from "../service";
import {UserDocument} from "../db/models";

export type Context = {
    bookService: BookService;
    authorService: AuthorService;
    userService: UserService;
    user?: UserDocument | null;
};
