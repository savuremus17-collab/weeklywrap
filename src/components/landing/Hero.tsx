"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 1100 },
];

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Now in public beta
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Your Week. <span className="text-primary">Wrapped by AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl"
          >
            Automatically generate beautiful client reports, creator insights and 
            productivity summaries in minutes. Spend less time reporting and more time creating.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button size="lg" className="h-12 px-8 text-base gap-2">
              Start Free <ArrowRight size={18} />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2">
              <Play size={18} fill="currentColor" /> Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 flex items-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-primary" />
              No credit card required
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-primary" />
              Free forever plan
            </div>
          </motion.div>
        </div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
              </div>
              <div className="text-xs text-muted-foreground font-medium">Weekly Dashboard — May 2024</div>
              <div className="w-12" />
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Stats */}
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-background border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Productivity Score</div>
                  <div className="text-3xl font-bold">92%</div>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1, delay: 1 }}
                      className="h-full bg-primary" 
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-background border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Time Saved</div>
                  <div className="text-3xl font-bold">12.4h</div>
                  <div className="text-xs text-green-500 mt-1">↑ 15% from last week</div>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="text-sm font-semibold text-primary mb-2">AI Insight</div>
                  <p className="text-xs leading-relaxed">
                    You're most productive between 9 AM and 11 AM. Shifting complex tasks to this window could increase output by 20%.
                  </p>
                </div>
              </div>

              {/* Middle & Right Column: Chart */}
              <div className="md:col-span-2 p-6 rounded-lg bg-background border border-border">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm font-semibold">Growth Analytics</div>
                    <div className="text-xs text-muted-foreground">Audience engagement over time</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                  </div>
                </div>
                
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 12, fill: 'rgba(255,255,255,0.4)'}} 
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#09090b', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="var(--primary)" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements for depth */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 md:-right-12 p-4 rounded-xl bg-background border border-border shadow-xl z-10 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Report Ready</div>
                <div className="text-sm font-bold">Weekly Client Summary</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-6 md:-left-12 p-4 rounded-xl bg-background border border-border shadow-xl z-10 hidden md:block"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium">AI Analysis</span>
                <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">Real-time</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [10, 20, 10] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 bg-primary rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
