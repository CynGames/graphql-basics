import {useLazyQuery} from "@apollo/client";
import {GET_ALL_BOOKS_WITH_PARAMS} from "../queries";
import {useState, useEffect} from "react";

const Books = (props) => {
    const [selectedGenre, setSelectedGenre] = useState('allGenres');
    const [getBooks, result] = useLazyQuery(GET_ALL_BOOKS_WITH_PARAMS);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (selectedGenre === 'allGenres') {
            getBooks()
                .catch(error => console.error(error));
        } else {
            getBooks({ variables: { genres: [selectedGenre] } })
                .catch(error => console.error(error));
        }
    }, [getBooks, selectedGenre]);


    useEffect(() => {
        if (result.data) {
            setBooks(result.data.books);
        }
    }, [result]);

    if (!props.show) {
        return null;
    }

    if (result.loading) {
        return <div>loading...</div>;
    }

    const genres = [
        'refactoring',
        'agile',
        'patterns',
        'design',
        'crime',
        'classic',
        'terror',
        'allGenres'
    ]

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
