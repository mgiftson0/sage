import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Collections from "./pages/Collections";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Wishlist from "./pages/Wishlist";
import Lookbook from "./pages/Lookbook";
import Account from "./pages/Account";
import Story from "./pages/Story";
import Journal from "./pages/Journal";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { SiteContentProvider } from "./context/SiteContentContext";
import { CartProvider } from "./context/CartContext";
import { AdminLayout } from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminHeroConfig from "./admin/pages/AdminHeroConfig";
import AdminPhilosophyConfig from "./admin/pages/AdminPhilosophyConfig";
import AdminCollections from "./admin/pages/AdminCollections";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminCustomers from "./admin/pages/AdminCustomers";
import AdminJournal from "./admin/pages/AdminJournal";
import AdminStory from "./admin/pages/AdminStory";
import AdminLookbook from "./admin/pages/AdminLookbook";
import AdminMaterials from "./admin/pages/AdminMaterials";

import { ThemeProvider } from "@/components/theme-provider";

import { useEffect } from "react";

const queryClient = new QueryClient();

const LightModeEnforcer = () => {
  useEffect(() => {
    // Only enforce light mode on non-admin paths
    if (!window.location.pathname.startsWith('/admin')) {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LightModeEnforcer />
    <SiteContentProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:id" element={<Collections />} />
              <Route path="/new-arrivals" element={<Collections />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/lookbook" element={<Lookbook />} />
              <Route path="/account" element={<Account />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/story" element={<Story />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/journal/:id" element={<Journal />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="hero" element={<AdminHeroConfig />} />
                <Route path="philosophy" element={<AdminPhilosophyConfig />} />
                <Route path="story" element={<AdminStory />} />
                <Route path="lookbook" element={<AdminLookbook />} />
                <Route path="collections" element={<AdminCollections />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="journal" element={<AdminJournal />} />
                <Route path="materials" element={<AdminMaterials />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </SiteContentProvider>
  </QueryClientProvider >
);

export default App;
