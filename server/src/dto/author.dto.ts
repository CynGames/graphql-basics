export interface CreateAuthorInput {
    name: string;
    dateOfBirth: number;
}

export interface UpdateAuthorInput {
    name: string;
    dateOfBirth?: number;
}
