import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User, Package, Heart, MapPin, CreditCard, LogOut, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const orders = [
  {
    id: "AF-001234",
    date: "Dec 5, 2024",
    status: "Delivered",
    total: 1270,
    items: 2,
  },
  {
    id: "AF-001189",
    date: "Nov 22, 2024",
    status: "In Transit",
    total: 850,
    items: 1,
  },
];

const menuItems = [
  { icon: Package, label: "Orders", count: orders.length },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: MapPin, label: "Addresses" },
  { icon: CreditCard, label: "Payment Methods" },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState("orders");
  const [isLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-28 lg:pt-32 pb-20">
          <div className="container mx-auto px-6 lg:px-12 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="font-display text-3xl lg:text-4xl font-medium text-foreground mb-4">
                Akwaaba
              </h1>
              <p className="text-muted-foreground">
                Sign in to access your account
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <Link
                to="/auth"
                className="block w-full bg-primary text-primary-foreground py-4 font-medium tracking-elegant uppercase text-sm hover:bg-primary/90 transition-colors text-center"
              >
                Sign In
              </Link>
              <Link
                to="/auth"
                className="block w-full border border-border py-4 font-medium tracking-elegant uppercase text-sm hover:bg-secondary transition-colors text-center text-foreground"
              >
                Create Account
              </Link>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 lg:pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 mx-auto bg-secondary rounded-full flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-medium text-foreground mb-2">
              Hello, Akua
            </h1>
            <p className="text-muted-foreground">akua@example.com</p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  item.href ? (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-center justify-between p-4 text-foreground hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => setActiveTab(item.label.toLowerCase())}
                      className={`w-full flex items-center justify-between p-4 transition-colors ${
                        activeTab === item.label.toLowerCase()
                          ? "bg-secondary text-foreground"
                          : "text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.count !== undefined && (
                        <span className="text-sm text-muted-foreground">{item.count}</span>
                      )}
                    </button>
                  )
                ))}
                <button className="w-full flex items-center gap-3 p-4 text-destructive hover:bg-destructive/10 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </nav>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              {activeTab === "orders" && (
                <div>
                  <h2 className="font-display text-2xl font-medium text-foreground mb-6">
                    Order History
                  </h2>
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="p-6 border border-border bg-card"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <div>
                              <p className="font-medium text-foreground">{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                            <span
                              className={`px-3 py-1 text-xs font-medium uppercase tracking-elegant ${
                                order.status === "Delivered"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-secondary text-foreground"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                              {order.items} {order.items === 1 ? "item" : "items"}
                            </p>
                            <p className="font-medium text-foreground">GH₵{order.total.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No orders yet</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "addresses" && (
                <div>
                  <h2 className="font-display text-2xl font-medium text-foreground mb-6">
                    Saved Addresses
                  </h2>
                  <div className="p-6 border border-border bg-card">
                    <p className="font-medium text-foreground mb-1">Akua Mensah</p>
                    <p className="text-muted-foreground text-sm">
                      House 15, Nyaniba Estates<br />
                      Osu, Accra<br />
                      Greater Accra Region<br />
                      Ghana
                    </p>
                    <div className="flex gap-4 mt-4">
                      <button className="text-sm text-primary hover:underline">Edit</button>
                      <button className="text-sm text-destructive hover:underline">Delete</button>
                    </div>
                  </div>
                  <button className="mt-4 text-sm text-foreground hover:text-primary underline transition-colors">
                    + Add New Address
                  </button>
                </div>
              )}

              {activeTab === "payment methods" && (
                <div>
                  <h2 className="font-display text-2xl font-medium text-foreground mb-6">
                    Payment Methods
                  </h2>
                  <div className="space-y-4">
                    <div className="p-6 border border-border bg-card">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-yellow-400 rounded flex items-center justify-center text-xs font-bold text-black">
                          MTN
                        </div>
                        <div>
                          <p className="font-medium text-foreground">MTN Mobile Money</p>
                          <p className="text-sm text-muted-foreground">024 •••• ••89</p>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-4">
                        <button className="text-sm text-primary hover:underline">Edit</button>
                        <button className="text-sm text-destructive hover:underline">Delete</button>
                      </div>
                    </div>
                    <div className="p-6 border border-border bg-card">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-secondary rounded flex items-center justify-center text-xs font-medium">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/26</p>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-4">
                        <button className="text-sm text-primary hover:underline">Edit</button>
                        <button className="text-sm text-destructive hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 text-sm text-foreground hover:text-primary underline transition-colors">
                    + Add Payment Method
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
