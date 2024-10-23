import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

// Async thunk for handling client creation
export const createClientInvoice = createAsyncThunk(
  "client/createClientInvoice",
  async (
    {
      invoiceTitle,
      invoiceDescription,
      invoiceItems,
      InvoiceTax,
      InvoiceTotal,
      InvoiceRenewalDate,
      InvoiceInitialDate,
    },
    thunkAPI
  ) => {
    console.log("worked");
    try {
      const response = await axios.post(
        "http://localhost:3002/invoice/create_invoice/:id",
        {
          invoiceTitle,
          invoiceDescription,
          invoiceItems,
          InvoiceTax,
          InvoiceTotal,
          InvoiceRenewalDate,
          InvoiceInitialDate,
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
// export const getUserInvoice = createAsyncThunk(
//   "client/getUserInvoice",
//   async (_, thunkAPI) => {
//     console.log("Dispatching getClientInvoice");
//     try {
//       const response = await axios.get("http://localhost:3002/invoice/get_all");
//       console.log("getting the invoices of this user:", response.data);
//       return response.data.invoice;
//     } catch (error) {
//       console.error("couldnt get the clients of the user:", error);
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

export const deleteClientInvoice = createAsyncThunk(
  "client/deleteClientInvoice",
  async (clientId, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3002/invoice/${clientId}`, {
        withCredentials: true,
      });
      console.log(clientId, "client deleted");
      return clientId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getIndividualClientInvoices = createAsyncThunk(
  "client/getIndividualClientInvoices",
  async (ClientId, thunkAPI) => {
    console.log("Thunk ran with clientId:", ClientId);
    try {
      const response = await axios.get(
        `http://localhost:3002/invoice/client_invoice_all/${ClientId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data, "client invoice successfully gotten");
      return response.data; // Ensure you're returning response.data
    } catch (error) {
      console.error("Error fetching client:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Slice for creating a client
const createClientInvoiceSlice = createSlice({
  name: "createclientInvoice",
  initialState: {
    clientInvoice: null,
    isAuthenticated: false,
    loading: false,
    invoice_error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClientInvoice.pending, (state) => {
        state.loading = true;
        state.invoice_error = null;
      })
      .addCase(createClientInvoice.fulfilled, (state, action) => {
        state.clientInvoice = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(createClientInvoice.rejected, (state, action) => {
        state.loading = false;
        state.invoice_error = action.payload?.message;
      });
  },
});
const getIndividualClientInvoiceSlice = createSlice({
  name: "get/deleteIndividualClientInvoice",
  initialState: {
    clientInvoices: [],
    isAuthenticated: false,
    loading_client_invoices: false,
    Individual_Invoice_error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIndividualClientInvoices.pending, (state) => {
        state.loading_client_invoices = true;
        state.Individual_Invoice_error = null;
      })
      .addCase(getIndividualClientInvoices.fulfilled, (state, action) => {
        console.log(action.payload, "ddd");
        state.clientInvoices = action.payload;
        state.loading_client_invoices = false;
      })
      .addCase(getIndividualClientInvoices.rejected, (state, action) => {
        state.loading_client_invoices = false;
        state.Individual_Invoice_error = action.payload;
      })
      .addCase(deleteClientInvoice.pending, (state) => {
        state.loading_client_invoices = true;
        state.Individual_Invoice_error = null;
      })
      .addCase(deleteClientInvoice.fulfilled, (state, action) => {
        state.clientInvoices = state.clientInvoices.filter(
          (client) => client._id !== action.payload
        );
        state.loading_client_invoices = false;
      })
      .addCase(deleteClientInvoice.rejected, (state, action) => {
        state.loading_client_invoices = false;
        state.Individual_Invoice_error = action.payload.message;
      });
  },
});

// Default export for the createClient slice
export const createIndividualclientInvoiceReducer =
  createClientInvoiceSlice.reducer;

export const getIndividualClientInvoiceReducer =
  getIndividualClientInvoiceSlice.reducer;
