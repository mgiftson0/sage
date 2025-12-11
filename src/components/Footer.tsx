import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Collections", href: "/collections" },
    { name: "Kente", href: "/collections" },
    { name: "Ankara", href: "/collections" },
  ],
  about: [
    { name: "Our Story", href: "/story" },
    { name: "Our Artisans", href: "/story" },
    { name: "Journal", href: "/journal" },
    { name: "Careers", href: "/contact" },
  ],
  help: [
    { name: "Contact Us", href: "/contact" },
    { name: "Shipping & Returns", href: "/contact" },
    { name: "Size Guide", href: "/contact" },
    { name: "FAQ", href: "/contact" },
  ],
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Youtube", icon: Youtube, href: "#" },
];

export const Footer = () => {
  return (
    <footer className="bg-sage-800 text-sage-100">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display text-3xl font-semibold tracking-wide text-card">
                AFIDES
              </span>
            </Link>
            <p className="font-body text-sage-300 text-sm leading-relaxed max-w-sm mb-4">
              Authentic Ghanaian fashion celebrating our rich textile heritage. 
              Handcrafted by master artisans in Accra, Bonwire, and beyond.
            </p>
            <p className="font-body text-sage-400 text-xs mb-8">
              12 Oxford Street, Osu, Accra, Ghana
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-sage-700 hover:bg-primary text-sage-200 hover:text-primary-foreground rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg text-card mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="font-body text-sm text-sage-300 hover:text-card transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-card mb-6">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="font-body text-sm text-sage-300 hover:text-card transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-card mb-6">Help</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="font-body text-sm text-sage-300 hover:text-card transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-sage-700">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-sage-400">
            <p className="font-body mb-4 md:mb-0">
              © {new Date().getFullYear()} Afides Ghana. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/contact" className="font-body hover:text-card transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="font-body hover:text-card transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
