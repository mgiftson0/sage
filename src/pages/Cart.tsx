import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Lock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const shipping = cartTotal > 500 ? 0 : 50;
  const total = cartTotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 lg:pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl lg:text-4xl font-medium text-foreground text-center mb-12"
          >
            Shopping Bag
          </motion.h1>

          {cartItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 p-6 bg-card border border-border"
                  >
                    <Link to={`/product/${item.productId}`} className="w-24 h-32 flex-shrink-0 bg-secondary overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <Link to={`/product/${item.productId}`}>
                          <h3 className="font-display text-lg font-medium text-foreground hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-auto">
                        {item.color} / {item.size}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-foreground hover:bg-secondary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-foreground hover:bg-secondary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-medium text-foreground">GH₵{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:sticky lg:top-32 h-fit"
              >
                <div className="bg-secondary/50 p-8">
                  <h2 className="font-display text-xl font-medium text-foreground mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">GH₵{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery (Ghana)</span>
                      <span className="text-foreground">{shipping === 0 ? "Free" : `GH₵${shipping}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-primary">
                        Add GH₵{500 - cartTotal} more for free delivery
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between py-4 border-t border-border mb-6">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="font-medium text-foreground">GH₵{total.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-primary text-primary-foreground py-4 font-medium tracking-elegant uppercase text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Truck className="w-4 h-4" />
                      <span>Free delivery on orders over GH₵500</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      <span>Secure checkout with Mobile Money & Cards</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                Your bag is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added anything to your bag yet.
              </p>
              <Link
                to="/collections"
                className="inline-block bg-primary text-primary-foreground py-4 px-8 font-medium tracking-elegant uppercase text-sm hover:bg-primary/90 transition-colors"
              >
                Continue Shopping
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
