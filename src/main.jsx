import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./Store.js";
import { Provider } from "react-redux";
import RootLayout from "./components/Rootlayout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RootLayout>
      <App />
    </RootLayout>
  </Provider>
);
