import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
axios.defaults.baseURL = API_URL;

const userInfoStr = localStorage.getItem('userInfo');
const parsedUser = userInfoStr ? JSON.parse(userInfoStr) : null;
if (parsedUser) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
}

const initialState = {
  user: parsedUser,
  isAuthenticated: !!parsedUser,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  isAuthModalOpen: false,
};

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/api/auth/login`, { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message || 'Login failed');
  }
});

export const signup = createAsyncThunk('auth/signup', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/api/auth/register`, { name, email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message || 'Registration failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('userInfo');
      delete axios.defaults.headers.common['Authorization'];
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
    openAuthModal(state) {
      state.isAuthModalOpen = true;
    },
    closeAuthModal(state) {
      state.isAuthModalOpen = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isAuthModalOpen = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isAuthModalOpen = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, openAuthModal, closeAuthModal } = authSlice.actions;
export default authSlice.reducer;
