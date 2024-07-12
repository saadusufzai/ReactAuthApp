/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import authenticateUser from './signinThunks';

const initialState = {
  loggedIn: false,
  status: 'idle',
  loading: false,
  message: '',
};

const signinSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    loginUser: (state) => {
      state.loggedIn = true;
      state.status = '';
      state.loading = false;
    },
    logoutUser: (state, action) => {
      state.loggedIn = false;
      state.status = '';
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(authenticateUser.fulfilled, (state) => {
      state.status = '';
      state.loggedIn = true;
      state.message = '';
      state.loading = false;
    }),
      builder.addCase(authenticateUser.rejected, (state) => {
        state.status = 'Login Failed';
        state.loggedIn = false;
        state.message = 'Email or Password is incorrect';
        state.loading = false;
      }),
      builder.addCase(authenticateUser.pending, (state) => {
        state.status = '';
        state.loading = true;
        state.message = '';
      });
  }
});

export const { loginUser, logoutUser } = signinSlice.actions;
export default signinSlice.reducer;
