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
  isWaitlistModalOpen: false,
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

export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/api/auth/register`, userData);
    localStorage.setItem('userInfo', JSON.stringify(data));
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message || 'Registration failed');
  }
});

export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const token = auth.user?.token;
    
    if (!token) {
      return rejectWithValue('No token found');
    }

    const { data } = await axios.get(`/api/auth/profile`);
    const updatedUser = { ...data, token };
    localStorage.setItem('userInfo', JSON.stringify(updatedUser));
    return updatedUser;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message || 'Failed to fetch user profile');
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
    },
    openWaitlistModal(state) {
      state.isWaitlistModalOpen = true;
    },
    closeWaitlistModal(state) {
      state.isWaitlistModalOpen = false;
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
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        localStorage.removeItem('userInfo');
        delete axios.defaults.headers.common['Authorization'];
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
      });
  },
});

export const { logout, openAuthModal, closeAuthModal, openWaitlistModal, closeWaitlistModal } = authSlice.actions;
export default authSlice.reducer;
