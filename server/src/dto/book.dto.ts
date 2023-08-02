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
