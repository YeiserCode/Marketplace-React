import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import wishlistReducer from './wishlistSlice';
import addressReducer from './addressSlice';

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
    wishlist: wishlistReducer,
    address: addressReducer,
  },
  preloadedState,
});


export default store;
