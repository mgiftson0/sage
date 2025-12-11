import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "The Essential Blazer",
    price: 485,
    color: "Sage",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2000&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 2,
    name: "Linen Wide Trousers",
    price: 295,
    color: "Natural",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1974&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 3,
    name: "Merino Knit Sweater",
    price: 345,
    color: "Cream",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2005&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 4,
    name: "Organic Cotton Shirt",
    price: 195,
    color: "White",
    image:
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1974&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop",
    isNew: false,
  },
];

export const FeaturedProducts = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section ref={ref} className="py-32 bg-sage-50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body tracking-wide-elegant uppercase text-primary mb-4 block">
            New Arrivals
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            Curated <span className="italic">Selection</span>
          </h2>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted mb-4">
                  {/* Main Image */}
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{
                      opacity: hoveredId === product.id ? 0 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Hover Image */}
                  <motion.img
                    src={product.hoverImage}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{
                      opacity: hoveredId === product.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* New Badge */}
                  {product.isNew && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-body tracking-elegant uppercase">
                      New
                    </span>
                  )}

                  {/* Like Button */}
                  <motion.button
                    onClick={(e) => toggleLike(product.id, e)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      likedIds.includes(product.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-card/80 text-foreground hover:bg-card"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedIds.includes(product.id) ? "fill-current" : ""
                      }`}
                    />
                  </motion.button>

                  {/* Quick Add */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredId === product.id ? 1 : 0,
                      y: hoveredId === product.id ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <button className="w-full py-3 bg-card text-foreground text-sm font-body tracking-elegant uppercase flex items-center justify-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Quick Add</span>
                    </button>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="text-center">
                  <span className="text-xs font-body text-muted-foreground mb-1 block">
                    {product.color}
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
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link
            to="/collections"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-body text-sm tracking-elegant uppercase hover:bg-sage-600 transition-colors"
          >
            Shop All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
