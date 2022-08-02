import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './layout/Main';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from './pages/home/Home';
import Detail from './pages/detail/Detail';
import { Provider } from 'react-redux';
import store from './store/store';

const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>    
      <BrowserRouter>
        <Routes>
          <Route element={<Main><Outlet /></Main>}>
            <Route path="/" element={<Home />} />
            <Route path="detail" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);
