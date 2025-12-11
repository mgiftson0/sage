import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShieldCheck, Truck, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const cartItems = [
  {
    id: "1",
    name: "Kente Silk Wrap Dress",
    price: 1250,
    quantity: 1,
    size: "M",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Adinkra Print Blazer",
    price: 890,
    quantity: 1,
    size: "L",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=400&auto=format&fit=crop",
  },
];

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === "express" ? 80 : 40;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-2">
              Checkout
            </h1>
            <p className="text-muted-foreground font-body mb-12">
              Complete your order from Accra's finest fashion house
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="font-display text-xl text-foreground mb-6">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Kwame" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Asante" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="kwame@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+233 20 123 4567" />
                  </div>
                </div>
              </motion.div>

              {/* Delivery Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="font-display text-xl text-foreground mb-6">Delivery Address</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Independence Avenue" />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Accra" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Input id="region" placeholder="Greater Accra" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="landmark">Landmark</Label>
                      <Input id="landmark" placeholder="Near Kwame Nkrumah Circle" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Delivery Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="font-display text-xl text-foreground mb-6">Delivery Method</h2>
                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-3">
                  <div className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${deliveryMethod === "standard" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <div>
                        <Label htmlFor="standard" className="cursor-pointer font-medium">Standard Delivery</Label>
                        <p className="text-sm text-muted-foreground">3-5 business days within Accra</p>
                      </div>
                    </div>
                    <span className="font-body text-foreground">GH₵40</span>
                  </div>
                  <div className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${deliveryMethod === "express" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="express" id="express" />
                      <div>
                        <Label htmlFor="express" className="cursor-pointer font-medium">Express Delivery</Label>
                        <p className="text-sm text-muted-foreground">Same day delivery in Accra</p>
                      </div>
                    </div>
                    <span className="font-body text-foreground">GH₵80</span>
                  </div>
                </RadioGroup>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="font-display text-xl text-foreground mb-6">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === "momo" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="momo" id="momo" />
                      <div>
                        <Label htmlFor="momo" className="cursor-pointer font-medium">Mobile Money</Label>
                        <p className="text-sm text-muted-foreground">MTN MoMo, Vodafone Cash, AirtelTigo Money</p>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="card" id="card" />
                      <div>
                        <Label htmlFor="card" className="cursor-pointer font-medium">Card Payment</Label>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, Ghana Commercial Bank</p>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="cod" id="cod" />
                      <div>
                        <Label htmlFor="cod" className="cursor-pointer font-medium">Cash on Delivery</Label>
                        <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === "momo" && (
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="momoNumber">Mobile Money Number</Label>
                    <Input id="momoNumber" placeholder="024 XXX XXXX" />
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-card border border-border rounded-lg p-6 sticky top-32"
              >
                <h2 className="font-display text-xl text-foreground mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-body text-sm text-foreground">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">Size: {item.size} | Qty: {item.quantity}</p>
                        <p className="text-sm font-medium text-foreground mt-1">GH₵{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">GH₵{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-foreground">GH₵{deliveryFee}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-medium mb-6">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">GH₵{total.toLocaleString()}</span>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-4">
                  Place Order
                </Button>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    <span>Free returns within 14 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>All major payment methods accepted</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  By placing this order, you agree to our{" "}
                  <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
