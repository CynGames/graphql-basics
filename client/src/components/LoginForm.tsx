import React, {useEffect, useState} from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';
import { useNotification } from '../utils/customHooks/useNotification';
import { useAuth } from '../utils/contexts/AuthContext';

interface LoginResult {
    login: {
        value: string;
    };
}

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { notify } = useNotification();
    const { setToken } = useAuth();

    const [login, { loading, data }] = useMutation<LoginResult>(LOGIN, {
        onError: (error) => {
            notify(error.graphQLErrors[0].message);
        },
    });

    useEffect(() => {
        if (data) {
            const { value: token } = data.login;
            setToken(token);
            localStorage.setItem('library-user-token', token);
        }
    }, [data, setToken]);

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();

        await login({ variables: { username, password } });

        console.log('User Logged In')
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    Username
                    <input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
