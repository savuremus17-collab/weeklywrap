'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/premium/glass-card';
import { GradientText } from '@/components/ui/premium/gradient-text';
import { Button } from '@/components/ui/button';
import { Share2, Download } from 'lucide-react';

interface ShareCardProps {
  title: string;
  summary: string;
  score: number;
}

export const ShareCard = ({ title, summary, score }: ShareCardProps) => {
  return (
    <GlassCard className="p-6 max-w-md border-primary/20">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <GradientText className="text-xl font-bold">{title}</GradientText>
          <div className="bg-primary/10 rounded-full px-3 py-1 border border-primary/20">
            <span className="text-primary font-bold">{score}/100</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {summary}
        </p>
        <div className="pt-4 flex gap-3">
          <Button size="sm" className="flex-1 gap-2">
            <Share2 className="h-4 w-4" />
            Share Report
          </Button>
          <Button size="sm" variant="outline" className="flex-1 gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};
