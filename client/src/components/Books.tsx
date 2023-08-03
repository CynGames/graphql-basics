import React from "react";
import { useAllBooks } from '../utils/customHooks/useAllBooks';
import {useBooks} from "../utils/customHooks/useBooks";

const Books: React.FC = () => {
    const { books, setSelectedGenre, loading } = useAllBooks();

    const genres = [
        'refactoring',
        'agile',
        'patterns',
        'design',
        'crime',
        'classic',
        'terror',
        'allGenres'
    ];

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <h2>Books</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>Author</th>
                    <th>Published</th>
                </tr>
                {books.map((book) => (
                    <tr key={book.title}>
                        <td>{book.title}</td>
                        <td style={{textAlign: "center"}}>{book.author ? book.author.name : "No Author"}</td>
                        <td style={{textAlign: "center"}}>{book.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {genres.map((genre, index) => (
                <button key={index} onClick={() => setSelectedGenre(genre)}>{genre}</button>
            ))}
        </div>
    );
};

export default Books;
