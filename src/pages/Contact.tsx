import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "hello@afides.com.gh",
    link: "mailto:hello@afides.com.gh",
  },
  {
    icon: Phone,
    title: "Phone",
    details: "+233 30 277 8899",
    link: "tel:+233302778899",
  },
  {
    icon: MapPin,
    title: "Showroom",
    details: "12 Oxford Street, Osu, Accra, Ghana",
    link: "#",
  },
  {
    icon: Clock,
    title: "Hours",
    details: "Mon-Sat: 9AM-6PM GMT",
    link: "#",
  },
];

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 14-day return policy for all unworn items in their original condition with tags attached. Items must be returned to our Accra showroom or via our partnered courier.",
  },
  {
    question: "How long does delivery take within Ghana?",
    answer: "Within Accra: 1-2 business days. Other regions: 3-5 business days. Express delivery available for same-day delivery within Accra.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes! We ship to over 40 countries. International orders typically arrive within 7-14 business days. Customs and duties may apply.",
  },
  {
    question: "Are your products authentic handwoven?",
    answer: "Absolutely. All our Kente pieces are handwoven by master artisans in Bonwire, Ashanti Region. Each piece comes with a certificate of authenticity.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Mobile Money (MTN, Vodafone Cash, AirtelTigo Money), Visa, Mastercard, and bank transfers. Cash on delivery is available within Accra.",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Medaase! We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

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
              Get in Touch
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We'd love to hear from you. Whether you have a question about our products, 
              need styling advice, or want to visit our Accra showroom.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-display text-2xl font-medium text-foreground mb-8">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="custom">Custom Orders</option>
                    <option value="wholesale">Wholesale Partnership</option>
                    <option value="showroom">Showroom Visit</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground py-4 px-8 font-medium tracking-elegant uppercase text-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>

            {/* Contact Info & FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-12"
            >
              {/* Contact Info */}
              <div>
                <h2 className="font-display text-2xl font-medium text-foreground mb-8">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <a
                      key={info.title}
                      href={info.link}
                      className="flex items-start gap-4 group"
                    >
                      <div className="p-3 bg-secondary text-primary">
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {info.title}
                        </p>
                        <p className="text-muted-foreground text-sm">{info.details}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="font-display text-2xl font-medium text-foreground mb-8">
                  Frequently Asked
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <details key={index} className="group border border-border">
                      <summary className="flex items-center justify-between p-4 cursor-pointer">
                        <span className="font-medium text-foreground pr-4">{faq.question}</span>
                        <span className="text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <p className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
