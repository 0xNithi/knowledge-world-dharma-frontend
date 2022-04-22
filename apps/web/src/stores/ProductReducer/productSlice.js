import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'thread',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => {
        return item.id !== action.id;
      });
    },
  },
});

export const { addItem, deleteItem } = productSlice.actions;
export default productSlice.reducer;
