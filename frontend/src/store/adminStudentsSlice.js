import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/students';

const getAuthHeaders = (getState) => {
  const { user } = getState().auth;
  return { headers: { Authorization: `Bearer ${user.token}` } };
};

export const fetchAdminStudents = createAsyncThunk('adminStudents/fetchAll', async (_, { getState, rejectWithValue }) => {
  try {
    const { data } = await axios.get(API_URL, getAuthHeaders(getState));
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch students');
  }
});

export const createAdminStudent = createAsyncThunk('adminStudents/create', async (studentData, { getState, rejectWithValue }) => {
  try {
    const { data } = await axios.post(API_URL, studentData, getAuthHeaders(getState));
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create student');
  }
});

export const updateAdminStudent = createAsyncThunk('adminStudents/update', async ({ id, studentData }, { getState, rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, studentData, getAuthHeaders(getState));
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update student');
  }
});

export const deleteAdminStudent = createAsyncThunk('adminStudents/delete', async (id, { getState, rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`, getAuthHeaders(getState));
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete student');
  }
});

const adminStudentsSlice = createSlice({
  name: 'adminStudents',
  initialState: {
    students: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchAdminStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createAdminStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateAdminStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(deleteAdminStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(s => s._id !== action.payload);
      });
  },
});

export default adminStudentsSlice.reducer;
