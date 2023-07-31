import {useQuery} from "@apollo/client";
import {GET_ALL_BOOKS} from "../queries";

const Books = (props) => {

    const result = useQuery(GET_ALL_BOOKS, {
        pollInterval: 2000
    });

    if (!result || !props.show) {
        return null;
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const books = result.data.books;

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
        </div>
    )
};

export default Books
