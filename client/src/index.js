import ReactDOM from 'react-dom/client';
import App from './App';

import {ApolloClient, ApolloProvider, InMemoryCache, gql} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);