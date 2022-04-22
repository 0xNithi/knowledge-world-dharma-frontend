import { configureStore } from '@reduxjs/toolkit';
import productSlice from './ProductReducer/productSlice';
import UserSlice from './AuthReducer/AuthReducer';
import modalSlice from './ModalReducer/ModalReducer';

export default configureStore({
  reducer: {
    thread: productSlice,
    user: UserSlice,
    modal: modalSlice,
  },
});
