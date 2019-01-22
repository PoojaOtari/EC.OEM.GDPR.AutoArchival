import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';

import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable'
import createSagaMiddleware from 'redux-saga';

import { getQuery } from './utility'
import { initSagas } from './initSagas';
import { reducer } from './combineReducers';
import { defaultState } from './defaultState';
import { composeWithDevTools } from 'redux-devtools-extension';

const stateTransformer = (state) => {
    if (Iterable.isIterable(state)) return state.toJS();
    else return state;
};

const logger = createLogger({
    stateTransformer,
});

export const getStore = ()=>{
    const sagaMiddleware = createSagaMiddleware();
    const middleWares = [sagaMiddleware];
    if (getQuery()['logger']) { middleWares.push(logger)}
    const composables = [applyMiddleware(...middleWares)
    ];
    const enhancer = composeWithDevTools(...composables);

    var red = reducer;
    const store = createStore(
        reducer,
        defaultState,
        enhancer,
    );
    initSagas(sagaMiddleware);
    return store;
};