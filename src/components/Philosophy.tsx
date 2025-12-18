import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { useSiteContent } from "@/context/SiteContentContext";

export const Philosophy = () => {
  const { config } = useSiteContent();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto"
        >
          {/* Scrolling Text */}
          <div className="overflow-hidden mb-20">
            <motion.p
              initial={{ x: "100%" }}
              animate={isInView ? { x: "-100%" } : {}}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="font-display text-lg md:text-xl text-sage-400 whitespace-nowrap"
            >
              {config.philosophyContent} • {config.philosophyContent} •
            </motion.p>
          </div>

          {/* Philosophy Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-20"
          >
            <span className="text-xs font-body tracking-wide-elegant uppercase text-primary mb-4 block">
              {config.philosophyTitle}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
              The <span className="italic">AFIDES</span> Way
            </h2>
          </motion.div>

          {/* Philosophy Points */}
          <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
            {[
              {
                number: "01",
                title: "Sustainable Sourcing",
                description:
                  "Every fabric traced back to its origin. We partner with certified mills that prioritize environmental stewardship.",
              },
              {
                number: "02",
                title: "Artisanal Craft",
                description:
                  "Each garment passes through the hands of master craftspeople. Techniques refined over generations, preserved in every stitch.",
              },
              {
                number: "03",
                title: "Timeless Design",
                description:
                  "We design for decades, not seasons. Pieces that grow more beautiful with age, becoming heirlooms for the next generation.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                className="text-center"
              >
                <span className="font-display text-5xl text-sage-200 mb-4 block">
                  {item.number}
                </span>
                <h3 className="font-display text-xl font-medium text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
