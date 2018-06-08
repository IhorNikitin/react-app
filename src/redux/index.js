import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import rootSaga from './saga';
import history from '../history';

const sagaMiddleware = new createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), thunk, logger);

const store = createStore(reducer, enhancer);
window.store = store;

sagaMiddleware.run(rootSaga);

export default store;