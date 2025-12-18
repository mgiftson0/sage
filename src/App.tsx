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
import Wishlist from "./pages/Wishlist";
import Lookbook from "./pages/Lookbook";
import Account from "./pages/Account";
import Story from "./pages/Story";
import Journal from "./pages/Journal";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { SiteContentProvider } from "./context/SiteContentContext";
import { AdminLayout } from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminHeroConfig from "./admin/pages/AdminHeroConfig";
import AdminPhilosophyConfig from "./admin/pages/AdminPhilosophyConfig";
import AdminCollections from "./admin/pages/AdminCollections";
import AdminProducts from "./admin/pages/AdminProducts";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SiteContentProvider>
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
              <Route path="collections" element={<AdminCollections />} />
              <Route path="products" element={<AdminProducts />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SiteContentProvider>
  </QueryClientProvider>
);

export default App;
