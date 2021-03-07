import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import AppReducer from './reducers';

export default function configureStore(preloadedState?: {}) {
    const middlewares = [thunk];
    let enchancers;
    if (__DEV__) {
        enchancers = composeWithDevTools(applyMiddleware(...middlewares));
    } else {
        const middlewareEnhancer = applyMiddleware(...middlewares);
        enchancers = compose(middlewareEnhancer);
    }
    return createStore(AppReducer, preloadedState, enchancers);
}
