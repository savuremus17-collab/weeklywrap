"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { PremiumButton } from "@/components/ui/premium/premium-button"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  navItems: { name: string; href: string }[]
}

export function MobileNav({ isOpen, onClose, navItems }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute top-full left-0 right-0 bg-background border-b border-border overflow-hidden md:hidden z-50"
        >
          <div className="flex flex-col gap-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-medium py-2 hover:text-primary transition-colors"
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
            <hr className="border-border" />
            <Link 
              href="/login" 
              className="text-lg font-medium py-2 hover:text-primary transition-colors"
              onClick={onClose}
            >
              Log in
            </Link>
            <PremiumButton variant="premium" className="w-full" asChild>
              <Link href="/signup" onClick={onClose}>
                Get Started
              </Link>
            </PremiumButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
