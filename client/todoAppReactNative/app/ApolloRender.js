import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import App from './App';

class ApolloRender extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
  }
}

export default ApolloRender;
