"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Freelance Designer",
    content: "WeeklyWrap saves me 3 hours every Friday. I generate the report, review it, and send it to the client in minutes. My clients think I have a whole team behind me.",
    avatar: "AR",
  },
  {
    name: "Sarah Chen",
    role: "Marketing Consultant",
    content: "I was skeptical at first. Now I can't imagine going back to writing reports manually. The AI summaries are spot-on and the branded reports look incredibly professional.",
    avatar: "SC",
  },
  {
    name: "Jordan Smith",
    role: "Agency Founder",
    content: "We use WeeklyWrap for all our clients. Custom branding, one-click delivery, client portal — everything our clients need without any manual work on our end.",
    avatar: "JS",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Built for freelancers{" "}
            <span className="text-primary">who value their time</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Here's what early users are saying about WeeklyWrap.
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

        {/* Social proof bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-muted-foreground text-sm">
          <span className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg">⚡</span>
            Setup in under 5 minutes
          </span>
          <span className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg">🔒</span>
            Your data is always secure
          </span>
          <span className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg">💳</span>
            No credit card to start
          </span>
          <span className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg">❌</span>
            Cancel anytime
          </span>
        </div>
      </div>
    </section>
  );
};
