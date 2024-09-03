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
import { useState } from "react";
export default function SignUpform() {
  const [username, SetUsername] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [companyName, SetCompanyname] = useState("");
  // const setUserSignUpdata = useStore((state) => state.sendCreateUserToAPI);

  const handleSubmition = async (e) => {
    e.preventDefault();
    try {
      console.log(UserStore);
    } catch (error) {
      console.error("Error while submitting:", error);
    }
  };
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
          <a href="#" className="underline">
            Sign in
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
