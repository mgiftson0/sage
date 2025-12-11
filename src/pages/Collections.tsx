import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Grid, LayoutGrid, ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Newsletter } from "@/components/Newsletter";

const categories = [
  "All",
  "Tops",
  "Bottoms",
  "Dresses",
  "Outerwear",
  "Accessories",
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

const allProducts = [
  {
    id: 1,
    name: "The Essential Blazer",
    price: 485,
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2000&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 2,
    name: "Linen Wide Trousers",
    price: 295,
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1974&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 3,
    name: "Merino Knit Sweater",
    price: 345,
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2005&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 4,
    name: "Organic Cotton Shirt",
    price: 195,
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1974&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 5,
    name: "Silk Midi Dress",
    price: 550,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1962&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 6,
    name: "Wool Overcoat",
    price: 695,
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 7,
    name: "Cashmere Scarf",
    price: 175,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=1972&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 8,
    name: "Pleated Maxi Skirt",
    price: 325,
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop",
    isNew: true,
  },
];

const CollectionsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [gridView, setGridView] = useState<"small" | "large">("large");

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* Hero Banner */}
        <section className="relative h-[40vh] min-h-[300px] bg-sage-100 flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10"
          >
            <span className="text-xs font-body tracking-wide-elegant uppercase text-primary mb-4 block">
              Curated Selection
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-foreground">
              All <span className="italic">Collections</span>
            </h1>
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-display text-[25vw] font-light text-sage-200/30 tracking-wider">
              A
            </span>
          </div>
        </section>

        {/* Filters Bar */}
        <section className="sticky top-20 lg:top-24 z-40 bg-background border-b border-border py-4">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between">
              {/* Categories - Desktop */}
              <div className="hidden lg:flex items-center space-x-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-sm font-body tracking-elegant uppercase transition-colors ${
                      selectedCategory === category
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center space-x-2 text-sm font-body tracking-elegant uppercase"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>

              {/* Right Actions */}
              <div className="flex items-center space-x-6">
                {/* Sort Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-sm font-body tracking-elegant uppercase text-muted-foreground hover:text-foreground">
                    <span>Sort</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-sm shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`block w-full px-4 py-3 text-left text-sm font-body hover:bg-muted transition-colors ${
                          sortBy === option.value
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid Toggle */}
                <div className="hidden md:flex items-center space-x-2 border-l border-border pl-6">
                  <button
                    onClick={() => setGridView("large")}
                    className={`p-2 transition-colors ${
                      gridView === "large"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setGridView("small")}
                    className={`p-2 transition-colors ${
                      gridView === "small"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              layout
              className={`grid gap-6 lg:gap-8 ${
                gridView === "large"
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }`}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link to={`/product/${product.id}`} className="group block">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted mb-4">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        />
                        {product.isNew && (
                          <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-body tracking-elegant uppercase">
                            New
                          </span>
                        )}
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-body text-muted-foreground mb-1 block">
                          {product.category}
                        </span>
                        <h3 className="font-display text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="font-body text-sm text-foreground">
                          ${product.price}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Mobile Filters Drawer */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 lg:hidden"
            >
              <div
                className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
                onClick={() => setShowFilters(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute right-0 top-0 bottom-0 w-80 bg-background shadow-elevated"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display text-xl">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 text-foreground hover:text-primary transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-body text-sm tracking-elegant uppercase text-muted-foreground mb-4">
                      Categories
                    </h4>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowFilters(false);
                        }}
                        className={`block w-full text-left py-2 font-body transition-colors ${
                          selectedCategory === category
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default CollectionsPage;
