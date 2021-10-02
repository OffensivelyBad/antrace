import React from 'react';
import Main from './src/main';
import { createClient, Provider } from 'urql';

export default function App() {
  const client = createClient({
    url: 'https://sg-ants-server.herokuapp.com/graphql'
  });

  return (
    <Provider value={client}>
      <Main />
    </Provider>
  );
};
