'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/premium/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check, Gift } from 'lucide-react';

export const ReferralWidget = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "WEEKLYWRAP-50"; // Mock referral code

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://weeklywrap.ai?ref=${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassCard className="p-6 border-indigo-500/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
          <Gift className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold">Refer a Friend</h3>
          <p className="text-xs text-muted-foreground">Give 1 month free, get 1 month free.</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Input 
          readOnly 
          value={`weeklywrap.ai?ref=${referralCode}`}
          className="bg-background/50 text-xs"
        />
        <Button size="icon" onClick={copyToClipboard} variant="outline">
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </GlassCard>
  );
};
