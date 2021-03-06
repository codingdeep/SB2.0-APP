import {createStore, applyMiddleware} from 'redux';

import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import combinereducer from '../Reducer';
import rootSaga from '../Sagas/index';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(combinereducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;
