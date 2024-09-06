import { useState } from "react";
import {
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
  Router,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Loginform from "./pages/Login";
import { Dashboard } from "./pages/AuthPages/Dashboard";
import SignUpform from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpform />} />
        <Route path="/login" element={<Loginform />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
