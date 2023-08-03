import React, { useState } from 'react';
import { useBooks } from '../utils/customHooks/useBooks';

const BookForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState(0);
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState<string[]>([]);

    const { addBook } = useBooks();

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();

        const input = {
            title,
            author,
            published: parseInt(published.toString(), 10),
            genres
        };

        await addBook(input);

        setTitle('');
        setPublished(0);
        setAuthor('');
        setGenres([]);
        setGenre('');
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre('');
    };

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
                        onChange={({ target }) => setPublished(Number(target.value))}
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
    );
};

export default BookForm;
