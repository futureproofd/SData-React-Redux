import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import middleware from '../src/middleware'
import combinedReducers from '../src/reducers/combined'

import App from '../src/components/App';

const store = createStore(combinedReducers, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);