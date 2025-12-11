import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const lookbookImages = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1962&auto=format&fit=crop",
    title: "Effortless Elegance",
    aspect: "portrait",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=1972&auto=format&fit=crop",
    title: "Natural Grace",
    aspect: "square",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop",
    title: "Modern Classic",
    aspect: "landscape",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop",
    title: "Timeless Beauty",
    aspect: "portrait",
  },
];

export const Lookbook = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="text-xs font-body tracking-wide-elegant uppercase text-primary mb-4 block">
              Autumn/Winter 2024
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
              The <span className="italic">Lookbook</span>
            </h2>
          </div>
          <Link
            to="/lookbook"
            className="mt-6 md:mt-0 inline-flex items-center text-sm font-body tracking-elegant uppercase text-primary hover:text-sage-600 transition-colors group"
          >
            View Full Lookbook
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {lookbookImages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className={`group relative overflow-hidden rounded-sm cursor-pointer ${
                item.aspect === "portrait"
                  ? "row-span-2"
                  : item.aspect === "landscape"
                  ? "col-span-2"
                  : ""
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
                className={`relative overflow-hidden ${
                  item.aspect === "portrait"
                    ? "aspect-[3/5]"
                    : item.aspect === "landscape"
                    ? "aspect-[16/9]"
                    : "aspect-square"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span className="font-display text-lg text-card">
                    {item.title}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
