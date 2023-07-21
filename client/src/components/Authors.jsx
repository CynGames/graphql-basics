// import { useState } from 'react'
// import { useQuery } from '@apollo/client'
// import author from "./author";
// import {FIND_AUTHOR} from "../queries/queries";
//
// const Authors = ({ authors }) => {
//
//     const [nameToSearch, setNameToSearch] = useState(null)
//     const result = useQuery(FIND_AUTHOR, {
//         variables: { nameToSearch },
//         skip: !nameToSearch,
//     })
//
//     if (nameToSearch && result.data) {
//         return (
//             <author
//                 author={result.data.findAuthor}
//                 onClose={() => setNameToSearch(null)}
//             />
//         )
//     }
//
//     return (
//         <div>
//             <h2>Authors</h2>
//             {authors.map((p) => (
//                 <div key={p.name}>
//                     {p.name}
//
//                     <button onClick={() => setNameToSearch(p.name)}>
//                         Show Books
//                     </button>
//                 </div>
//             ))}
//         </div>
//     )
// }
//
// export default Authors

// const author = ({ author, onClose }) => {
//     return (
//         <div>
//             <h2>{author.name}</h2>
//             <div>
//                 {author.born}
//             </div>
//             <button onClick={onClose}>close</button>
//         </div>
//     )
// }
//
// export default author

import {useMutation, useQuery} from "@apollo/client";
import {ALL_AUTHORS, EDIT_AUTHOR} from "../queries/queries";
import {useState} from "react";

const Authors = (props) => {

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(0);

  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  });

  if (!result || !props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors;


  const submit = async (event) => {
    event.preventDefault();

    console.log('Modifying Date of Birth');

    await editAuthor({
      variables: {
        name,
        dateOfBirth: parseInt(dateOfBirth)
      }
    })

    setName('');
    setDateOfBirth(0);
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>Date of Birth</th>
          <th>Books</th>
        </tr>

        {authors.map((author) => (
          <tr key={author.id}>
            <td>{author.name}</td>
            <td style={{textAlign: "center"}}>{author.dateOfBirth}</td>
            <td style={{textAlign: "center"}}>{author.bookCount}</td>
          </tr>
        ))}

        </tbody>
      </table>

      <h2>Set Date of Birth</h2>

      <form onSubmit={submit}>
        <div>
          Name:
          <input value={name} onChange={({target}) => setName(target.value)}/>
        </div>
        <div>
          Date of Birth:
          <input value={dateOfBirth} onChange={({target}) => setDateOfBirth(target.value)}/>
        </div>
        <button type="submit">Set Date of Birth</button>
      </form>
    </div>
  )
}

export default Authors
