import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";

const featuredPost = {
  id: "1",
  title: "The Art of Kente Weaving: A Journey to Bonwire",
  excerpt: "Discover the ancient craft of Kente weaving in the Ashanti Region, where master artisans create threads of gold and heritage.",
  category: "Heritage",
  date: "December 8, 2024",
  readTime: "5 min read",
  image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&auto=format&fit=crop",
};

const posts = [
  {
    id: "2",
    title: "Meet Our Artisans: The Hands Behind Your Kente",
    excerpt: "A behind-the-scenes look at the skilled craftspeople in Bonwire who bring our designs to life.",
    category: "People",
    date: "December 1, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Understanding Adinkra Symbols in Fashion",
    excerpt: "Learn the meanings behind the ancient Akan symbols and how to wear them with intention.",
    category: "Culture",
    date: "November 24, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Styling Ankara for Every Occasion",
    excerpt: "From office to owambe, learn how to style African print for any event.",
    category: "Style Guide",
    date: "November 15, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "The History of Batakari: Northern Ghana's Pride",
    excerpt: "Exploring the rich tradition of hand-woven smocks from Tamale and Bolgatanga.",
    category: "Heritage",
    date: "November 8, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Caring for Your Kente: Tips for Longevity",
    excerpt: "Preserve your investment with these expert tips on maintaining handwoven textiles.",
    category: "Care Guide",
    date: "October 30, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&auto=format&fit=crop",
  },
];

const categories = ["All", "Heritage", "Culture", "Style Guide", "People", "Care Guide"];

export default function Journal() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 lg:pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl lg:text-5xl font-medium text-foreground mb-4">
              Journal
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Stories of Ghanaian craftsmanship, culture, and the art of African fashion
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`px-5 py-2 text-sm font-medium tracking-elegant uppercase transition-colors ${
                  category === "All"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Featured Post */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <Link to={`/journal/${featuredPost.id}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div>
                  <span className="text-xs tracking-wide-elegant uppercase text-primary mb-4 block">
                    {featuredPost.category}
                  </span>
                  <h2 className="font-display text-3xl lg:text-4xl font-medium text-foreground mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Posts Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link to={`/journal/${post.id}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-secondary mb-5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-xs tracking-wide-elegant uppercase text-primary mb-3 block">
                    {post.category}
                  </span>
                  <h3 className="font-display text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <button className="border border-border px-8 py-4 text-sm font-medium tracking-elegant uppercase text-foreground hover:bg-secondary transition-colors">
              Load More
            </button>
          </div>
        </div>

        <div className="mt-20">
          <Newsletter />
        </div>
      </main>

      <Footer />
    </div>
  );
}
