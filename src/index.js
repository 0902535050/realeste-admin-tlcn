import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {createStore, compose, applyMiddleware} from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';

import firebaseConfig from './_helpers/firebaseConfig';
import appReducers from './_reducers/index';
import App from './App';
import './style/index.css';

const composeEnhancer  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    appReducers,
    compose(
        composeEnhancer(applyMiddleware(thunk)),
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reactReduxFirebase(firebaseConfig), // redux binding for firebase
        reduxFirestore(firebaseConfig),
    ),
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>    
    </Provider>, 
    document.getElementById('root')
);
serviceWorker.unregister();