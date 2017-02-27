import ApolloClient, { createNetworkInterface } from 'apollo-client';

// graphql endpoint
const networkInterface =  createNetworkInterface({uri: 'http://<here>/graphql'});

const client = new ApolloClient({
  networkInterface,
});

export default client;
