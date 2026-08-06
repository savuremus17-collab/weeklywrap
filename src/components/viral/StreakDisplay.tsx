'use client';

import React from 'react';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface StreakDisplayProps {
  days: number;
}

export const StreakDisplay = ({ days }: StreakDisplayProps) => {
  return (
    <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut"
        }}
      >
        <Flame className="h-5 w-5 text-orange-500 fill-orange-500" />
      </motion.div>
      <span className="font-bold text-orange-500">{days} Week Streak!</span>
    </div>
  );
};
