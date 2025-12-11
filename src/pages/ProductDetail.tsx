import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Heart, Minus, Plus, Share2, Truck, RotateCcw, Shield, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";

const products = {
  "1": {
    id: "1",
    name: "Sage Linen Blazer",
    price: 285,
    description: "Crafted from premium European linen, this relaxed-fit blazer embodies effortless sophistication. Perfect for warm days and cool evenings.",
    details: [
      "100% European Linen",
      "Relaxed fit",
      "Single-breasted design",
      "Two front pockets",
      "Made in Portugal",
    ],
    care: "Dry clean recommended. Iron on medium heat.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sage", hex: "#9CAF88" },
      { name: "Ivory", hex: "#F5F5DC" },
      { name: "Stone", hex: "#D4C5B9" },
    ],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop",
    ],
  },
  "2": {
    id: "2",
    name: "Organic Cotton Dress",
    price: 195,
    description: "A timeless midi dress in organic cotton, featuring a flattering A-line silhouette and thoughtful details that elevate everyday dressing.",
    details: [
      "100% Organic Cotton",
      "A-line silhouette",
      "Hidden side pockets",
      "Back zip closure",
      "Made in Italy",
    ],
    care: "Machine wash cold. Hang dry.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Forest", hex: "#6B8E6B" },
      { name: "Cream", hex: "#FFFDD0" },
    ],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&auto=format&fit=crop",
    ],
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = products[id as keyof typeof products] || products["1"];
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 lg:pt-32">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 lg:px-12 mb-8">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/collections" className="hover:text-foreground transition-colors">Collections</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="aspect-[3/4] overflow-hidden bg-secondary rounded-sm">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-1 aspect-square overflow-hidden bg-secondary rounded-sm transition-all ${
                      activeImage === index ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:py-8"
            >
              <h1 className="font-display text-3xl lg:text-4xl font-medium text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-2xl text-foreground mb-6">${product.price}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-8">
                <p className="text-sm font-medium text-foreground mb-3">
                  Color: <span className="font-normal text-muted-foreground">{selectedColor.name}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full transition-all ${
                        selectedColor.name === color.name
                          ? "ring-2 ring-offset-2 ring-primary"
                          : "hover:scale-110"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-foreground">Size</p>
                  <button className="text-sm text-muted-foreground hover:text-foreground underline transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-sm font-medium text-foreground mb-3">Quantity</p>
                <div className="flex items-center border border-border w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-foreground hover:bg-secondary transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-foreground hover:bg-secondary transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-8">
                <button className="flex-1 bg-primary text-primary-foreground py-4 px-8 font-medium tracking-elegant uppercase text-sm hover:bg-primary/90 transition-colors">
                  Add to Bag
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 border transition-colors ${
                    isWishlisted
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-foreground hover:border-primary"
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
                <button
                  className="p-4 border border-border text-foreground hover:border-primary transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 py-8 border-t border-b border-border mb-8">
                <div className="text-center">
                  <Truck className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">30-Day Returns</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">2-Year Warranty</p>
                </div>
              </div>

              {/* Details Accordion */}
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex items-center justify-between py-4 border-b border-border cursor-pointer">
                    <span className="font-medium text-foreground">Details</span>
                    <Plus className="w-4 h-4 group-open:hidden" />
                    <Minus className="w-4 h-4 hidden group-open:block" />
                  </summary>
                  <ul className="py-4 space-y-2 text-muted-foreground text-sm">
                    {product.details.map((detail, index) => (
                      <li key={index}>• {detail}</li>
                    ))}
                  </ul>
                </details>
                <details className="group">
                  <summary className="flex items-center justify-between py-4 border-b border-border cursor-pointer">
                    <span className="font-medium text-foreground">Care Instructions</span>
                    <Plus className="w-4 h-4 group-open:hidden" />
                    <Minus className="w-4 h-4 hidden group-open:block" />
                  </summary>
                  <p className="py-4 text-muted-foreground text-sm">{product.care}</p>
                </details>
              </div>
            </motion.div>
          </div>
        </div>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}