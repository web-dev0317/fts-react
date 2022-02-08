import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import appReducerImproved from './reducers/app-reducer-improved';
import authReducer from './reducers/auth-reducer';
import socketReducer from './reducers/socket-reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  authReducer,
  appReducerImproved,
  socketReducer,
  form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
