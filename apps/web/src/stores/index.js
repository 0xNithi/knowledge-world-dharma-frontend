import { configureStore } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
import productSlice from './ProductReducer/productSlice';
import UserSlice from './AuthReducer/AuthReducer';
import modalSlice from './ModalReducer/ModalReducer';

const PERSISTED_KEYS = {
  states: ['user'],
  namespace: 'app',
};

export default configureStore({
  reducer: {
    thread: productSlice,
    user: UserSlice,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(save(PERSISTED_KEYS)),
  preloadedState: load(PERSISTED_KEYS),
});
