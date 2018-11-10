import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './reducers';

export const history = createBrowserHistory();
const initialState = {};
const enhancers = [];
const middleware = [
  routerMiddleware(history),
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

/* eslint-disable no-underscore-dangle */
export default createStore(
    rootReducer(history),
    initialState,
    composedEnhancers,
);
/* eslint-enable */
