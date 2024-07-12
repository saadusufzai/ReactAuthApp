/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import registerUser from "../signupSlice/signupThunk";

const initialState = {
  loggedIn: false,
  status: "idle",
  loading: false,
  message: "",
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state) => {
      state.status = "Signup Success";
      state.loggedIn = true;
      state.loading = false;
    }),
      builder.addCase(registerUser.rejected, (state, action) => {
        state.status = "Sign up Failed";
        state.loggedIn = false;
        state.message = action.payload;
        state.loading = false;
      }),
      builder.addCase(registerUser.pending, (state) => {
        state.status = "";
        state.message = "";
        state.loading = true;
      });
  },
});

export default signupSlice.reducer;
