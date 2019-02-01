import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import middleware from '../src/middleware'
import session from '../src/reducers/authUser';

import App from '../src/components/App';

const store = createStore(session, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);