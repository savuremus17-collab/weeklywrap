"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  BarChart3, 
  Shield, 
  Sparkles, 
  Clock, 
  Smartphone,
  Share2,
  Settings
} from "lucide-react";

const features = [
  {
    title: "AI Report Generation",
    description: "Turn your raw data into professional, client-ready reports in seconds using advanced AI models.",
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    title: "Deep Analytics",
    description: "Visualize your growth with interactive charts and gain insights into your performance trends.",
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
  },
  {
    title: "Client-Ready Branding",
    description: "White-label your reports with your own logo, colors, and custom domains for a premium feel.",
    icon: <Shield className="w-6 h-6 text-primary" />,
  },
  {
    title: "AI Insights",
    description: "Our AI doesn't just show data; it tells you what to do next to optimize your productivity.",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
  },
  {
    title: "Time Tracking Sync",
    description: "Automatically sync with your favorite time tracking tools to include billable hours in reports.",
    icon: <Clock className="w-6 h-6 text-primary" />,
  },
  {
    title: "Mobile Optimized",
    description: "Access your dashboard and reports on the go with our fully responsive mobile experience.",
    icon: <Smartphone className="w-6 h-6 text-primary" />,
  },
  {
    title: "One-Click Sharing",
    description: "Share reports via secure links or export to PDF, CSV, and PNG with a single click.",
    icon: <Share2 className="w-6 h-6 text-primary" />,
  },
  {
    title: "Custom Automations",
    description: "Set up recurring reports that go out to your clients automatically every Monday morning.",
    icon: <Settings className="w-6 h-6 text-primary" />,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Everything you need to <span className="text-primary">supercharge</span> your reporting
          </h2>
          <p className="text-lg text-muted-foreground">
            Stop wasting hours on manual spreadsheets. WeeklyWrap automates the boring stuff 
            so you can focus on what actually moves the needle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
