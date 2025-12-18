import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Heart, Minus, Plus, Share2, Truck, RotateCcw, Shield, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { useSiteContent } from "@/context/SiteContentContext";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useSiteContent();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === id) || products[0]; // Fallback to first if not found

  // Mocking extra details not in simple product model
  const details = [
    "Premium Material Sourcing",
    "Handcrafted with care",
    "Authentic Design",
    "Sustainable Production",
    "Made for longevity",
  ];
  const colors = [
    { name: "Standard", hex: "#000000" },
    { name: "Gold", hex: "#DAA520" },
    { name: "Natural", hex: "#F5F5DC" },
  ];
  const sizes = ["S", "M", "L", "XL"];

  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // If we only have one image, make it an array
  const images = [product?.image];

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor.name
    });
  };

  if (!product) return <div>Product not found</div>;

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
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
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
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full transition-all ${selectedColor.name === color.name
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
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border text-sm font-medium transition-all ${selectedSize === size
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
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-primary-foreground py-4 px-8 font-medium tracking-elegant uppercase text-sm hover:bg-primary/90 transition-colors"
                >
                  Add to Bag
                </button>
                <button
                  onClick={() => { setIsWishlisted(!isWishlisted); toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist"); }}
                  className={`p-4 border transition-colors ${isWishlisted
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
                    {details.map((detail, index) => (
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
                  <p className="py-4 text-muted-foreground text-sm">Dry clean recommended for silk and delicate fabrics. Cold hand wash for cottons.</p>
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

