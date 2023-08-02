import {useState} from 'react'
import {useMutation} from '@apollo/client'
import {CREATE_USER} from '../queries'

const RegisterForm = ({setError, setToken, show}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [favoriteGenre, setFavoriteGenre] = useState('')

    const [createUser, result] = useMutation(CREATE_USER, {
        onError: (error) => {
            // setError(error.graphQLErrors[0].message)
        }
    })

    if (!result || !show) {
        return null;
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const submit = async (event) => {
        event.preventDefault()

        const input = {
            username,
            password,
            favoriteGenre
        }

        console.log(input);

        await createUser({variables: { input }})

        console.log('User Created');
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    Username
                    <input
                        value={username}
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Password
                    <input
                        type='password'
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <div>
                    Favorite Genre
                    <input
                        value={favoriteGenre}
                        onChange={({target}) => setFavoriteGenre(target.value)}
                    />
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default RegisterForm
