// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;

// Async thunk for handling login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    console.log("worked");
    try {
      // Replace with actual API call
      const response = await axios.post(
        "http://localhost:3002/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
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
      const response = await axios.post(
        "http://localhost:3002/Signup",
        {
          username,
          password,
          email,
          companyName,
        },
        { withCredentials: true }
      );
      console.log(response, "DATA COMING FROM SIGNIN API");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await axios.post("http://localhost:3002/logout");
      return; // No need to return any data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (_, thunkAPI) => {
    console.log("Dispatching checkSession");
    try {
      const response = await axios.get("http://localhost:3002/check-session");
      console.log("Session check response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Session check error:", error);
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
      })

      .addCase(checkSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user || null;
        state.loading = false;
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
