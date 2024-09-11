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

export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async (clientId, thunkAPI) => {
    try {
      await axios.delete(
        `http://localhost:3002/user/delete_client/${clientId}`,
        {
          withCredentials: true,
        }
      );
      console.log(clientId, "client deleted");
      return clientId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getIndividualClient = createAsyncThunk(
  "client/getIndividualClient",
  async (clientId, thunkAPI) => {
    console.log("Thunk ran with clientId:", clientId);
    try {
      const response = await axios.get(
        `http://localhost:3002/user/client/${clientId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response, "client successfully gotten");
      return response.data.client; // Ensure you're returning response.data
    } catch (error) {
      console.error("Error fetching client:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
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
    clients_length: null,
    loading_client: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserClient.pending, (state) => {
        state.loading_client = true;
        state.error = null;
      })
      .addCase(getUserClient.fulfilled, (state, action) => {
        state.clients = action.payload;
        state.clients_length = action.payload.length;
        state.loading_client = false;
      })
      .addCase(getUserClient.rejected, (state, action) => {
        state.loading_client = false;
        state.error = action.payload?.message;
      })
      .addCase(deleteClient.pending, (state) => {
        state.loading_client = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter(
          (client) => client._id !== action.payload
        );
        state.loading_client = false;
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading_client = false;
        state.error = action.payload.message;
      });
  },
});
const getIndividualClientSlice = createSlice({
  name: "getIndividualClient",
  initialState: {
    client: {},
    isAuthenticated: false,
    loading_client: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIndividualClient.pending, (state) => {
        state.loading_client = true;
        state.error = null;
      })
      .addCase(getIndividualClient.fulfilled, (state, action) => {
        console.log(action.payload, "ddd");
        state.client = action.payload;
        state.loading_client = false;
      })
      .addCase(getIndividualClient.rejected, (state, action) => {
        state.loading_client = false;
        state.error = action.payload;
      });
  },
});

// Default export for the createClient slice
export default createClientSlice.reducer;

// Named export for the getClient slice && getIndividualCLient slice
export const getClientReducer = getClientSlice.reducer;
export const getIndividualClientReducer = getIndividualClientSlice.reducer;
