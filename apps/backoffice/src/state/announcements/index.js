import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import AnnouncementAPI from '../../api/announcement';

export const initialState = {
  announcements: [],
  isLoading: false,
  error: null,
};

export const fetchAnnouncements = createAsyncThunk(
  'announcements/fetchAnnouncements',
  async () => {
    const response = await AnnouncementAPI.all();
    return response.data;
  },
);

export const fetchCreateAnnouncement = createAsyncThunk(
  'announcements/fetchCreateAnnouncement',
  async ({ slug, accessToken }, { rejectWithValue }) => {
    try {
      await AnnouncementAPI.create({ slug, accessToken });
      const response = await AnnouncementAPI.all();
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const fetchDeleteAnnouncement = createAsyncThunk(
  'announcements/fetchDeleteAnnouncement',
  async ({ slug, accessToken }, { rejectWithValue }) => {
    try {
      await AnnouncementAPI.delete({ slug, accessToken });
      const response = await AnnouncementAPI.all();
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {
    initialize: (state) => {
      return { ...initialState, announcements: state.announcements };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCreateAnnouncement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeleteAnnouncement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, { payload }) => {
        state.announcements = payload;
        state.isLoading = false;
      })
      .addCase(fetchCreateAnnouncement.fulfilled, (state, { payload }) => {
        state.announcements = payload;
        state.isLoading = false;
      })
      .addCase(fetchDeleteAnnouncement.fulfilled, (state, { payload }) => {
        state.announcements = payload;
        state.isLoading = false;
      })
      .addCase(fetchCreateAnnouncement.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchDeleteAnnouncement.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

// Actions
export const { initialize } = announcementsSlice.actions;

export default announcementsSlice.reducer;
