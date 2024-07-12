import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../APIs/axios";
import localStorage from "../../../lib/localStorage";

const registerUser = createAsyncThunk(
  "signin/registerUser",
  async function checkUserCredentials(payload, thunkAPI) {
    try {
      const response = await axios.post("/auth/register", payload);
      const { accessToken, refreshToken } = response.data.data;
      console.log("response", response);
      localStorage.setToken({ accessToken, refreshToken });

      return response.data.data;
    } catch (e) {
      console.log("  console.log", e);
      if (e.statusCode === 403) {
        console.log("e", e);
        return thunkAPI.rejectWithValue([e.message]);
      }
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export default registerUser;
