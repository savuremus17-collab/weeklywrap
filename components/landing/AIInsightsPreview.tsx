"use client";

import { motion } from "framer-motion";
import { Sparkles, Brain, Cpu, MessageSquareText } from "lucide-react";

export const AIInsightsPreview = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Sentiment Analysis",
                desc: "AI detects the tone of your client communications to ensure satisfaction.",
                icon: <MessageSquareText className="w-5 h-5 text-primary" />,
              },
              {
                title: "Predictive Forecasting",
                desc: "Know where your metrics are heading before they get there.",
                icon: <Brain className="w-5 h-5 text-primary" />,
              },
              {
                title: "Automated Summaries",
                desc: "Turn 40 hours of work into a 2-paragraph highlight reel.",
                icon: <Cpu className="w-5 h-5 text-primary" />,
              },
              {
                title: "Actionable Advice",
                desc: "Specific recommendations to improve your efficiency next week.",
                icon: <Sparkles className="w-5 h-5 text-primary" />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                <Sparkles size={14} /> AI Powered
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Not just data. <span className="text-primary">Intelligence.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Raw data is overwhelming. WeeklyWrap uses advanced AI to distill your 
                activity into meaningful insights that you can actually use. 
                It's like having a chief of staff for your freelance business.
              </p>
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 italic text-primary/80">
                "WeeklyWrap identified that I was spending 40% of my time on non-billable 
                admin tasks. By automating these, I've increased my monthly revenue by $2,400."
                <div className="mt-4 not-italic font-bold text-foreground">— Marcus T., Developer</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
