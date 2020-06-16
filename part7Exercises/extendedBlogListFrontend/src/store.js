import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import usersInfoReducer from './reducers/usersInfoReducer';

const reducer = combineReducers({
  blog: blogReducer,
  user: userReducer,
  usersInfo: usersInfoReducer,
  notification: notificationReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default store;
