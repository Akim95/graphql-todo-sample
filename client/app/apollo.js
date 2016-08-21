import ApolloClient, { createNetworkInterface } from 'apollo-client';

// graphql endpoint
const networkInterface =  createNetworkInterface('http://<here>/graphql');

const client = new ApolloClient({
  networkInterface,
});

export default client;
