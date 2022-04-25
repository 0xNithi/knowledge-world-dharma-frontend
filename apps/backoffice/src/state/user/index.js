import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import UserAPI from '../../api/user';

export const initialState = {
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
};

export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await UserAPI.login({ data });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      const response = await UserAPI.profile({ accessToken });
      if (response.data.role.toLowerCase() !== 'admin') {
        throw new Error('Restrict administrator access');
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.statusText);
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      throw error;
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initialize: (state) => {
      return {
        ...initialState,
        user: state.user,
        accessToken: state.accessToken,
      };
    },
    logout: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, { payload }) => {
        state.accessToken = payload;
        state.isLoading = false;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
      })
      .addCase(fetchLogin.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchUser.rejected, (state, { payload }) => {
        state.user = null;
        state.accessToken = null;
        state.isLoading = false;
        state.error = payload;
      });
  },
});

// Actions
export const { initialize, logout } = userSlice.actions;

export default userSlice.reducer;
