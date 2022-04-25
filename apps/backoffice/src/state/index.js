import { configureStore } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';

import threadsReducer from './threads';
import userReducer from './user';
import usersReducer from './users';

const PERSISTED_KEYS = {
  states: ['user'],
  namespace: 'app',
};

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    threads: threadsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(save(PERSISTED_KEYS)),
  preloadedState: load(PERSISTED_KEYS),
});

export default store;
