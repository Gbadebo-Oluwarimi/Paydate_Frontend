import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../../components/ui/pagination";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react";
const Sidebar = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // This will give you the full month name like "November"
    day: "numeric",
  });
  return (
    <div>
      <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Your's Todo's
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy Order ID</span>
              </Button>
            </CardTitle>
            <CardDescription>
              Date: {formattedDate ? formattedDate : "-----"}
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                Create New Todo
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <Separator className="my-4" />

          <Separator className="my-4" />

          <Separator className="my-4" />
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated <time dateTime="2023-11-23">November 23, 2023</time>
          </div>
          <Pagination className="ml-auto mr-0 w-auto"></Pagination>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Sidebar;
