// import {gql, useQuery} from "@apollo/client";
// import Authors from "./components/Authors";
//
// const ALL_AUTHORS = gql`
//     query {
//         allAuthors {
//             name,
//             born,
//             id
//         }
//     }
// `
//
// const App = () => {
//     const result = useQuery(ALL_AUTHORS)
//
//     if (result.loading) {
//         return <div>loading...</div>
//     }
//
//     return (
//         <Authors authors={result.data.allAuthors}/>
//     )
// }
//
// export default App;

import { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
    const [page, setPage] = useState('authors')

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>Authors</button>
                <button onClick={() => setPage('books')}>Books</button>
                <button onClick={() => setPage('add')}>Add Book</button>
            </div>

            <Authors show={page === 'authors'} />
            <Books show={page === 'books'} />
            <NewBook show={page === 'add'} />
        </div>
    )
}

export default App
