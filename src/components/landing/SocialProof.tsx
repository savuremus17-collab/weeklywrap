"use client";

// ─── SocialProof ─────────────────────────────────────────────────────────────
export function SocialProof() {
  const stats = [
    { value: "2M+", label: "Reports Generated" },
    { value: "500k+", label: "Hours Saved" },
    { value: "50k+", label: "Happy Creators" },
    { value: "12x", label: "ROI for Agencies" },
  ];

  const logos = ["Vercel", "Stripe", "Notion", "Figma", "Airbnb"];

  return (
    <section className="bg-[#0a0a1a] border-y border-white/5 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Logos */}
        <p className="text-center text-white/30 text-xs font-medium tracking-widest uppercase mb-8">
          Trusted by innovators at world-class companies
        </p>
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-white/20 font-semibold text-lg tracking-tight hover:text-white/40 transition-colors"
            >
              {logo}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-white/40 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ProductDemo ──────────────────────────────────────────────────────────────
export function ProductDemo() {
  return (
    <section id="demo" className="bg-[#0a0a1a] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            See It In Action
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            From messy data to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              polished report
            </span>
            {" "}in 3 steps
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Connect your tools, let AI do the work, send to clients. That's it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              icon: "🔌",
              title: "Connect your tools",
              desc: "Plug in Notion, Linear, Toggl, GitHub, and 20+ more. One-click integrations, no code needed.",
              color: "from-indigo-600/20 to-indigo-600/5",
              border: "border-indigo-500/20",
            },
            {
              step: "02",
              icon: "🤖",
              title: "AI writes your report",
              desc: "Our AI reads your activity, pulls the key insights, and writes a professional narrative your clients will love.",
              color: "from-violet-600/20 to-violet-600/5",
              border: "border-violet-500/20",
            },
            {
              step: "03",
              icon: "🚀",
              title: "Send in one click",
              desc: "White-label it with your branding, export as PDF, or auto-send every Monday morning. Done.",
              color: "from-blue-600/20 to-blue-600/5",
              border: "border-blue-500/20",
            },
          ].map((item) => (
            <div
              key={item.step}
              className={`relative bg-gradient-to-b ${item.color} border ${item.border} rounded-2xl p-8`}
            >
              <span className="absolute top-6 right-6 text-white/10 font-bold text-4xl">
                {item.step}
              </span>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-white font-semibold text-xl mb-3">{item.title}</h3>
              <p className="text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Video placeholder */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl aspect-video flex items-center justify-center cursor-pointer group hover:bg-white/8 transition-colors">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-600/40">
              <span className="text-white text-2xl ml-1">▶</span>
            </div>
            <p className="text-white/60 text-sm">Watch the 2-minute demo</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
export function Features() {
  const features = [
    {
      icon: "⚡",
      title: "AI Report Generation",
      desc: "Turn raw activity data into polished, client-ready reports in seconds. No editing required.",
    },
    {
      icon: "📊",
      title: "Deep Analytics",
      desc: "Visualize your growth with interactive charts. Understand exactly where your time goes.",
    },
    {
      icon: "🎨",
      title: "Client-Ready Branding",
      desc: "White-label every report with your logo, colors, and custom domain. Looks like you built it.",
    },
    {
      icon: "🧠",
      title: "AI Insights",
      desc: "We don't just show data — we tell you what to do next to improve your output and revenue.",
    },
    {
      icon: "⏱️",
      title: "Time Tracking Sync",
      desc: "Auto-sync with Toggl, Harvest, Clockify, and more. Billable hours calculated automatically.",
    },
    {
      icon: "📱",
      title: "Mobile Optimized",
      desc: "Access your dashboard and reports from anywhere. Fully responsive on all devices.",
    },
    {
      icon: "🔗",
      title: "One-Click Sharing",
      desc: "Share via secure link, export to PDF or CSV, or embed in your client portal instantly.",
    },
    {
      icon: "🔄",
      title: "Custom Automations",
      desc: "Set it and forget it. Reports auto-send to clients every Monday morning, on your schedule.",
    },
  ];

  return (
    <section id="features" className="bg-[#080816] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Everything You Need
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Supercharge your reporting
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Stop wasting hours on manual spreadsheets. WeeklyWrap automates the
            boring stuff so you can focus on what actually moves the needle.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white/3 hover:bg-white/6 border border-white/8 hover:border-indigo-500/30 rounded-xl p-6 transition-all duration-200 group"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
