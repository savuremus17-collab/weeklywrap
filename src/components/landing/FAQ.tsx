"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is WeeklyWrap?",
    answer:
      "WeeklyWrap is an AI-powered platform that automatically generates beautiful weekly reports, client summaries, and productivity insights — saving you hours of manual work every week.",
  },
  {
    question: "How much does WeeklyWrap cost?",
    answer:
      "One plan, every feature included: $15/month, or $149/year (about 2 months free). No free tier, no hidden add-ons — just pick monthly or yearly.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel anytime. There are no long-term contracts or cancellation fees. Your plan stays active until the end of the billing period.",
  },
  {
    question: "How does the AI generate reports?",
    answer:
      "WeeklyWrap connects to your tools and data sources, analyzes your week's activity, and uses AI to generate structured, professional reports in minutes. No manual input needed.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption and never share your data with third parties. Your data is yours — always.",
  },
  {
    question: "Can I use WeeklyWrap for my clients?",
    answer:
      "Yes! WeeklyWrap is built specifically for freelancers, consultants, and small agencies who want to send professional weekly reports to their clients.",
  },
  {
    question: "Do you offer refunds?",
    answer:
       "Due to the nature of our service — AI-generated reports consume real computing resources on every request — we are unable to offer refunds. Each report generation incurs direct AI processing costs on our end. You can cancel anytime, so there's no risk of being locked in.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about WeeklyWrap.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border border-border rounded-xl overflow-hidden bg-card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-sm md:text-base pr-4">
                  {faq.question}
                </span>
                <span className="text-primary shrink-0">
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
