import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'thread',
  initialState: {
    items: [],
  },
  reducers: {
    setItem: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => {
        return item.post.id !== action.payload;
      });
    },
  },
});

export const { addItem, deleteItem, setItem } = productSlice.actions;
export default productSlice.reducer;
