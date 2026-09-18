import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import authReducer from './authSlice';
import adminUsersReducer from './adminUsersSlice';
import libraryReducer from './librarySlice';
import homeworkReducer from './homeworkSlice';
import classroomsReducer from './classroomsSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    adminUsers: adminUsersReducer,
    library: libraryReducer,
    homework: homeworkReducer,
    classrooms: classroomsReducer,
  },
});
