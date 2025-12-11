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
    name: "Royal Kente Blazer",
    price: 850,
    description: "Handwoven by master artisans in Bonwire, Ashanti Region, this stunning Kente blazer features traditional Adinkra symbols representing wisdom and strength. A statement piece for special occasions.",
    details: [
      "100% Handwoven Kente Cloth",
      "Made by Bonwire artisans",
      "Traditional Adinkra patterns",
      "Silk lining",
      "Made in Ghana",
    ],
    care: "Dry clean only. Store flat to preserve weave integrity.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Gold & Green", hex: "#DAA520" },
      { name: "Red & Black", hex: "#8B0000" },
      { name: "Blue & Gold", hex: "#1E3A5F" },
    ],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop",
    ],
  },
  "2": {
    id: "2",
    name: "Ankara Print Dress",
    price: 420,
    description: "A flowing midi dress crafted from premium African wax print fabric. Features a flattering wrap silhouette with traditional Ghanaian patterns celebrating our rich cultural heritage.",
    details: [
      "100% Premium African Wax Print",
      "Wrap-style silhouette",
      "Hidden side pockets",
      "Adjustable tie waist",
      "Handmade in Accra",
    ],
    care: "Machine wash cold, gentle cycle. Hang dry.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sunset Orange", hex: "#E65C00" },
      { name: "Ocean Blue", hex: "#0077BE" },
    ],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&auto=format&fit=crop",
    ],
  },
  "3": {
    id: "3",
    name: "Fugu Northern Smock",
    price: 380,
    description: "Traditional hand-woven smock from Northern Ghana, known locally as Batakari or Fugu. This cultural masterpiece is made using centuries-old techniques passed down through generations.",
    details: [
      "Hand-woven cotton strips",
      "Traditional Northern Ghana design",
      "Hand-embroidered neckline",
      "Unisex styling",
      "Made in Tamale",
    ],
    care: "Hand wash recommended. Air dry in shade.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Natural White", hex: "#F5F5DC" },
      { name: "Earth Brown", hex: "#8B4513" },
    ],
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop",
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
              <p className="text-2xl text-foreground mb-6">GH₵{product.price.toLocaleString()}</p>
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
                  <p className="text-xs text-muted-foreground">Free Ghana Delivery</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">14-Day Returns</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Authenticity Guaranteed</p>
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
