import React from "react";
import {useAuthors} from "../utils/customHooks/useAuthors";

const Authors: React.FC = () => {
    const {
        authors,
        loading,
        error,
        name,
        setName,
        dateOfBirth,
        setDateOfBirth,
        modifyAuthor
    } = useAuthors();

    const handleAuthorSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setName(event.target.value);
    };

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        await modifyAuthor(name, parseInt(String(dateOfBirth)));

        console.log("Author Modified", name, dateOfBirth);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{`An error occurred: ${error.message}`}</div>;

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
                {authors!.map((author) => (
                    <tr key={author.id}>
                        <td>{author.name}</td>
                        <td style={{textAlign: "center"}}>{author.dateOfBirth}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2>Set Date of Birth</h2>

            <form onSubmit={submit}>
                <div>
                    Select an Author:
                    <select value={name} onChange={handleAuthorSelect}>
                        <option value="">Select an author</option>
                        {authors!.map((author) => (
                            <option key={author.id} value={author.name}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/*<div>*/}
                {/*    Name:*/}
                {/*    <input value={name} onChange={({target}) => setName(target.value)}/>*/}
                {/*</div>*/}
                <div>
                    Date of Birth:
                    <input value={dateOfBirth} onChange={({target}) => setDateOfBirth(parseInt(target.value))}/>
                </div>
                <button type="submit">Set Date of Birth</button>
            </form>
        </div>
    );
};

export default Authors;
