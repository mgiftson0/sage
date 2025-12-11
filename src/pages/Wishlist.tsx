import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const initialWishlistItems = [
  {
    id: "1",
    name: "Sage Linen Blazer",
    price: 285,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Organic Cotton Dress",
    price: 195,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Wool Cashmere Coat",
    price: 495,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&auto=format&fit=crop",
  },
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const removeItem = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 lg:pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl lg:text-4xl font-medium text-foreground text-center mb-4"
          >
            Wishlist
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center text-muted-foreground mb-12"
          >
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
          </motion.p>

          {wishlistItems.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 right-4 p-2 bg-background/90 text-foreground hover:bg-background transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button className="w-full bg-primary text-primary-foreground py-3 font-medium tracking-elegant uppercase text-xs hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        Add to Bag
                      </button>
                    </div>
                  </div>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-display text-lg font-medium text-foreground hover:text-primary transition-colors mb-1">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-foreground">${item.price}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Save items you love by clicking the heart icon.
              </p>
              <Link
                to="/collections"
                className="inline-block bg-primary text-primary-foreground py-4 px-8 font-medium tracking-elegant uppercase text-sm hover:bg-primary/90 transition-colors"
              >
                Explore Collections
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}