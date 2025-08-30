import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  CreditCard, 
  MapPin, 
  Bell,
  Star,
  Eye,
  Calendar
} from "lucide-react";

const recentOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 329.98,
    items: ["Classic Aviator", "Modern Square"]
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Processing",
    total: 149.99,
    items: ["Vintage Round"]
  }
];

const wishlistItems = [
  {
    id: 1,
    name: "Cat Eye Glamour",
    brand: "Chic Vision",
    price: 139.99,
    image: "https://images.unsplash.com/photo-1556306535-38febf6782d7?w=200&h=200&fit=crop"
  },
  {
    id: 2,
    name: "Sport Performance",
    brand: "Active Vision",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=200&h=200&fit=crop"
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              My Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your orders, wishlist, and account settings
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 bg-gradient-to-br from-card to-sky shadow-card">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">John Doe</h3>
                      <p className="text-muted-foreground text-sm">Premium Member</p>
                    </div>
                  </div>
                  
                  <nav className="space-y-2">
                    <Button
                      variant={activeTab === "overview" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("overview")}
                    >
                      <User className="h-4 w-4 mr-3" />
                      Overview
                    </Button>
                    <Button
                      variant={activeTab === "orders" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("orders")}
                    >
                      <Package className="h-4 w-4 mr-3" />
                      Orders
                    </Button>
                    <Button
                      variant={activeTab === "wishlist" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("wishlist")}
                    >
                      <Heart className="h-4 w-4 mr-3" />
                      Wishlist
                    </Button>
                    <Button
                      variant={activeTab === "settings" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Button>
                  </nav>
                </Card>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  {/* Stats Cards */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="p-6 bg-gradient-to-br from-card to-sky shadow-card">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Package className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Orders</p>
                          <p className="text-2xl font-bold">12</p>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-6 bg-gradient-to-br from-card to-sky shadow-card">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Heart className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Wishlist Items</p>
                          <p className="text-2xl font-bold">8</p>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-6 bg-gradient-to-br from-card to-sky shadow-card">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Star className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Loyalty Points</p>
                          <p className="text-2xl font-bold">2,450</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Recent Orders */}
                  <Card className="p-6 bg-gradient-to-br from-card to-sky shadow-card">
                    <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-background rounded-lg">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                              {order.status}
                            </Badge>
                            <p className="text-sm font-medium mt-1">${order.total}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === "orders" && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-card to-sky shadow-card">
                    <h3 className="text-xl font-semibold mb-6">Order History</h3>
                    <div className="space-y-6">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="border border-border rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold text-lg">{order.id}</h4>
                              <p className="text-muted-foreground flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {order.date}
                              </p>
                            </div>
                            <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                              {order.status}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            {order.items.map((item, index) => (
                              <p key={index} className="text-sm">• {item}</p>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">Total: ${order.total}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              {order.status === "Delivered" && (
                                <Button variant="outline" size="sm">
                                  Reorder
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === "wishlist" && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-card to-sky shadow-card">
                    <h3 className="text-xl font-semibold mb-6">My Wishlist</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="border border-border rounded-lg p-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-muted-foreground text-sm">{item.brand}</p>
                          <p className="text-primary font-semibold mt-2">${item.price}</p>
                          <div className="flex gap-2 mt-4">
                            <Button className="flex-1" size="sm">Add to Cart</Button>
                            <Button variant="outline" size="sm">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-card to-sky shadow-card">
                    <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
                    
                    <Tabs defaultValue="profile">
                      <TabsList className="mb-6">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="addresses">Addresses</TabsTrigger>
                        <TabsTrigger value="payment">Payment</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="profile" className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="John" />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Doe" />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" defaultValue="+1 (555) 123-4567" />
                        </div>
                        
                        <Button>Save Changes</Button>
                      </TabsContent>
                      
                      <TabsContent value="addresses">
                        <div className="space-y-4">
                          <div className="border border-border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">Home</p>
                                <p className="text-sm text-muted-foreground">123 Main St<br />New York, NY 10001</p>
                              </div>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full">
                            <MapPin className="h-4 w-4 mr-2" />
                            Add New Address
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="payment">
                        <div className="space-y-4">
                          <div className="border border-border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">•••• •••• •••• 1234</p>
                                <p className="text-sm text-muted-foreground">Expires 12/25</p>
                              </div>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Add New Card
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="notifications">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Order Updates</p>
                              <p className="text-sm text-muted-foreground">Get notified about order status</p>
                            </div>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Promotions</p>
                              <p className="text-sm text-muted-foreground">Receive special offers and discounts</p>
                            </div>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;