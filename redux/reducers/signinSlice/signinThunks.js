import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../APIs/axios';
import localStorage from '../../../lib/localStorage';
import fetchUserStatus from '../userSlice/userStatThunk';

const authenticateUser = createAsyncThunk(
  'signin/authenticateUser',
  async function checkUserCredentials(payload, thunkAPI) {
    const requestObj = {
      email: payload.email,
      password: payload.password,
    };
    const response = await axios.post('/auth/login', requestObj );
    if (response.status === 403) {
      throw new Error('Wrong Credentials');
    }
    const { accessToken, refreshToken } = response.data.data;
    localStorage.setToken({ accessToken, refreshToken });
    thunkAPI.dispatch(fetchUserStatus());
    return response.data.tokens;
  }
);

export default authenticateUser;
