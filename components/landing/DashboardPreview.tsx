"use client";

import { motion } from "framer-motion";

export const DashboardPreview = () => {
  return (
    <section className="py-24 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                A dashboard that actually <span className="text-primary">helps</span> you work
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                WeeklyWrap isn't just for reports. It's your central hub for productivity. 
                See exactly where your time is going and identify bottlenecks before they 
                derail your week.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Real-time activity syncing from 20+ tools",
                  "AI-powered project categorization",
                  "Automated billable hour calculations",
                  "Collaborative client workspace",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                      ✓
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                alt="Dashboard Preview" 
                className="w-full h-auto opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              
              {/* Floating Stat Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-8 p-4 rounded-xl bg-background border border-border shadow-xl hidden md:block"
              >
                <div className="text-xs text-muted-foreground mb-1">Weekly Output</div>
                <div className="text-xl font-bold text-primary">+24%</div>
              </motion.div>

              {/* Floating Activity Card */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 -right-8 p-4 rounded-xl bg-background border border-border shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <div className="w-4 h-4 bg-blue-500 rounded-sm" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">New Integration</div>
                    <div className="text-[10px] text-muted-foreground">Linear connected</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
