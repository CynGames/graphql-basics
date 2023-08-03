import React, {createContext, useState, useContext} from 'react';
import {useApolloClient} from "@apollo/client";

interface AuthContextProps {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [token, setToken] = useState<string | null>(null);
    const client = useApolloClient();

    const logout = async (): Promise<void> => {
        setToken(null);
        localStorage.clear();
        await client.resetStore();

        console.log("Logged out");
    };

    return (
        <AuthContext.Provider value={{token, setToken, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};
