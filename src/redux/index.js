import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import reducer from './reducer';
import rootSaga from './saga';
import history from '../history';

const sagaMiddleware = new createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), logger);

const store = createStore(reducer, enhancer);
window.store = store;

sagaMiddleware.run(rootSaga);

export default store;
