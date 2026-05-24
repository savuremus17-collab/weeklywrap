'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementBadgeProps {
  name: string;
  description: string;
  icon?: React.ReactNode;
  isLocked?: boolean;
  className?: string;
}

export const AchievementBadge = ({
  name,
  description,
  icon = <Trophy className="h-5 w-5" />,
  isLocked = false,
  className,
}: AchievementBadgeProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn(
        "flex flex-col items-center p-4 rounded-xl border transition-all duration-300",
        isLocked 
          ? "bg-secondary/20 border-border opacity-50 grayscale" 
          : "bg-primary/5 border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)]",
        className
      )}
    >
      <div className={cn(
        "p-3 rounded-full mb-3",
        isLocked ? "bg-muted" : "bg-primary/10 text-primary"
      )}>
        {icon}
      </div>
      <h4 className="font-semibold text-sm mb-1">{name}</h4>
      <p className="text-[10px] text-center text-muted-foreground">{description}</p>
    </motion.div>
  );
};
