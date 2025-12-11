import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const materials = [
  {
    id: "organic-cotton",
    name: "Organic Cotton",
    code: "M1",
    description:
      "GOTS certified organic cotton, grown without synthetic pesticides or fertilizers. Softer, stronger, and kinder to your skin.",
    origin: "Izmir, Turkey",
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "merino-wool",
    name: "Merino Wool",
    code: "M2",
    description:
      "Ethically sourced New Zealand merino. Temperature regulating, naturally odor-resistant, and incredibly soft against the skin.",
    origin: "Canterbury, New Zealand",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "japanese-linen",
    name: "Japanese Linen",
    code: "M3",
    description:
      "Heritage-quality linen from artisan mills. Each wash adds character, becoming softer and more beautiful with time.",
    origin: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2032&auto=format&fit=crop",
  },
];

export const Materials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeMaterial, setActiveMaterial] = useState(materials[0]);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section ref={ref} className="py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-body tracking-wide-elegant uppercase text-primary mb-4 block">
            Material Transparency
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
            Inspect the <span className="italic">Fabric</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            We have nothing to hide. Every material is traceable, sustainable,
            and chosen for its exceptional quality.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Material Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <motion.img
                key={activeMaterial.id}
                src={activeMaterial.image}
                alt={activeMaterial.name}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: isHovering ? 1.05 : 1 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />

              {/* Hover Magnify Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovering ? 1 : 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-24 h-24 rounded-full border-2 border-card/50 flex items-center justify-center backdrop-blur-sm bg-foreground/10">
                  <span className="text-xs font-body tracking-elegant uppercase text-card">
                    Magnify
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Material Code Badge */}
            <motion.div
              key={activeMaterial.code}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-elevated"
            >
              <span className="font-display text-lg font-medium">
                {activeMaterial.code}
              </span>
            </motion.div>
          </motion.div>

          {/* Material Selection */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {materials.map((material, index) => (
              <motion.button
                key={material.id}
                onClick={() => setActiveMaterial(material)}
                className={`w-full text-left p-6 rounded-sm border transition-all duration-300 ${
                  activeMaterial.id === material.id
                    ? "border-primary bg-sage-50 shadow-soft"
                    : "border-border hover:border-sage-300 bg-transparent"
                }`}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-body tracking-elegant uppercase text-muted-foreground">
                      {material.code}
                    </span>
                    <h3 className="font-display text-xl font-medium text-foreground">
                      {material.name}
                    </h3>
                  </div>
                  <span className="text-xs font-body text-muted-foreground">
                    {material.origin}
                  </span>
                </div>
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeMaterial.id === material.id ? "auto" : 0,
                    opacity: activeMaterial.id === material.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-body text-sm text-muted-foreground leading-relaxed overflow-hidden"
                >
                  {material.description}
                </motion.p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
