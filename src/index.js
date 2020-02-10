import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from './store/reduces'
import Router from './router'
import App from './App'
import './index.css';
import * as serviceWorker from './serviceWorker';
import { fetchOneUnlabeledSentence } from './store/actions';

const loggerMiddleware = createLogger()

const store =  createStore(rootReducer,applyMiddleware(thunkMiddleware,loggerMiddleware))

async function initDom(){
    await store.dispatch(fetchOneUnlabeledSentence())
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
}
initDom();
//ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
