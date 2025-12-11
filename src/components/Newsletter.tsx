import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export const Newsletter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      ref={ref}
      className="py-32 bg-sage-100 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-xs font-body tracking-wide-elegant uppercase text-primary mb-4 block">
            Join the Community
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6">
            Stay <span className="italic">Connected</span>
          </h2>
          <p className="font-body text-muted-foreground mb-10 max-w-md mx-auto">
            Be the first to know about new collections, exclusive offers, and
            the stories behind our craft.
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-3 text-primary"
            >
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <span className="font-body text-lg">
                Welcome to the Afides family
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 pr-14 bg-card border border-border rounded-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-primary-foreground rounded-sm flex items-center justify-center hover:bg-sage-600 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          )}

          <p className="font-body text-xs text-muted-foreground mt-6">
            By subscribing, you agree to receive marketing communications from
            Afides.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
