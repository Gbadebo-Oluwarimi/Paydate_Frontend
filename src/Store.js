import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/AuthSlice";
import popupReducer from "./Features/Client/Popup";
import clientReducer, {
  getIndividualClientReducer,
} from "./Features/Client/Client";
import { getClientReducer } from "./Features/Client/Client";
import {
  getIndividualClientInvoiceReducer,
  createIndividualclientInvoiceReducer,
} from "./Features/Client/ClientInvoice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
    Client: clientReducer,
    getClient: getClientReducer,
    getindividual: getIndividualClientReducer,
    createClientinvoice: createIndividualclientInvoiceReducer,
    getclientInvoice: getIndividualClientInvoiceReducer,
  },
});
