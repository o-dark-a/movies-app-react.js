import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from '../reducers/rootReducer';
import { middlewares } from './middlewares';

const middlewareEnhancer = applyMiddleware(...middlewares);
const composeEnhancer = compose(middlewareEnhancer);

export const store = createStore(rootReducer, composeEnhancer);
