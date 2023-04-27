import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uid: null,
  name: null,
  email: null,
  userType: null,
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userType = action.payload.userType;
      state.loading = false;
    },
    clearUser: (state) => {
      state.uid = null;
      state.name = null;
      state.email = null;
      state.userType = null;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
