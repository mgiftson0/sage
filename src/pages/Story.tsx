import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";

const values = [
  {
    title: "Sustainable Sourcing",
    description: "We partner with certified organic farms and mills that share our commitment to environmental stewardship.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&auto=format&fit=crop",
  },
  {
    title: "Ethical Production",
    description: "Every garment is crafted in fair-wage facilities where artisans are valued and respected.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
  },
  {
    title: "Timeless Design",
    description: "We create pieces meant to transcend seasons, becoming cherished parts of your wardrobe for years.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop",
  },
];

const timeline = [
  { year: "2018", title: "The Beginning", description: "Founded with a vision to create clothing that respects both people and planet." },
  { year: "2019", title: "First Collection", description: "Launched our debut collection featuring organic linens and sustainable cottons." },
  { year: "2020", title: "Carbon Neutral", description: "Achieved carbon neutrality across all operations and shipping." },
  { year: "2022", title: "B Corp Certified", description: "Joined the community of businesses meeting the highest standards of social and environmental performance." },
  { year: "2024", title: "Today", description: "Continuing to push boundaries in sustainable fashion while serving customers worldwide." },
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
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&auto=format&fit=crop"
              alt="Our story"
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
                A journey towards mindful fashion, crafted with purpose
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
                We believe that beautiful clothing should never come at the cost of our planet or its people.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground leading-relaxed"
              >
                Afides was born from a simple question: what if fashion could be both elegant and ethical? 
                We set out to prove that sustainability and style aren't mutually exclusive—they're essential partners 
                in creating clothing that you can feel truly good about wearing.
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
                "Fashion is not just about looking good—it's about feeling good about the choices we make. 
                At Afides, every thread tells a story of care, craft, and consciousness."
              </p>
              <cite className="text-primary-foreground/80 text-sm tracking-elegant uppercase not-italic">
                — Elena Chen, Founder
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