import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useToast } from "../hooks/use-toast";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { SignupUser } from "@/Features/Auth/AuthSlice";
export default function SignUpform() {
  const [username, SetUsername] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [companyName, SetCompanyname] = useState("");
  // const setUserSignUpdata = useStore((state) => state.sendCreateUserToAPI);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmition = async (e) => {
    e.preventDefault();

    dispatch(SignupUser({ username, password, email, companyName }));
    console.log("Data Successfully sent from the frontend");
  };
  useEffect(() => {
    if (error) {
      console.log("HEWWWWW");
      toast("Event has been created.");
    }
  }, [error, toast]);
  return (
    <Card className="mx-auto max-w-sm mt-20">
      <CardHeader>
        <CardTitle className="text-xl">Paydate v1</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Username</Label>
              <Input
                id="first-name"
                placeholder=""
                onChange={(e) => SetUsername(e.target.value)}
                value={username}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e) => Setemail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => Setpassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">BusinessName</Label>
            <Input
              id="first_name"
              type=""
              onChange={(e) => SetCompanyname(e.target.value)}
              value={companyName}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={(e) => handleSubmition(e)}
          >
            Create an account
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
