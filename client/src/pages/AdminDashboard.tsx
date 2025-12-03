import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Search,
  DollarSign,
  Package,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getUsers, User } from "@/services/api";

const adminStats = [
  { label: "Total Designs", value: "2,456", change: "+12%", trend: "up", icon: Package },
  { label: "Total Sales", value: "$45,678", change: "+18%", trend: "up", icon: DollarSign },
  { label: "Active Users", value: "12,345", change: "+8%", trend: "up", icon: Users },
  { label: "Pending Orders", value: "23", change: "-5%", trend: "down", icon: ShoppingCart },
];

const recentOrders = [
  { id: "#ORD-001", customer: "John Smith", email: "john@example.com", items: 3, total: 124.97, status: "completed", date: "Nov 28, 2024" },
  { id: "#ORD-002", customer: "Sarah Wilson", email: "sarah@example.com", items: 1, total: 39.99, status: "processing", date: "Nov 28, 2024" },
  { id: "#ORD-003", customer: "Mike Johnson", email: "mike@example.com", items: 2, total: 84.98, status: "pending", date: "Nov 27, 2024" },
  { id: "#ORD-004", customer: "Emily Brown", email: "emily@example.com", items: 5, total: 199.95, status: "completed", date: "Nov 27, 2024" },
];

const statusColors = {
  active: "bg-green-500/10 text-green-600",
  draft: "bg-yellow-500/10 text-yellow-600",
  completed: "bg-green-500/10 text-green-600",
  processing: "bg-blue-500/10 text-blue-600",
  pending: "bg-yellow-500/10 text-yellow-600",
};
const roleColors = {
  admin: "bg-red-500/10 text-red-600",
  user: "bg-gray-500/10 text-gray-600",
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);
  const { toast } = useToast();
  const { token } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      if (activeTab === "users" && token) {
        setIsUsersLoading(true);
        setUsersError(null);
        try {
          const response = await getUsers(token);
          if (response.success && response.users) {
            setUsers(response.users);
          } else {
            setUsersError(response.message || "Failed to fetch users.");
          }
        } catch (error) {
          setUsersError("An unexpected error occurred.");
        } finally {
          setIsUsersLoading(false);
        }
      }
    };

    fetchUsers();
  }, [activeTab, token]);

  return (
    <Layout hideFooter>
      <div className="min-h-screen bg-secondary/30">
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-card border-r border-border p-4">
            <div className="flex items-center gap-2 px-4 py-3 mb-6">
              
              <span className="font-bold text-lg">Admin Panel</span>
            </div>

            <nav className="space-y-1 flex-1">
              {[
                { name: "Overview", icon: LayoutDashboard, value: "overview" },
                { name: "Orders", icon: ShoppingCart, value: "orders" },
                { name: "Users", icon: Users, value: "users" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Admin</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {adminStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <stat.icon className="h-6 w-6 text-primary" />
                        </div>
                        <span className={`text-sm flex items-center gap-1 ${
                          stat.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}>
                          {stat.trend === "up" ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Orders - This will now take full width on larger screens if it's the only item */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Recent Orders</CardTitle>
                      <Button variant="ghost" size="sm">View All</Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentOrders.slice(0, 4).map((order) => (
                          <div key={order.id} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-foreground">{order.id}</div>
                              <div className="text-sm text-muted-foreground">{order.customer}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${order.total}</div>
                              <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>All Orders</CardTitle>
                      <div className="flex gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search orders..." className="pl-10 w-64" />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{order.customer}</div>
                                <div className="text-sm text-muted-foreground">{order.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>${order.total}</TableCell>
                            <TableCell>
                              <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>All Users</CardTitle>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search users..." className="pl-10 w-64" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>

                          <TableHead>Role</TableHead>
                          <TableHead>Joined At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isUsersLoading && <TableRow><TableCell colSpan={4} className="text-center">Loading users...</TableCell></TableRow>}
                        {usersError && <TableRow><TableCell colSpan={4} className="text-center text-destructive">{usersError}</TableCell></TableRow>}
                        {!isUsersLoading && !usersError && users.map((user) => (
                          <TableRow key={String(user.id)}>
                            <TableCell>
                              <div className="font-medium">{user.fullname}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </TableCell>
                            <TableCell>
                              <Badge className={roleColors[user.role as keyof typeof roleColors]}>{user.role}</Badge>
                            </TableCell>
                            <TableCell>
                              {user.createdAt ? new Date(user.createdAt.toString()).toLocaleDateString() : 'N/A'}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </Layout>
  );
}
