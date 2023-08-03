import {useState} from 'react'
import {useApolloClient} from "@apollo/client";

import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import RegisterForm from "./components/RegisterForm";

const App = () => {
    const initialToken = localStorage.getItem('library-user-token');
    const [token, setToken] = useState(initialToken);
    const [page, setPage] = useState('authors');
    const [errorMessage, setErrorMessage] = useState(null);
    const client = useApolloClient();

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }



    const logout = async () => {
        setToken(null)
        localStorage.clear()
        await client.resetStore()

        console.log('Logged out')
    }

    return (
        <div>
            <div>
                {!token && (
                    <>
                        <button onClick={() => setPage('login')}>Login</button>
                        <button onClick={() => setPage('register')}>Register</button>
                        <span/>
                    </>
                )}
                <>
                    <button onClick={() => setPage('authors')}>Authors</button>
                    <button onClick={() => setPage('books')}>Books</button>
                    <button onClick={() => setPage('addBook')}>Add Book</button>
                </>
            </div>

            <Notify errorMessage={errorMessage}/>

            {token && <button onClick={logout}>Logout</button>}

            {!token && <LoginForm show={page === 'login'} setToken={setToken}/>}
            {!token && <RegisterForm show={page === 'register'}/>}

            <Authors show={page === 'authors'}/>
            <Books show={page === 'books'}/>
            <BookForm show={page === 'addBook'}/>
        </div>
    )
}

export default App
