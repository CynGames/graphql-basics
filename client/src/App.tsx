import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/contexts/AuthContext';

import { HomePage, AuthorsPage, BooksPage, AddBookPage } from './pages';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" Component={HomePage} />
                    <Route path="/authors" Component={AuthorsPage} />
                    <Route path="/books" Component={BooksPage} />
                    <Route path="/add-book" Component={AddBookPage} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;



// import React, {useEffect, useState} from "react";
// import { useApolloClient } from "@apollo/client";
//
// import Authors from "./components/Authors";
// import Books from "./components/Books";
// import BookForm from "./components/BookForm";
// import LoginForm from "./components/LoginForm";
// import Notify from "./components/Notify";
// import RegisterForm from "./components/RegisterForm";
//
// const App: React.FC = () => {
//     const [token, setToken] = useState<string | null>(null);
//     const [page, setPage] = useState<"authors" | "books" | "addBook" | "login" | "register">("authors");
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const client = useApolloClient();
//
//     useEffect(() => {
//         const initialToken: string | null = localStorage.getItem("library-user-token");
//         setToken(initialToken);
//     }, []);
//
//     const notify = (message: string): void => {
//         setErrorMessage(message);
//         setTimeout(() => {
//             setErrorMessage(null);
//         }, 5000);
//     };
//
//     const logout = async (): Promise<void> => {
//         setToken(null);
//         localStorage.clear();
//         await client.resetStore();
//
//         console.log("Logged out");
//     };
//
//   return (
//       <div>
//         <div>
//           {!token && (
//               <>
//                 <button onClick={() => setPage('login')}>Login</button>
//                 <button onClick={() => setPage('register')}>Register</button>
//                 <span/>
//               </>
//           )}
//           <>
//             <button onClick={() => setPage('authors')}>Authors</button>
//             <button onClick={() => setPage('books')}>Books</button>
//             <button onClick={() => setPage('addBook')}>Add Book</button>
//           </>
//         </div>
//
//         <Notify errorMessage={errorMessage}/>
//
//         {token && <button onClick={logout}>Logout</button>}
//
//         {!token && <LoginForm show={page === 'login'} setToken={setToken}/>}
//         {!token && <RegisterForm show={page === 'register'}/>}
//
//         <Authors show={page === 'authors'}/>
//         <Books show={page === 'books'}/>
//         <BookForm show={page === 'addBook'}/>
//       </div>
//   )
// }
//
// export default App
