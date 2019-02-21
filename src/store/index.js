import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { fetchResponseConvert } from '../sagas/index';

const saga = createSagaMiddleware();

const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(saga, logger)
);

saga.run(fetchResponseConvert);

export default store;