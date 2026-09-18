import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/homework';

const getAuthHeaders = (getState) => {
  const { user } = getState().auth;
  return { headers: { Authorization: `Bearer ${user.token}` } };
};

export const fetchHomeworks = createAsyncThunk('homework/fetchAll', async (params, { getState, rejectWithValue }) => {
  try {
    const { roomId, level, isPinned } = params || {};
    let query = '';
    if (roomId) query += `?roomId=${roomId}`;
    if (level) query += `${query ? '&' : '?'}level=${level}`;
    if (isPinned) query += `${query ? '&' : '?'}isPinned=${isPinned}`;
    
    const { data } = await axios.get(`${API_URL}${query}`, getAuthHeaders(getState));
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch homeworks');
  }
});

export const addHomework = createAsyncThunk('homework/add', async (payload, { getState, rejectWithValue }) => {
  try {
    const { data } = await axios.post(API_URL, payload, getAuthHeaders(getState));
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to add homework');
  }
});

export const deleteHomework = createAsyncThunk('homework/delete', async (id, { getState, rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`, getAuthHeaders(getState));
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete homework');
  }
});

const homeworkSlice = createSlice({
  name: 'homework',
  initialState: {
    homeworks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeworks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHomeworks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.homeworks = action.payload;
      })
      .addCase(fetchHomeworks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addHomework.fulfilled, (state, action) => {
        state.homeworks.push(action.payload);
      })
      .addCase(deleteHomework.fulfilled, (state, action) => {
        state.homeworks = state.homeworks.filter(h => h._id !== action.payload);
      });
  },
});

export default homeworkSlice.reducer;
