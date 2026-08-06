"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { PremiumButton } from "@/components/ui/premium/premium-button"
import { 
  BarChart3, 
  Menu, 
  X, 
  Sparkles
} from "lucide-react"
import { useState, useEffect } from "react"
import { MobileNav } from "./mobile-nav"

const navItems = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Showcase", href: "#showcase" },
  { name: "FAQ", href: "#faq" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-border py-3" 
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-linear-to-br from-blue-500 to-blue-700 p-2 rounded-lg text-white">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Weekly<span className="text-blue-500">Wrap</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Log in
            </Link>
            <PremiumButton variant="premium" size="sm" asChild>
              <Link href="/signup">
                Get Started
                <Sparkles className="ml-2 w-4 h-4" />
              </Link>
            </PremiumButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <MobileNav 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        navItems={navItems} 
      />
    </nav>
  )
}
