export type UserMutation = {
    username: string;
    password?: string;
    favoriteGenre?: string;
};

export type Token = {
    value: string;
}
