// src/components/RootLayout.jsx
import React from "react";
import { Toaster } from "./ui/sonner";

export default function RootLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Toaster />
    </>
  );
}
