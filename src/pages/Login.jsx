"use client";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../Features/Auth/AuthSlice";
import { Toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "sonner";

export default function Loginform() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Fixed typo in function name
  const [password, setPassword] = useState(""); // Fixed typo in function name
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleSubmission = (e) => {
    // Fixed typo in function name
    e.preventDefault();
    try {
      const resultAction = dispatch(loginUser({ username, password }));
      console.log(resultAction);
      const result = unwrapResult(resultAction);
      console.log(result);
      if (isAuthenticated) {
        navigate("/");
      } else {
        // Handle login error
        console.error("Login failed");
        toast("Login Failed", {
          variant: "destructive",
          description: "Incorrect username or password",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm mt-20">
      <CardHeader>
        <CardTitle className="text-xl">Paydate</CardTitle>
        <CardDescription>Welcome Back User</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username" // Changed id to match the Label
                placeholder=""
                onChange={(e) => setUsername(e.target.value)} // Fixed typo in function name
                value={username}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)} // Fixed typo in function name
              value={password}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={(e) => {
              handleSubmission(e);
            }} // Fixed typo in function name
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
