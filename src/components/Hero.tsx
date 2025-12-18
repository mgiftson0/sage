import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export const Hero = () => {
  const { config } = useSiteContent();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden gradient-hero"
    >
      {/* Background Text */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="font-display text-[20vw] font-light text-sage-200/40 tracking-wider">
          A
        </span>
      </motion.div>

      {/* Main Content */}
      <div className="relative h-full container mx-auto px-6 lg:px-12 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center z-10"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xs font-body tracking-wide-elegant uppercase text-muted-foreground mb-6"
          >
            {config.heroSubtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground mb-6 tracking-wide"
          >
            {config.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Clothing crafted to transcend seasons. Each piece tells a story of
            artisanal excellence and sustainable luxury.
          </motion.p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          style={{ scale }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative aspect-[4/5] overflow-hidden rounded-t-lg shadow-elevated"
          >
            <img
              src={config.heroImage}
              alt="Elegant clothing showcase"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground z-20"
        >
          <span className="text-xs font-body tracking-elegant uppercase mb-3">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
