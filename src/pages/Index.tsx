import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Collections } from "@/components/Collections";
import { Materials } from "@/components/Materials";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Lookbook } from "@/components/Lookbook";
import { Story } from "@/components/Story";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Collections />
        <Materials />
        <FeaturedProducts />
        <Lookbook />
        <Story />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
