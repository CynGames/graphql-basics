import {useState} from 'react'
import {CREATE_BOOK, GET_ALL_BOOKS} from "../queries";
import {useMutation} from "@apollo/client";

const BookForm = (props) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState(0);
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState([]);

    const [error, setError] = useState(null);

    const [createBook] = useMutation(CREATE_BOOK, {
        update: (cache, { data: { createBook } }) => {
            const { books } = cache.readQuery({ query: GET_ALL_BOOKS });
            cache.writeQuery({
                query: GET_ALL_BOOKS,
                data: { books: books.concat([createBook]) },
            });
        },
        onError: (error) => {
            // const errors = error.graphQLErrors[0].extensions.error.errors
            // const messages = Object.values(errors).map(e => e.message).join('\n')
            // setError(messages)
        },
    });

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault();

        console.log('Adding book...');

        const input = {
            title,
            author,
            published: parseInt(published),
            genres
        }

        await createBook({
            variables: {input},
        });

        console.log('Title: ', title);
        console.log('author: ', author);
        console.log('Published: ', published);
        console.log('Genres: ', genres);

        setTitle('');
        setPublished(0);
        setAuthor('');
        setGenres([]);
        setGenre('');
    }

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre('');
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    Title
                    <input
                        value={title}
                        onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author
                    <input
                        value={author}
                        onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Published
                    <input
                        type="number"
                        value={published}
                        onChange={({target}) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({target}) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        Add Genre
                    </button>
                </div>
                <div>Genres: {genres.join(' ')}</div>
                <button type="submit">Create Book</button>
            </form>
        </div>
    )
}

export default BookForm
