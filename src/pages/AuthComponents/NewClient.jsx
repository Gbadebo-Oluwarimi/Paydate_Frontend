import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../../Features/Client/Popup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { toast } from "sonner";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { unwrapResult } from "@reduxjs/toolkit";
import { createClient } from "../../Features/Client/Client";
const NewClient = () => {
  const [ClientAddress, setClientAddress] = useState("");
  const [ClientName, setClientName] = useState("");
  const [ClientContact, setClientContact] = useState("");
  const [ClientEmail, setClientEmail] = useState("");
  const [ClientDescription, setClientDescription] = useState("");

  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state) => state.popup.isPopupOpen);
  const { error } = useSelector((state) => state.Client);
  console.log(isPopupOpen, "djdj");
  if (!isPopupOpen) return null;
  const handleSubmission = async (e) => {
    e.preventDefault();

    if (
      !ClientAddress ||
      !ClientContact ||
      !ClientDescription ||
      !ClientEmail ||
      !ClientName
    ) {
      toast("Please fill in all fields", { variant: "destructive" });
      return; // Exit early if input fields are not filled
    }

    try {
      // Dispatch login action
      const resultAction = await dispatch(
        createClient({
          ClientAddress,
          ClientDescription,
          ClientEmail,
          ClientContact,
          ClientName,
        })
      );
      console.log(resultAction);
      const result = unwrapResult(resultAction);
      console.log(result, "djdj");
      if (result) {
        dispatch(closePopup());
        toast(`${result.ClientName} created Successfully ✅ `, {
          description: `User was added to the database`,
        });
      } else {
        // Show toast message if login failed
        toast("user was not created  ❌❌", {
          variant: "destructive",
          description: result.message,
        });
      }
    } catch (error) {
      toast("An Error Occurred", {
        variant: "destructive",
        description: "A drastic error occurred",
      });
    }
  };
  return (
    <div className="w-full min-h-screen fixed z-40 inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
      <Card className="w-[470px]">
        <CardHeader>
          <CardTitle>Add New Client </CardTitle>
          <CardDescription>Create a client</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmission}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Client Name/ Company Name</Label>
                <Input
                  id="name"
                  value={ClientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Client Name"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Client Email Address</Label>
                <Input
                  id="address"
                  value={ClientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="Email Address of Company"
                />
              </div>{" "}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Client Phone Number</Label>
                <Input
                  id="address"
                  value={ClientContact}
                  onChange={(e) => setClientContact(e.target.value)}
                  type="text"
                  placeholder="+1 234 456"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Client Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="24 Comfort Street Abuja"
                  value={ClientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message-2">Client Discription</Label>
                <Textarea
                  placeholder="More information about the client."
                  id="message-2"
                  value={ClientDescription}
                  onChange={(e) => setClientDescription(e.target.value)}
                />
                <p className="text-sm text-muted-foreground"></p>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => dispatch(closePopup())}>
            Cancel
          </Button>
          <Button onClick={(e) => handleSubmission(e)}>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewClient;
