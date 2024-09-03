import { Button } from "./button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

export default function Popup() {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Latest Updates</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Introducing Our Dynamic Orders Dashboard for Seamless Management and
          Insightful Analysis.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Create New Order</Button>
      </CardFooter>
    </Card>
  );
}
