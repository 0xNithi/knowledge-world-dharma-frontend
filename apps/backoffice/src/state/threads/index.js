import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import ThreadAPI from '../../api/thread';

export const initialState = {
  threads: [],
  isLoading: false,
  error: null,
};

export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async () => {
    const response = await ThreadAPI.all();
    return response.data;
  },
);

export const fetchThread = createAsyncThunk(
  'threads/fetchThread',
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await ThreadAPI.get({ slug });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.statusText);
      }
      throw error;
    }
  },
);

export const fetchCreateThread = createAsyncThunk(
  'threads/fetchCreateThread',
  async ({ accessToken, data }, { rejectWithValue }) => {
    try {
      await ThreadAPI.create({ accessToken, data });
      const response = await ThreadAPI.all();
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const fetchUpdateThread = createAsyncThunk(
  'threads/fetchUpdateThread',
  async ({ slug, accessToken, data }, { rejectWithValue }) => {
    try {
      await ThreadAPI.update({ slug, accessToken, data });
      const response = await ThreadAPI.all();
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const fetchDeleteThread = createAsyncThunk(
  'threads/fetchDeleteThread',
  async ({ slug, accessToken }, { rejectWithValue }) => {
    try {
      await ThreadAPI.delete({ slug, accessToken });
      const response = await ThreadAPI.all();
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    initialize: (state) => {
      return { ...initialState, threads: state.threads };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchThread.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCreateThread.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdateThread.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeleteThread.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchThreads.fulfilled, (state, { payload }) => {
        state.threads = payload;
        state.isLoading = false;
      })
      .addCase(fetchThread.fulfilled, (state, { payload }) => {
        state.threads = [...state.threads, payload];
        state.isLoading = false;
      })
      .addCase(fetchCreateThread.fulfilled, (state, { payload }) => {
        state.threads = payload;
        state.isLoading = false;
      })
      .addCase(fetchUpdateThread.fulfilled, (state, { payload }) => {
        state.threads = payload;
        state.isLoading = false;
      })
      .addCase(fetchDeleteThread.fulfilled, (state, { payload }) => {
        state.threads = payload;
        state.isLoading = false;
      })
      .addCase(fetchThread.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchCreateThread.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchUpdateThread.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchDeleteThread.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

// Actions
export const { initialize } = threadsSlice.actions;

export default threadsSlice.reducer;
