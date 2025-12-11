import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center gradient-hero pt-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-xl mx-auto"
          >
            <span className="font-display text-[120px] md:text-[180px] font-light text-sage-200 leading-none block">
              404
            </span>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4 -mt-8">
              Page Not Found
            </h1>
            <p className="font-body text-muted-foreground mb-10">
              The page you're looking for seems to have wandered off. Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-elegant uppercase hover:bg-sage-600 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-8 py-4 border border-border text-foreground font-body text-sm tracking-elegant uppercase hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
