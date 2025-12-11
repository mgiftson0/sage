import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const collections = [
  {
    id: 1,
    name: "Essentials",
    description: "Foundation pieces for every wardrobe",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2005&auto=format&fit=crop",
    items: 24,
  },
  {
    id: 2,
    name: "Autumn Layers",
    description: "Transitional elegance",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
    items: 18,
  },
  {
    id: 3,
    name: "Linen Edit",
    description: "Breathable luxury for warmer days",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
    items: 12,
  },
  {
    id: 4,
    name: "Evening Wear",
    description: "Refined sophistication",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
    items: 15,
  },
];

export const Collections = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-32 bg-sage-50">
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
              Curated Collections
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
              Explore Our <span className="italic">Collections</span>
            </h2>
          </div>
          <Link
            to="/collections"
            className="mt-6 md:mt-0 inline-flex items-center text-sm font-body tracking-elegant uppercase text-primary hover:text-sage-600 transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              onMouseEnter={() => setHoveredId(collection.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden rounded-sm cursor-pointer"
            >
              <Link to={`/collections/${collection.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredId === collection.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <motion.span
                      initial={{ opacity: 0.6 }}
                      animate={{
                        opacity: hoveredId === collection.id ? 1 : 0.6,
                      }}
                      className="text-xs font-body tracking-wide-elegant uppercase text-sage-100 mb-2"
                    >
                      {collection.items} Pieces
                    </motion.span>
                    <h3 className="font-display text-2xl md:text-3xl text-card mb-2">
                      {collection.name}
                    </h3>
                    <p className="font-body text-sm text-sage-200">
                      {collection.description}
                    </p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: hoveredId === collection.id ? 1 : 0,
                        y: hoveredId === collection.id ? 0 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 inline-flex items-center text-sm font-body tracking-elegant uppercase text-card"
                    >
                      Shop Collection
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
