import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import client from "./apolloClient";

import { ApolloProvider } from "@apollo/client";

const root = document.getElementById('root');

if (root) {
    const rootElement = ReactDOM.createRoot(root);

    rootElement.render(
        <React.StrictMode>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </React.StrictMode>
    );
}
