"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Send, Check, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error("Failed to send")
      setSent(true)
    } catch (error) {
      alert("Something went wrong. Please try again or email us directly at weeklywrapsupport@gmail.com")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20">
            <Mail className="h-5 w-5 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold">Contact us</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Have a question or feedback? Send us a message and we&apos;ll get back to you soon.
        </p>

        {sent ? (
          <div className="flex flex-col items-center text-center py-12 border border-border rounded-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-3">
              <Check className="h-7 w-7 text-emerald-400" />
            </div>
            <p className="font-medium">Message sent!</p>
            <p className="text-xs text-muted-foreground mt-1">We&apos;ll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm resize-none"
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={sending}>
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {sending ? "Sending..." : "Send message"}
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
