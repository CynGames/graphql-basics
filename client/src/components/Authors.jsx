import {useMutation, useQuery} from "@apollo/client";
import {useState} from "react";

import {GET_ALL_AUTHORS, GET_ALL_BOOKS, GET_AUTHOR_BY_NAME, UPDATE_AUTHOR} from "../queries";

const Authors = (props) => {

    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(0);

    const [error, setError] = useState(null);

    const [editAuthor] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{query: GET_ALL_AUTHORS}],
        onError: (error) => {
            // const errors = error.graphQLErrors[0].extensions.error.errors
            // const messages = Object.values(errors).map(e => e.message).join('\n')
            // setError(messages)
        }
    });

    const result = useQuery(GET_ALL_AUTHORS, {
        pollInterval: 2000
    });

    if (!result || !props.show) {
        return null;
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const authors = result.data.authors;

    const submit = async (event) => {
        event.preventDefault();

        console.log('Modifying Date of Birth');

        const input = {
            name,
            dateOfBirth: parseInt(dateOfBirth)
        }

        await editAuthor({
            variables: {name, input}
        })

        setName('');
        setDateOfBirth(0);
    }

    return (
        <div>
            <h2>Authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>Date of Birth</th>
                    <th>Books</th>
                </tr>

                {authors.map((author, index) => (
                    <tr key={index}>
                        <td>{author.name}</td>
                        <td style={{textAlign: "center"}}>{author.dateOfBirth}</td>
                    </tr>
                ))}

                </tbody>
            </table>

            <h2>Set Date of Birth</h2>

            <form onSubmit={submit}>
                <div>
                    Name:
                    <input value={name} onChange={({target}) => setName(target.value)}/>
                </div>
                <div>
                    Date of Birth:
                    <input value={dateOfBirth} onChange={({target}) => setDateOfBirth(target.value)}/>
                </div>
                <button type="submit">Set Date of Birth</button>
            </form>
        </div>
    )
}

export default Authors
