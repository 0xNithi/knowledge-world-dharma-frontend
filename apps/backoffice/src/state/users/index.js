import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await UserAPI.all();
      if (response.data.find((user) => user.id.toString() === slug)) {
        return response.data;
      }
      throw new Error('User not found!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      throw error;
    }
  },
);

export const fetchCreateUser = createAsyncThunk(
  'users/fetchCreateUser',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await UserAPI.register({ data });
      const user = await UserAPI.profile({ accessToken: response.data });
      return user.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const fetchUpdateUser = createAsyncThunk(
  'users/fetchUpdateUser',
  async ({ slug, accessToken, data }, { rejectWithValue }) => {
    try {
      await UserAPI.update({ slug, accessToken, data });
      return { slug, data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const fetchDeleteUser = createAsyncThunk(
  'users/fetchDeleteUser',
  async ({ slug, accessToken }, { rejectWithValue }) => {
    try {
      await UserAPI.delete({ slug, accessToken });
      return slug;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const fetchBanUser = createAsyncThunk(
  'users/fetchBanUser',
  async ({ slug, accessToken }, { rejectWithValue }) => {
    try {
      const response = await UserAPI.ban({ slug, accessToken });
      console.log({
        slug,
        data: { banned: response.data.toLowerCase().includes('true') },
      });
      return {
        slug,
        data: { banned: response.data.toLowerCase().includes('true') },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    initialize: (state) => {
      return { ...initialState, users: state.users };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCreateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBanUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.isLoading = false;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.isLoading = false;
      })
      .addCase(fetchCreateUser.fulfilled, (state, { payload }) => {
        state.users.push(payload);
        state.isLoading = false;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, { payload }) => {
        state.users = state.users.map((data) => {
          if (data.id.toString() === payload.slug) {
            return { ...data, ...payload.data };
          }
          return data;
        });
      })
      .addCase(fetchDeleteUser.fulfilled, (state, { payload }) => {
        state.users = state.users.filter((user) => user.id !== payload);
        state.isLoading = false;
      })
      .addCase(fetchBanUser.fulfilled, (state, { payload }) => {
        state.users = state.users.map((data) => {
          if (data.id.toString() === payload.slug) {
            return { ...data, ...payload.data };
          }
          return data;
        });
      })
      .addCase(fetchUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchCreateUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchUpdateUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchDeleteUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchBanUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

// Actions
export const { initialize } = usersSlice.actions;

export default usersSlice.reducer;
