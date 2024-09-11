import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./Store.js";
import { Provider } from "react-redux";
import RootLayout from "./components/Rootlayout.jsx";
import { Toaster } from "./components/ui/toaster.jsx";
import { ToastProvider } from "@radix-ui/react-toast";
import Nav from "./pages/AuthComponents/Nav.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <Provider store={store}>
      <RootLayout>
        <App />
      </RootLayout>
    </Provider>
  </ToastProvider>
);
