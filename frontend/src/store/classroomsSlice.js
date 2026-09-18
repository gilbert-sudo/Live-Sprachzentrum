import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/classrooms';

const getAuthHeaders = (getState) => {
  const { user } = getState().auth;
  return { headers: { Authorization: `Bearer ${user.token}` } };
};

export const fetchClassrooms = createAsyncThunk('classrooms/fetchAll', async (_, { getState, rejectWithValue }) => {
  try {
    const { data } = await axios.get(API_URL, getAuthHeaders(getState));
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch classrooms');
  }
});

const classroomsSlice = createSlice({
  name: 'classrooms',
  initialState: {
    classrooms: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassrooms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClassrooms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.classrooms = action.payload;
      })
      .addCase(fetchClassrooms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default classroomsSlice.reducer;
