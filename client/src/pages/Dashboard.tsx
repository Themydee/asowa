import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, PackageCheck, Send, ShoppingCart, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout/Layout";

// --- Mock Data (replace with API calls) ---

const mockDesigns = [
  { id: 1, name: "Vintage Floral", imageUrl: "https://images.unsplash.com/photo-1558636508-e05c424524a5?w=400&h=300&fit=crop" },
  { id: 2, name: "Geometric Sunrise", imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=300&fit=crop" },
  { id: 3, name: "Abstract Waves", imageUrl: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=300&fit=crop" },
];

const mockOrders = [
  { id: "ORD-2024-001", date: "2024-07-28", total: "£45.50", status: "Delivered" },
  { id: "ORD-2024-002", date: "2024-08-10", total: "£112.00", status: "Shipping" },
  { id: "ORD-2024-003", date: "2024-08-15", total: "£78.90", status: "Processing" },
];

const latestOrderStatus = "Shipping"; // This would come from your latest order

const orderSteps = [
  { name: "Processing", icon: ShoppingCart },
  { name: "Paid", icon: CheckCircle },
  { name: "Packaging", icon: Package },
  { name: "Shipping", icon: Send },
  { name: "Delivered", icon: PackageCheck },
];

// --- Helper Components ---

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles: { [key: string]: string } = {
    Processing: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Paid: "bg-blue-100 text-blue-800 border-blue-300",
    Packaging: "bg-indigo-100 text-indigo-800 border-indigo-300",
    Shipping: "bg-purple-100 text-purple-800 border-purple-300",
    Delivered: "bg-green-100 text-green-800 border-green-300",
  };
  return <Badge variant="outline" className={cn("font-semibold", statusStyles[status])}>{status}</Badge>;
};

const OrderStatusTracker = ({ currentStatus }: { currentStatus: string }) => {
  const currentIndex = orderSteps.findIndex(step => step.name === currentStatus);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Order Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          {orderSteps.map((step, index) => {
            const isActive = index <= currentIndex;
            return (
              <div key={step.name} className="flex flex-col items-center text-center w-24">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2",
                  isActive ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border text-muted-foreground"
                )}>
                  <step.icon className="w-6 h-6" />
                </div>
                <p className={cn("mt-2 text-sm font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
                  {step.name}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">Here's a summary of your account activity.</p>
        </header>

        <div className="space-y-8">
          {/* Order Status Tracker */}
          <OrderStatusTracker currentStatus={latestOrderStatus} />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* My Orders Section */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  My Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell><StatusBadge status={order.status} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Uploaded Designs Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UploadCloud className="mr-2 h-5 w-5" />
                  Your Designs
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {mockDesigns.map((design) => (
                  <div key={design.id} className="group relative">
                    <img src={design.imageUrl} alt={design.name} className="rounded-md aspect-square object-cover w-full" />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm font-semibold">{design.name}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;