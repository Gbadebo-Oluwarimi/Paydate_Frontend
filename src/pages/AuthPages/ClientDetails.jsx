import React from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../AuthComponents/Nav";
import { getIndividualClient } from "@/Features/Client/Client";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeftCircle,
  ChevronDown,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  SkipBackIcon,
  StepBack,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getIndividualClientInvoices } from "@/Features/Client/ClientInvoice";

const invoiceItems = [];
const ClientDetails = () => {
  const totalAmount = invoiceItems.reduce((sum, item) => sum + item.total, 0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { client, loading_client, error } = useSelector(
    (state) => state.getindividual
  );
  const { clientInvoices, loading_client_invoices, Individual_Invoice_error } =
    useSelector((state) => state.getclientInvoice);
  React.useEffect(() => {
    dispatch(getIndividualClientInvoices(id)),
      dispatch(getIndividualClient(id));
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-4xl mx-auto shadow-md rounded-lg overflow-hidden">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-8">
            <span className="font-medium">
              <Link to="/Client">
                <ArrowLeftCircle />
              </Link>
              {client.clientName}
            </span>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                View User Data
              </Button>
              <Button variant="outline" size="sm">
                View Receipts
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-6 mb-12">
            <Avatar className="h-24 w-24 rounded-lg">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt={client.clientName}
              />
              <AvatarFallback>GO</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold mb-2">{client.ClientName}</h1>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary">Certified</Badge>
                <span className="text-sm text-gray-500 flex items-center">
                  <Avatar className="h-5 w-5 mr-1">
                    <AvatarImage
                      src="/placeholder.svg?height=20&width=20"
                      alt="Jessica Parker"
                    />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  {client.ClientAddress} • Edited 7 hrs ago
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All items" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All items</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Sort
              </Button>
              <Input
                type="search"
                placeholder="Search items..."
                className="w-64"
              />
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Invoice
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden rounded-lg shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[100px] font-semibold">
                    Item ID
                  </TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold text-right">
                    Quantity
                  </TableHead>
                  <TableHead className="font-semibold text-right">
                    Unit Price
                  </TableHead>
                  <TableHead className="font-semibold text-right">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientInvoices.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.unitPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${item.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-gray-50 font-bold">
                  <TableCell colSpan={4} className="text-right">
                    Total Amount:
                  </TableCell>
                  <TableCell className="text-right">
                    ${totalAmount.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetails;
