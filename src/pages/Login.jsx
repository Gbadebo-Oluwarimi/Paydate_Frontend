"use client";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
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
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { SpinnerInfinity } from "spinners-react";

export default function Loginform() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast("Please fill in all fields", { variant: "destructive" });
      return; // Exit early if input fields are not filled
    }

    try {
      // Dispatch login action
      const resultAction = await dispatch(loginUser({ username, password }));
      console.log(resultAction);
      const result = unwrapResult(resultAction);
      console.log(result);
      if (result.username == username) {
        navigate("/dashboard");
        toast("Login Successfull ✅✅✅ ", {
          variant: "destructive",
          description: `Welcome back ${username}`,
        });
      } else {
        console.log(result.success);
        // Show toast message if login failed
        toast("Login Failed ❌❌", {
          variant: "destructive",
          description: result.message || "Incorrect username or password",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast("An Error Occurred", {
        variant: "destructive",
        description: "A drastic error occurred",
      });
    }
  };

  // Conditional rendering based on loading state
  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <SpinnerInfinity
        size={50}
        thickness={100}
        speed={100}
        color="#36ad47"
        secondaryColor="rgba(0, 0, 0, 0.44)"
      />
    </div>
  ) : (
    <Card className="mx-auto max-w-sm mt-20">
      <CardHeader>
        <CardTitle className="text-xl">Paydate</CardTitle>
        <CardDescription>Welcome Back User</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmission} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder=""
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
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
