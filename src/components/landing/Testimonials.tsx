"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Freelance Designer",
    content: "WeeklyWrap has completely changed my client reporting. What used to take me 3 hours every Friday now happens automatically. My clients are blown away by the depth of insights.",
    avatar: "AR",
  },
  {
    name: "Sarah Chen",
    role: "Tech YouTuber",
    content: "As a creator, tracking growth across 5 platforms was a nightmare. WeeklyWrap pulls it all together into one beautiful dashboard. It's the first thing I check every Monday.",
    avatar: "SC",
  },
  {
    name: "Jordan Smith",
    role: "Agency Founder",
    content: "The white-labeling features are elite. We've replaced our manual reporting team with WeeklyWrap and our clients haven't noticed a thing — except that the reports look better now.",
    avatar: "JS",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Loved by <span className="text-primary">thousands</span> of professionals
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our community of 
            freelancers and creators have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-border bg-card flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-8 italic">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
