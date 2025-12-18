import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

import { useSiteContent } from "@/context/SiteContentContext";

const Lookbook = () => {
  const { lookbookSeasons } = useSiteContent();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2832&auto=format&fit=crop"
            alt="Lookbook Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-xs font-body tracking-wide-elegant uppercase text-card/80 mb-4 block">
            Oheneba Collection
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-card mb-6">
            The <span className="italic">Lookbook</span>
          </h1>
          <p className="font-body text-card/80 text-lg max-w-xl mx-auto">
            A visual journey through Ghana's rich textile heritage, reimagined for the modern world.
          </p>
        </motion.div>
      </section>

      {/* Seasons */}
      {lookbookSeasons.map((season, seasonIndex) => {
        const sectionRef = useRef(null);
        const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

        return (
          <section key={season.id} ref={sectionRef} className="py-24 lg:py-32">
            <div className="container mx-auto px-6 lg:px-12">
              {/* Season Header */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="mb-16 max-w-2xl"
              >
                <span className="text-xs font-body tracking-wide-elegant uppercase text-primary mb-4 block">
                  {season.season}
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6">
                  {season.title}
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {season.description}
                </p>
              </motion.div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {season.images.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    className={`group relative overflow-hidden rounded-sm cursor-pointer ${item.aspect === "portrait"
                        ? "row-span-2"
                        : item.aspect === "landscape"
                          ? "col-span-2"
                          : ""
                      }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.6 }}
                      className={`relative overflow-hidden ${item.aspect === "portrait"
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
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-display text-lg text-card">
                          {item.title}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Shop Collection Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 text-center"
              >
                <Link
                  to="/collections"
                  className="inline-flex items-center text-sm font-body tracking-elegant uppercase text-primary hover:text-primary/80 transition-colors group"
                >
                  Shop {season.title} Collection
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {seasonIndex < lookbookSeasons.length - 1 && (
              <div className="container mx-auto px-6 lg:px-12 mt-24">
                <div className="h-px bg-border" />
              </div>
            )}
          </section>
        );
      })}

      {/* Behind the Scenes */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-body tracking-wide-elegant uppercase text-primary mb-4 block">
              Behind the Scenes
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6">
              The Making of <span className="italic">Oheneba</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Step inside our Accra atelier and witness the meticulous craftsmanship that brings each piece to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Kente Weaving",
                location: "Bonwire, Ashanti Region",
                image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=2071&auto=format&fit=crop",
              },
              {
                title: "Pattern Making",
                location: "Osu Atelier, Accra",
                image: "https://images.unsplash.com/photo-1558171814-f9e016fc2a99?q=80&w=2071&auto=format&fit=crop",
              },
              {
                title: "Final Touches",
                location: "Labone Studio, Accra",
                image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=2071&auto=format&fit=crop",
              },
            ].map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer"
              >
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-card fill-card ml-1" />
                  </div>
                  <h3 className="font-display text-xl text-card">{video.title}</h3>
                  <p className="text-sm text-card/70">{video.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="font-display text-2xl text-foreground mb-8">Credits</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              <div>
                <p className="text-muted-foreground uppercase tracking-wide mb-2">Photography</p>
                <p className="font-body text-foreground">Kofi Amoako</p>
              </div>
              <div>
                <p className="text-muted-foreground uppercase tracking-wide mb-2">Creative Director</p>
                <p className="font-body text-foreground">Ama Serwaa</p>
              </div>
              <div>
                <p className="text-muted-foreground uppercase tracking-wide mb-2">Styling</p>
                <p className="font-body text-foreground">Nana Yaa Boateng</p>
              </div>
              <div>
                <p className="text-muted-foreground uppercase tracking-wide mb-2">Hair & Makeup</p>
                <p className="font-body text-foreground">Efua Mensah</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Lookbook;
