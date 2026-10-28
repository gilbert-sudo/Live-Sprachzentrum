import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/level-tests';
const STORAGE_KEY = 'lsz_level_test_results_v1';
const GUEST_SESSION_KEY = 'lsz_guest_level_test_session';

/**
 * Returns or creates a persistent guest session ID for unauthenticated testers
 */
export const getGuestSessionId = () => {
  try {
    let sessionId = localStorage.getItem(GUEST_SESSION_KEY);
    if (!sessionId) {
      sessionId = 'guest_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem(GUEST_SESSION_KEY, sessionId);
    }
    return sessionId;
  } catch {
    return 'guest_fallback_' + Date.now();
  }
};

/**
 * Reads offline/local fallback cache
 */
export const readCachedLevelTestResults = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

/**
 * Writes to local cache as resilient fallback
 */
const updateCachedLevelTestResults = (newMap) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMap));
  } catch {
    // ignore quota errors
  }
};

const getAuthHeaders = (getState) => {
  const { user } = getState().auth;
  return user?.token ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
};

/**
 * Fetch latest test results for the current authenticated user or current guest session
 */
export const fetchMyLevelTestResults = createAsyncThunk(
  'levelTest/fetchMyResults',
  async (_, { getState, rejectWithValue }) => {
    try {
      const guestSessionId = getGuestSessionId();
      const config = getAuthHeaders(getState);
      const res = await axios.get(`${API_URL}/my-results?guestSessionId=${guestSessionId}`, config);
      const latest = res.data?.latest || {};
      
      // Update local cache for seamless offline resilience
      if (Object.keys(latest).length > 0) {
        updateCachedLevelTestResults(latest);
      }
      return res.data;
    } catch (err) {
      // Fallback gracefully to local cached results if backend is unreachable
      const fallback = readCachedLevelTestResults();
      return rejectWithValue(err.response?.data?.message || err.message, { fallback });
    }
  }
);

/**
 * Submit test evaluation results to the backend
 */
export const submitLevelTestResult = createAsyncThunk(
  'levelTest/submitResult',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const guestSessionId = getGuestSessionId();
      const config = getAuthHeaders(getState);
      const submissionData = {
        ...payload,
        guestSessionId: payload.guestSessionId || guestSessionId
      };

      const res = await axios.post(`${API_URL}/submit`, submissionData, config);
      const savedDoc = res.data?.result;
      return savedDoc;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Fehler beim Speichern');
    }
  }
);

/**
 * Fetch level test submissions for a specific student (Teachers / Admins)
 */
export const fetchStudentLevelTests = createAsyncThunk(
  'levelTest/fetchStudentTests',
  async (studentId, { getState, rejectWithValue }) => {
    try {
      const config = getAuthHeaders(getState);
      const res = await axios.get(`${API_URL}/student/${studentId}`, config);
      return { studentId, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/**
 * Fetch all level tests (Teachers / Admins)
 */
export const fetchAllLevelTests = createAsyncThunk(
  'levelTest/fetchAllTests',
  async (params, { getState, rejectWithValue }) => {
    try {
      const config = getAuthHeaders(getState);
      const query = params ? `?${new URLSearchParams(params).toString()}` : '';
      const res = await axios.get(`${API_URL}${query}`, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const levelTestSlice = createSlice({
  name: 'levelTest',
  initialState: {
    savedResults: readCachedLevelTestResults(),
    history: [],
    currentResult: null,
    studentResults: {}, // studentId -> { latest, history }
    allResults: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    submitting: false,
    error: null
  },
  reducers: {
    clearCurrentResult: (state) => {
      state.currentResult = null;
    },
    setLocalSavedResult: (state, action) => {
      const { testId, summary } = action.payload;
      state.savedResults[testId] = summary;
      updateCachedLevelTestResults(state.savedResults);
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchMyLevelTestResults
      .addCase(fetchMyLevelTestResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyLevelTestResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.savedResults = action.payload.latest || {};
        state.history = action.payload.history || [];
        updateCachedLevelTestResults(state.savedResults);
      })
      .addCase(fetchMyLevelTestResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // submitLevelTestResult
      .addCase(submitLevelTestResult.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitLevelTestResult.fulfilled, (state, action) => {
        state.submitting = false;
        state.currentResult = action.payload;
        if (action.payload?.testId) {
          const tid = action.payload.testId.toLowerCase();
          const summary = {
            _id: action.payload._id,
            testId: tid,
            targetLevel: action.payload.targetLevel,
            prerequisiteLevel: action.payload.prerequisiteLevel,
            percentage: action.payload.percentage,
            totalPoints: action.payload.totalPoints,
            maxPoints: action.payload.maxPoints,
            recommendedLevel: action.payload.recommendedLevel,
            badge: action.payload.badge,
            timedOut: action.payload.timedOut,
            durationSeconds: action.payload.durationSeconds,
            completedAt: action.payload.completedAt
          };
          state.savedResults[tid] = summary;
          updateCachedLevelTestResults(state.savedResults);
        }
      })
      .addCase(submitLevelTestResult.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      // fetchStudentLevelTests
      .addCase(fetchStudentLevelTests.fulfilled, (state, action) => {
        const { studentId, latest, history } = action.payload;
        state.studentResults[studentId] = { latest, history };
      })

      // fetchAllLevelTests
      .addCase(fetchAllLevelTests.fulfilled, (state, action) => {
        state.allResults = action.payload;
      });
  }
});

export const { clearCurrentResult, setLocalSavedResult } = levelTestSlice.actions;
export default levelTestSlice.reducer;

