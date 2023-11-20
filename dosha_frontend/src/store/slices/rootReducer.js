import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { sideReducer } from './sideReducer';
import { timeReducer } from './timeReducer';
import { notificationReducer } from './notificationReducer';

const rootReducer = combineReducers({
  authReducer,
  sideReducer,
  timeReducer,
  notificationReducer,
});

export default rootReducer;
