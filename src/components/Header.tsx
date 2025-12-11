import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Collections", href: "/collections" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Story", href: "/story" },
  { name: "Journal", href: "/journal" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-soft"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-foreground hover:text-primary transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Navigation - Left */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-body font-medium tracking-elegant uppercase text-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-center"
              >
                <span className="font-display text-2xl lg:text-3xl font-semibold tracking-wide text-foreground">
                  AFIDES
                </span>
                <span className="text-[9px] tracking-wide-elegant uppercase text-muted-foreground font-body">
                  Timeless Clothing
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Right */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-body font-medium tracking-elegant uppercase text-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              <button
                className="hidden lg:block p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                to="/account"
                className="hidden lg:block p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>
              <Link
                to="/cart"
                className="relative p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-background shadow-elevated"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-12">
                  <span className="font-display text-2xl font-semibold tracking-wide">
                    AFIDES
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-foreground hover:text-primary transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-lg font-display font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <div className="mt-12 pt-6 border-t border-border">
                  <Link
                    to="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-body text-sm tracking-elegant uppercase">
                      Account
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
