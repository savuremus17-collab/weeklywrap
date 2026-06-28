"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="https://buy.stripe.com/test_bJecN6cRPd6qdzgg248Zq05"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-0 left-0 right-0 z-50 block w-full bg-primary text-primary-foreground text-center text-sm font-medium py-2 px-4 hover:bg-primary/90 transition-colors"
      >
        <span className="flex items-center justify-center gap-2">
          <Zap size={14} />
          <span>
            <strong>Founding Member Deal</strong> — Lifetime access for $79 (was $499). Only <strong>12 spots</strong> left.
          </span>
          <span className="underline ml-1">Claim yours →</span>
        </span>
      </a>

      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a1a]/95 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
        style={{ top: "36px" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              WeeklyWrap
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "Pricing", "Testimonials", "FAQ"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-white/70 hover:text-white text-sm transition-colors hidden md:block"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
