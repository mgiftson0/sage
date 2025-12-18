import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export const Materials = () => {
  const { materials } = useSiteContent();

  return (
    <section className="py-24 bg-sage-50">
      <div className="container px-6">
        <div className="max-w-xl mb-16">
          <span className="text-xs font-medium tracking-wider text-sage-600 uppercase mb-4 block">
            Our Materials
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-900 mb-6">
            Consciously Sourced,{" "}
            <span className="italic font-light">Naturally Beautiful</span>
          </h2>
          <p className="text-sage-600 leading-relaxed">
            We believe that true luxury lies in the quality of the materials we use.
            Each fabric is selected not only for its beauty but for its impact on the planet
            and the people who produce it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {materials.map((material) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-sage-200 mb-6">
                <img
                  src={material.image}
                  alt={material.name}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-sage-900/0 group-hover:bg-sage-900/10 transition-colors duration-500" />
              </div>

              <div className="flex items-start justify-between border-b border-sage-200 pb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-sage-400">{material.code}</span>
                    <h3 className="text-xl font-display font-medium text-sage-900">
                      {material.name}
                    </h3>
                  </div>
                  <p className="text-sage-600 text-sm max-w-sm mb-2">
                    {material.description}
                  </p>
                  <p className="text-xs text-sage-500 uppercase tracking-wider">
                    Origin: {material.origin}
                  </p>
                </div>

                <div className="bg-white p-2 rounded-full opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-sage-900" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/philosophy"
            className="inline-flex items-center text-sm font-medium text-sage-900 hover:text-sage-700 transition-colors"
          >
            Read more about our sourcing
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};
