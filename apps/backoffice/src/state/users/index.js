import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

import UserAPI from '../../api/user';

export const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await UserAPI.all();
  return response.data;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.isLoading = false;
      });
  },
});

// Actions
// export const { resetError, toggleTheme } = userSlice.actions;

export default usersSlice.reducer;
