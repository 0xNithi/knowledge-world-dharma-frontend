import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    accessToken: null,
  },
  reducers: {
    setNewUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { login, logout, setAccessToken, setNewUser } = UserSlice.actions;
export default UserSlice.reducer;
