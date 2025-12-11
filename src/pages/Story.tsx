import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";

const values = [
  {
    title: "Preserving Heritage",
    description: "We work directly with master weavers in Bonwire and artisans across Ghana to keep traditional techniques alive for future generations.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&auto=format&fit=crop",
  },
  {
    title: "Empowering Communities",
    description: "Every purchase supports Ghanaian artisans and their families, providing fair wages and sustainable livelihoods.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
  },
  {
    title: "Modern African Elegance",
    description: "We blend centuries-old craftsmanship with contemporary design, creating pieces that honor tradition while embracing the future.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop",
  },
];

const timeline = [
  { year: "2019", title: "Founded in Accra", description: "Started by Akua Mensah with a vision to bring authentic Ghanaian fashion to the world while supporting local artisans." },
  { year: "2020", title: "First Kente Collection", description: "Launched our debut collection featuring handwoven Kente from Bonwire, Ashanti Region." },
  { year: "2021", title: "Artisan Partnerships", description: "Expanded our network to include weavers from Northern Ghana, bringing Batakari/Fugu to our collections." },
  { year: "2022", title: "International Recognition", description: "Featured at Africa Fashion Week and began shipping to over 30 countries worldwide." },
  { year: "2024", title: "Growing Impact", description: "Now supporting over 50 artisan families across Ghana while expanding our sustainable practices." },
];

export default function Story() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=1920&auto=format&fit=crop"
              alt="Ghanaian artisan weaving"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/40" />
          </div>
          <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-display text-4xl lg:text-6xl font-medium text-background mb-6">
                Our Story
              </h1>
              <p className="text-background/90 text-lg lg:text-xl max-w-2xl mx-auto">
                Celebrating Ghana's rich textile heritage, one thread at a time
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs tracking-wide-elegant uppercase text-primary mb-6"
              >
                Our Mission
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-3xl lg:text-4xl font-medium text-foreground mb-8 leading-relaxed"
              >
                We believe that every piece of cloth tells a story—of culture, of craftsmanship, of community.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground leading-relaxed"
              >
                Afides was born in Accra from a deep love for Ghana's textile heritage. We asked ourselves: 
                how can we share the beauty of Kente, the artistry of Ankara, and the tradition of Batakari 
                with the world while ensuring the artisans who create these masterpieces thrive? 
                Our answer is a fashion house that puts people and heritage at the heart of everything we do.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs tracking-wide-elegant uppercase text-primary text-center mb-16"
            >
              Our Values
            </motion.p>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="text-center"
                >
                  <div className="aspect-square overflow-hidden bg-secondary mb-6">
                    <img
                      src={value.image}
                      alt={value.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-display text-xl font-medium text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs tracking-wide-elegant uppercase text-primary text-center mb-16"
            >
              Our Journey
            </motion.p>
            <div className="max-w-2xl mx-auto">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 pb-12 last:pb-0 border-l border-border"
                >
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-1/2 rounded-full bg-primary" />
                  <span className="text-primary font-medium text-sm">{item.year}</span>
                  <h3 className="font-display text-xl font-medium text-foreground mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="font-display text-2xl lg:text-3xl font-medium text-primary-foreground mb-6 leading-relaxed">
                "Every Kente cloth carries the wisdom of our ancestors. At Afides, 
                we don't just sell clothing—we share stories woven in gold, green, and the spirit of Ghana."
              </p>
              <cite className="text-primary-foreground/80 text-sm tracking-elegant uppercase not-italic">
                — Akua Mensah, Founder
              </cite>
            </motion.blockquote>
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
