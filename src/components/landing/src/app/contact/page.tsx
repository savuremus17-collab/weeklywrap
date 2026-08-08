"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
    } catch (error) {
      alert(
        "Something went wrong. Please try again or email us directly at weeklywrapsupport@gmail.com"
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a] px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 border border-indigo-500/30">
            <Mail className="h-5 w-5 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Contact us</h1>
        </div>
        <p className="text-sm text-white/40 mb-8 leading-relaxed">
          Have a question or feedback? Send us a message and we&apos;ll get
          back to you within 24 hours.
        </p>

        {/* Success state */}
        {sent ? (
          <div className="flex flex-col items-center text-center py-14 bg-white/3 border border-white/8 rounded-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 border border-green-500/30 mb-4">
              <Check className="h-8 w-8 text-green-400" />
            </div>
            <p className="text-white font-semibold text-lg mb-1">Message sent!</p>
            <p className="text-white/40 text-sm">
              We&apos;ll get back to you as soon as possible.
            </p>
            <Link
              href="/"
              className="mt-6 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        ) : (
          // Form
          <form
            onSubmit={handleSubmit}
            className="bg-white/3 border border-white/8 rounded-2xl p-8 space-y-5"
          >
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-white/70 mb-1.5 block">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-white/70 mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-white/70 mb-1.5 block">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="How can we help you?"
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {sending ? "Sending..." : "Send message"}
            </button>

            <p className="text-center text-white/25 text-xs">
              Or email us directly at{" "}
              <a
                href="mailto:weeklywrapsupport@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                weeklywrapsupport@gmail.com
              </a>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
