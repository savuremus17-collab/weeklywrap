"use client";
import { motion } from "framer-motion";
import { 
  Zap, 
  BarChart3, 
  Shield, 
  Sparkles, 
  Send,
  Smartphone,
  Share2,
  User
} from "lucide-react";

const features = [
  {
    title: "AI Report Generation",
    description: "Turn your weekly work into professional, client-ready reports in seconds. No blank page. No formatting. Just review and send.",
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    title: "Performance Analytics",
    description: "Visualize your weekly output with interactive charts — tasks completed, hours logged, quality scores, and productivity trends.",
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
  },
  {
    title: "Custom Branding per Client",
    description: "Send reports with your own logo and colors. Every client gets a branded experience that looks like you built it from scratch.",
    icon: <Shield className="w-6 h-6 text-primary" />,
  },
  {
    title: "AI Insights & Recommendations",
    description: "WeeklyWrap doesn't just show data — it tells you when your productivity peaks, what patterns to leverage, and what to improve.",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
  },
  {
    title: "One-Click Email Delivery",
    description: "Send the report directly to your client's inbox with one click. Real email delivery via Resend — no copy-paste, no attachments.",
    icon: <Send className="w-6 h-6 text-primary" />,
  },
  {
    title: "Mobile Friendly",
    description: "Access your dashboard and reports from any device. Fully responsive — works on desktop, tablet, and mobile.",
    icon: <Smartphone className="w-6 h-6 text-primary" />,
  },
  {
    title: "Client Portal",
    description: "Every client gets a private link with their full report history. No login needed. No more 'can you resend that report?' emails.",
    icon: <Share2 className="w-6 h-6 text-primary" />,
  },
  {
    title: "Profile & Preferences",
    description: "Set your timezone, currency, notifications, and avatar. WeeklyWrap adapts to how you work — not the other way around.",
    icon: <User className="w-6 h-6 text-primary" />,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Everything freelancers need to send{" "}
            <span className="text-primary">professional client reports</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Stop wasting Friday afternoons on manual updates. WeeklyWrap generates,
            brands, and delivers your client reports automatically.
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
