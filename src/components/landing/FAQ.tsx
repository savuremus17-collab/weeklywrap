"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How does the AI generate reports?",
    answer: "WeeklyWrap connects to your existing tools (Notion, GitHub, Stripe, etc.) via API. Our AI then analyzes your activity, identifies key milestones, and drafts a narrative summary that highlights your impact.",
  },
  {
    question: "Can I customize the branding of my reports?",
    answer: "Yes! Pro and Agency users can upload their own logos, choose custom color schemes, and even host reports on their own subdomains.",
  },
  {
    question: "What platforms do you support?",
    answer: "We currently support direct integrations with Notion, GitHub, Linear, Stripe, Google Analytics, and Slack. We're adding new integrations every week.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade encryption and never sell your data. You have full control over what data WeeklyWrap can access and can revoke permissions at any time.",
  },
  {
    question: "Do you offer a free trial for the Pro plan?",
    answer: "Yes, we offer a 14-day free trial for our Pro plan so you can experience all the premium features before committing.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers. If you can't find what you're looking for, 
            reach out to our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border bg-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <span className="font-bold text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <Minus size={20} className="text-primary" />
                ) : (
                  <Plus size={20} className="text-muted-foreground" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
