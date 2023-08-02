export interface CreateUserInput {
    username: string;
    password: string;
    favoriteGenre: string;
}

export interface UpdateUserInput {
    username: string;
    password?: string;
    favoriteGenre?: string;
}

export interface LoginInput {
    username: string;
    password: string;
}

export interface Token {
    value: string;
}
