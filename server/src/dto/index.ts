// user related
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

// book related
export interface BookQuery {
    title?: string;
    genres?: { $all: string[] };
}

export interface AllBooksQueryData {
    title: string;
    genres: string[];
}

export interface CreateBookInput {
    title: string;
    published: number;
    author: string;
    genres: string[];
}

export interface UpdateBookInput {
    title: string;
    published?: number;
    author?: string;
    genres?: string[];
}

// author related
export interface CreateAuthorInput {
    name: string;
    dateOfBirth: number;
}

export interface UpdateAuthorInput {
    name: string;
    dateOfBirth?: number;
}
