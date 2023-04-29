import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const preloadedState = {
  user: JSON.parse(localStorage.getItem('user')) || {
    uid: null,
    name: null,
    email: null,
    userType: null,
    loading: true,
  },
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState,
});

export default store;
