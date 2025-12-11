import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const journey = [
  {
    step: 1,
    location: "Portugal",
    title: "The Farm",
    description:
      "Organic cotton fields where our story begins. Sun-drenched plains, sustainable farming practices.",
  },
  {
    step: 2,
    location: "Italy",
    title: "The Mill",
    description:
      "Heritage mills transform raw fibers into luxurious fabrics. Generations of expertise in every thread.",
  },
  {
    step: 3,
    location: "France",
    title: "The Atelier",
    description:
      "Master tailors bring designs to life. Each stitch placed with intention, each seam a testament to craft.",
  },
  {
    step: 4,
    location: "Worldwide",
    title: "Your Story",
    description:
      "From our hands to yours. The journey continues as you add your own chapter to each piece.",
  },
];

export const Story = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={ref} className="py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-body tracking-wide-elegant uppercase text-primary mb-4 block">
            From Source to Wardrobe
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            The <span className="italic">Journey</span>
          </h2>
        </motion.div>

        {/* Journey Timeline */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Animated Line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-sage-200">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-primary origin-top"
            />
          </div>

          {journey.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className={`relative flex items-center mb-20 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Step Number */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-card border-2 border-primary rounded-full flex items-center justify-center shadow-soft z-10">
                <span className="font-display text-2xl text-primary">
                  {item.step}
                </span>
              </div>

              {/* Content */}
              <div
                className={`ml-24 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-20 md:text-right" : "md:pl-20"
                }`}
              >
                <span className="text-xs font-body tracking-wide-elegant uppercase text-muted-foreground mb-2 block">
                  {item.location}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
