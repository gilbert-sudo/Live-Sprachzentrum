import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/library';

export const fetchLibraryItems = createAsyncThunk('library/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch library items');
  }
});

export const addLibraryItem = createAsyncThunk('library/add', async (itemData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(API_URL, itemData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to add item');
  }
});

export const updateLibraryItem = createAsyncThunk('library/update', async ({ id, itemData }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, itemData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update item');
  }
});

export const deleteLibraryItem = createAsyncThunk('library/delete', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete item');
  }
});

const librarySlice = createSlice({
  name: 'library',
  initialState: {
    libraryItems: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibraryItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLibraryItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.libraryItems = action.payload;
      })
      .addCase(fetchLibraryItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addLibraryItem.fulfilled, (state, action) => {
        state.libraryItems.push(action.payload);
      })
      .addCase(updateLibraryItem.fulfilled, (state, action) => {
        const index = state.libraryItems.findIndex(i => i._id === action.payload._id);
        if (index !== -1) {
          state.libraryItems[index] = action.payload;
        }
      })
      .addCase(deleteLibraryItem.fulfilled, (state, action) => {
        state.libraryItems = state.libraryItems.filter(i => i._id !== action.payload);
      });
  },
});

export default librarySlice.reducer;
