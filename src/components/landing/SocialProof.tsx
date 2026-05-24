"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Vercel", url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg" },
  { name: "Stripe", url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  { name: "Notion", url: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  { name: "Figma", url: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
  { name: "Airbnb", url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" },
];

const stats = [
  { label: "Reports Generated", value: "2M+" },
  { label: "Hours Saved", value: "500k+" },
  { label: "Happy Creators", value: "50k+" },
  { label: "ROI for Agencies", value: "12x" },
];

export const SocialProof = () => {
  return (
    <section className="py-20 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by innovators at world-class companies
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo) => (
            <div key={logo.name} className="h-8 w-24 md:w-32 relative flex items-center justify-center">
              {/* Using text for now as we don't have real logos in the repo yet, 
                  but will style them to look like logos */}
              <span className="text-xl font-bold text-foreground">{logo.name}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
