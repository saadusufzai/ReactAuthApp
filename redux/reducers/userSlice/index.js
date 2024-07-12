/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchUserStatus, {
} from './userStatThunk';

const initialState = {
  status: false, // tracks whether the user data was fetched or not
  loading: true,
  userId: null,
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
    resetUserStatus: (state) => {
    },
  },
  extraReducers: builder => {

    builder.addCase(fetchUserStatus.pending, (state) => {
      state.loading = !(state.name && state.role);
    }),
      builder.addCase(fetchUserStatus.fulfilled, (state, action) => {
        console.log('action',action);
        state.loading = false;
        state.status = true;
        state.userId = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
      }),
      builder.addCase(fetchUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        state.message = action.payload?.message;
      });
  },
});

export const {
  setUserLoading,
  resetUserStatus,
} = userSlice.actions;
export default userSlice.reducer;
