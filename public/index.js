import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import middleware from '../src/middleware'
import session from '../src/reducers/authUser';

import Login from '../src/components/Login';

const store = createStore(session, middleware);

console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <Login />
    </Provider>,
    document.getElementById('root')
);