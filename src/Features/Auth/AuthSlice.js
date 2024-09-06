// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Async thunk for handling login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    console.log("worked");
    try {
      // Replace with actual API call
      const response = await axios.post("http://localhost:3002/auth/login", {
        username,
        password,
      });
      console.log(response, "data coming from api");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// function for handling the signing up of users
export const SignupUser = createAsyncThunk(
  "auth/SignupUser",
  async ({ username, password, email, companyName }, thunkAPI) => {
    console.log("SIGNING IN USER");
    try {
      // Replace with actual API call
      const response = await axios.post("http://localhost:3002/Signup", {
        username,
        password,
        email,
        companyName,
      });
      console.log(response, "DATA COMING FROM SIGNIN API");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// to watch and check the authentication state of the frontend application
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(SignupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SignupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(SignupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
