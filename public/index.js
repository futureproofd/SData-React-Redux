/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import middleware from '../src/middleware';
import combinedReducers from '../src/reducers/combined';
import { reAuthenticate } from '../src/actions/authSession';

import App from '../src/components/App';

const store = createStore(combinedReducers, middleware);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch(reAuthenticate(token));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
