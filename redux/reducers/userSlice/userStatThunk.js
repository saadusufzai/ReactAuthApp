import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../APIs/axios';
import { loginUser } from '../signinSlice';

async function userStats(payload, thunkAPI) {
  const userResponse = await axios
    .get('/user/status', { isAuth: true })
    .then((res) => {
      thunkAPI.dispatch(loginUser());
      return res.data.data;
    })
    .catch((err) => {
      throw new Error({ message: err.message });
    });

  return userResponse;
}
const fetchUserStatus = createAsyncThunk('User/fetchStatus', userStats);


export default fetchUserStatus;
