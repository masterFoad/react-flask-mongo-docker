import React from 'react';
import {unregister} from "./serviceWorker";
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import AppStore from './reducers/index';
import thunkMiddleware from 'redux-thunk';

import './index.css';
import App from './App';

let store = createStore(
    AppStore,
    applyMiddleware(thunkMiddleware)
);
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);


unregister();