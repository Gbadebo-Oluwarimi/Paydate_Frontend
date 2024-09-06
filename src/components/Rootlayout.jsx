// src/components/RootLayout.jsx
import React from "react";
import { Toaster } from "../components/ui/toaster";
import { ToastProvider } from "./ui/toast";

export default function RootLayout({ children }) {
  return (
    <ToastProvider>
      <main>{children}</main>
      <Toaster />
    </ToastProvider>
  );
}
