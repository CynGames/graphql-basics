import React from 'react';
import {LoginPage, RegisterPage} from '../pages';

export const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <LoginPage/>
            <RegisterPage/>
        </div>
    );
};
