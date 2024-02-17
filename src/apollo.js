// apollo.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'URL_DE_TU_SERVIDOR_GRAPHQL', // Reemplaza con la URL de tu servidor GraphQL
  cache: new InMemoryCache(),
});

export default client;
