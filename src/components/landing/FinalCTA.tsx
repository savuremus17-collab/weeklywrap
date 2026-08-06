"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center p-12 md:p-20 rounded-3xl border border-border bg-card/50 backdrop-blur-sm relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              Ready to automate your <span className="text-primary">weekly wrap?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of creators and freelancers who have reclaimed 
              their weekends with WeeklyWrap.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
  <Button size="lg" className="h-14 px-10 text-lg gap-2 w-full sm:w-auto">
    Get Started <ArrowRight size={20} />
  </Button>
  <Button size="lg" variant="outline" className="h-14 px-10 text-lg w-full sm:w-auto">
    View Pricing
  </Button>
</div>
            <p className="mt-8 text-sm text-muted-foreground">
              $15/mo or $149/yr. Cancel anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
