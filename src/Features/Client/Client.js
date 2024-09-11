import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

// Async thunk for handling client creation
export const createClient = createAsyncThunk(
  "client/createClient",
  async (
    {
      ClientAddress,
      ClientDescription,
      ClientEmail,
      ClientContact,
      ClientName,
    },
    thunkAPI
  ) => {
    console.log("worked");
    try {
      const response = await axios.post(
        "http://localhost:3002/user/create_client",
        {
          ClientAddress,
          ClientDescription,
          ClientEmail,
          ClientContact,
          ClientName,
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

// Async thunk for fetching user clients
export const getUserClient = createAsyncThunk(
  "client/getUserClient",
  async (_, thunkAPI) => {
    console.log("Dispatching getuserClient");
    try {
      const response = await axios.get("http://localhost:3002/user/clients");
      console.log("getting the clients of this user:", response.data);
      return response.data.users;
    } catch (error) {
      console.error("couldnt get the clients of the user:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice for creating a client
const createClientSlice = createSlice({
  name: "client",
  initialState: {
    client: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.client = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

// Slice for fetching clients
const getClientSlice = createSlice({
  name: "getclient",
  initialState: {
    clients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserClient.fulfilled, (state, action) => {
        state.clients = action.payload;
        state.loading = false;
      })
      .addCase(getUserClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

// Default export for the createClient slice
export default createClientSlice.reducer;

// Named export for the getClient slice
export const getClientReducer = getClientSlice.reducer;
