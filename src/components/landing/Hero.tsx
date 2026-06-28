"use client";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a1a] overflow-hidden pt-20">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          <span className="text-indigo-300 text-sm font-medium">
            AI-Powered Weekly Reporting
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6">
          Your Week.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            Wrapped by AI.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
          Stop spending Friday afternoons writing client reports.
          WeeklyWrap generates beautiful, professional summaries in minutes —
          so you can focus on the work that actually pays.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/signup"
            className="group bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 flex items-center gap-2 text-base shadow-lg shadow-indigo-600/30"
          >
            Start Free — No Card Needed
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/40 text-sm">
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Free forever plan
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span> No credit card required
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Setup in under 5 minutes
          </span>
        </div>

        {/* Dashboard preview */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent z-10 pointer-events-none" style={{ top: "60%" }} />
          <div className="bg-white/5 border border-white/10 rounded-2xl p-1 shadow-2xl shadow-black/50">
            <div className="bg-[#0f0f23] rounded-xl p-6">
              {/* Browser bar */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <div className="flex-1 mx-4 bg-white/5 rounded px-3 py-1 text-white/30 text-xs text-center">
                  theweeklywrap.online
                </div>
              </div>
              {/* Mock dashboard content */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { label: "Productivity Score", value: "92%", color: "indigo" },
                  { label: "Time Saved", value: "12.4h", sub: "↑ 15% from last week", color: "violet" },
                  { label: "Reports Sent", value: "8", sub: "this week", color: "blue" },
                ].map((card) => (
                  <div key={card.label} className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/40 text-xs mb-1">{card.label}</p>
                    <p className="text-white font-bold text-2xl">{card.value}</p>
                    {card.sub && <p className="text-green-400 text-xs mt-1">{card.sub}</p>}
                  </div>
                ))}
              </div>
              {/* Chart */}
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/40 text-xs mb-3">Weekly Output</p>
                <div className="flex items-end gap-2 h-16">
                  {[40, 65, 45, 80, 70, 92, 85].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-indigo-500/40 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-white/20 text-xs mt-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
