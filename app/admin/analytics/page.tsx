'use client';
import React from 'react';

export default function AdminAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Management</h1>
        <p className="text-muted-foreground">Overview of platform analytics.</p>
      </div>
      <div className="bg-card/50 border border-border rounded-xl p-12 text-center">
        <p className="text-muted-foreground italic">Module data loading...</p>
      </div>
    </div>
  );
}
