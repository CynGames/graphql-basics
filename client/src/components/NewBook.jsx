import { useState } from 'react'
import { CREATE_BOOK } from "../queries/queries";
import { useMutation } from "@apollo/client";

const NewBook = (props) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState(0);
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState([]);

    const [createBook] = useMutation(CREATE_BOOK);

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault();

        console.log('Adding book...');

        await createBook({
            variables: {
                title,
                author,
                published: parseInt(published),
                genres
            }
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
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
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

export default NewBook
