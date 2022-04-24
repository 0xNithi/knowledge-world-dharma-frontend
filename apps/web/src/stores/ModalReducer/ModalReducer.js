import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    ModalState: false,
  },
  reducers: {
    openModal: (state) => {
      state.ModalState = true;
    },
    closeModal: (state) => {
      state.ModalState = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
