import { useMutation, useQuery, ApolloCache } from "@apollo/client";
import { useState } from "react";

import { GET_ALL_AUTHORS, UPDATE_AUTHOR } from "../../queries";
import { useNotification } from "./useNotification";

export interface Author {
    id: string;
    name: string;
    dateOfBirth: number;
}

interface GetAllAuthorsResult {
    authors: Author[];
}

interface UpdateAuthorResult {
    updateAuthor: Author;
}

export const useAuthors = () => {
    const { notify } = useNotification();
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(0);
    const { data, loading, error } = useQuery<GetAllAuthorsResult>(GET_ALL_AUTHORS, {
        pollInterval: 2000,
    });

    const [updateAuthor] = useMutation<UpdateAuthorResult>(UPDATE_AUTHOR, {
        update: (cache: ApolloCache<UpdateAuthorResult>, { data }) => {
            const existingAuthors = cache.readQuery<GetAllAuthorsResult>({ query: GET_ALL_AUTHORS });

            if (data?.updateAuthor && existingAuthors) {
                cache.writeQuery<GetAllAuthorsResult>({
                    query: GET_ALL_AUTHORS,
                    data: {
                        authors: existingAuthors.authors.map((author) =>
                            author.id === data.updateAuthor.id ? data.updateAuthor : author
                        ),
                    },
                });
            }
        },
        onError: (error) => {
            notify(error.graphQLErrors[0].message);
        },
    });

    const modifyAuthor = async (name: string, dateOfBirth: number) => {
        await updateAuthor({ variables: { name, input: { name, dateOfBirth } } });

        setName("");
        setDateOfBirth(0);
    };

    return {
        name,
        setName,
        dateOfBirth,
        setDateOfBirth,
        modifyAuthor,
        authors: data?.authors,
        loading,
        error,
    };
};
