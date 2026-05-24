'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ShareToTwitterProps {
  text: string;
  url: string;
}

export const ShareToTwitter = ({ text, url }: ShareToTwitterProps) => {
  const handleShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleShare}
      className="bg-black text-white hover:bg-black/90 border-none gap-2"
    >
      <ExternalLink className="h-4 w-4 fill-current" />
      Post to X
    </Button>
  );
};
