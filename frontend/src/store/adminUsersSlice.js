import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/users';

const getAuthHeaders = (getState) => {
  const { user } = getState().auth;
  return { headers: { Authorization: `Bearer ${user.token}` } };
};

export const fetchAdminUsers = createAsyncThunk('adminUsers/fetchAll', async (_, { getState, rejectWithValue }) => {
  try {
    const { data } = await axios.get(API_URL, getAuthHeaders(getState));
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
  }
});

export const createAdminUser = createAsyncThunk('adminUsers/create', async (userData, { getState, rejectWithValue }) => {
  try {
    const { data } = await axios.post(API_URL, userData, getAuthHeaders(getState));
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create user');
  }
});

export const updateAdminUser = createAsyncThunk('adminUsers/update', async ({ id, userData }, { getState, rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, userData, getAuthHeaders(getState));
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update user');
  }
});

export const deleteAdminUser = createAsyncThunk('adminUsers/delete', async (id, { getState, rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`, getAuthHeaders(getState));
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete user');
  }
});

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState: {
    users: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createAdminUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateAdminUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteAdminUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u._id !== action.payload);
      });
  },
});

export default adminUsersSlice.reducer;
