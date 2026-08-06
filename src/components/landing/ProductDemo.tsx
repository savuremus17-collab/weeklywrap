"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const analyticsData = [
  { name: 'Week 1', followers: 1200, engagement: 400 },
  { name: 'Week 2', followers: 2100, engagement: 700 },
  { name: 'Week 3', followers: 1800, engagement: 600 },
  { name: 'Week 4', followers: 2400, engagement: 800 },
  { name: 'Week 5', followers: 3200, engagement: 1100 },
];

export const ProductDemo = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <section id="demo" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            See WeeklyWrap in <span className="text-primary">Action</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience how we transform your messy work data into a 
            polished narrative that clients and sponsors will love.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center gap-2 mb-8 p-1 bg-muted rounded-xl w-fit mx-auto">
            {["analytics", "reports", "insights"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative rounded-2xl border border-border bg-card overflow-hidden min-h-[400px] shadow-xl">
            <div className="p-8">
              {activeTab === "analytics" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Growth Metrics</h3>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-xs text-muted-foreground">Followers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-400" />
                        <span className="text-xs text-muted-foreground">Engagement</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData}>
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
                        <Line 
                          type="monotone" 
                          dataKey="followers" 
                          stroke="var(--primary)" 
                          strokeWidth={3}
                          dot={{ r: 4, fill: "var(--primary)" }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="engagement" 
                          stroke="#60a5fa" 
                          strokeWidth={3}
                          dot={{ r: 4, fill: "#60a5fa" }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}

              {activeTab === "reports" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Generated Report</h3>
                    <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">Ready to send</div>
                  </div>
                  <div className="space-y-4 max-w-2xl">
                    <div className="h-4 bg-muted rounded-full w-3/4" />
                    <div className="h-4 bg-muted rounded-full w-1/2" />
                    <div className="space-y-2 pt-4">
                      <div className="h-3 bg-muted/50 rounded-full w-full" />
                      <div className="h-3 bg-muted/50 rounded-full w-full" />
                      <div className="h-3 bg-muted/50 rounded-full w-5/6" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-6">
                      <div className="h-20 bg-muted/30 rounded-lg" />
                      <div className="h-20 bg-muted/30 rounded-lg" />
                      <div className="h-20 bg-muted/30 rounded-lg" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "insights" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {[
                    { title: "Peak Performance", desc: "Your content performed 40% better on Tuesday mornings.", icon: "⚡" },
                    { title: "Audience Shift", desc: "15% increase in engagement from the 25-34 demographic.", icon: "👥" },
                    { title: "Content Strategy", desc: "Video content is driving 3x more conversions than static posts.", icon: "🎬" },
                    { title: "Growth Forecast", desc: "On current trends, you'll reach 100k followers by July.", icon: "📈" },
                  ].map((insight, i) => (
                    <div key={i} className="p-6 rounded-xl border border-border bg-background hover:border-primary/30 transition-colors">
                      <div className="text-2xl mb-4">{insight.icon}</div>
                      <h4 className="font-bold mb-2">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.desc}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
