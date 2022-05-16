import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore } from 'redux-persist';
import throttle from "redux-throttle";

const defaultWait = 600
const defaultThrottleOption = { // https://lodash.com/docs#throttle
  leading: true,
  trailing: true
}

const middleware = throttle(defaultWait, defaultThrottleOption);

export const store = createStore(reducers, applyMiddleware(thunk, middleware));
export const persistor = persistStore(store);

// export default store;