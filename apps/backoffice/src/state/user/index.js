import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import UserAPI from '../../api/user';

export const initialState = {
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
};

export const fetchRegister = createAsyncThunk(
  'user/fetchRegister',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await UserAPI.register({ data });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
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
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchRegister.pending || fetchLogin.pending || fetchUser.pending,
        (state) => {
          state.isLoading = true;
        },
      )
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
      })
      .addCase(
        fetchRegister.fulfilled || fetchLogin.fulfilled,
        (state, { payload }) => {
          state.accessToken = payload;
          state.isLoading = false;
        },
      )
      .addCase(fetchUser.rejected, () => initialState)
      .addCase(
        fetchRegister.rejected || fetchLogin.rejected,
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        },
      );
  },
});

// Actions
export const { initialize } = userSlice.actions;

export default userSlice.reducer;
