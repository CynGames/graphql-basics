import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "../queries/queries";

const Books = (props) => {

    const result = useQuery(ALL_BOOKS, {
        pollInterval: 2000
    });

    if (!result || !props.show) {
        return null;
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const books = result.data.allBooks;

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
                        <td style={{textAlign: "center"}}>{book.author.name}</td>
                        <td style={{textAlign: "center"}}>{book.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default Books
