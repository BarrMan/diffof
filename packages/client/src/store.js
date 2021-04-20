import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import freeze from 'redux-freeze';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/'

export const configureStore = (initialState = {}) => {
    const middlewares = [thunk];

    if (process.env.NODE_ENV === "development") {
        middlewares.push(freeze, logger);
    }

    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(...middlewares))
    );
};  