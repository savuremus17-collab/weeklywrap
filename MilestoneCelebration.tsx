'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/premium/glass-card';
import { GradientText } from '@/components/ui/premium/gradient-text';
import { Button } from '@/components/ui/button';
import { Trophy, Star, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MilestoneCelebrationProps {
  milestone: string;
  description: string;
  onClose: () => void;
}

export const MilestoneCelebration = ({ milestone, description, onClose }: MilestoneCelebrationProps) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#8b5cf6', '#ec4899']
    });
  };

  React.useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <GlassCard className="max-w-md p-8 text-center relative border-primary/30 shadow-[0_0_50px_rgba(var(--primary),0.2)]">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
              />
              <div className="relative bg-primary/10 p-5 rounded-full border border-primary/20">
                <Trophy className="h-12 w-12 text-primary" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 bg-yellow-500 p-1.5 rounded-full"
              >
                <Star className="h-4 w-4 text-white fill-white" />
              </motion.div>
            </div>
          </div>

          <GradientText className="text-3xl font-black mb-2 uppercase tracking-tighter">
            Milestone Reached!
          </GradientText>
          
          <h3 className="text-xl font-bold mb-3">{milestone}</h3>
          <p className="text-muted-foreground mb-8 text-sm">
            {description}
          </p>

          <div className="space-y-3">
            <Button className="w-full font-bold" onClick={triggerConfetti}>
              Celebrate Again
            </Button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Dismiss
            </Button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
