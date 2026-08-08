'use client';
import React from 'react';

export default function AdminSubscriptions() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscriptions Management</h1>
        <p className="text-muted-foreground">Overview of platform subscriptions.</p>
      </div>
      <div className="bg-card/50 border border-border rounded-xl p-12 text-center">
        <p className="text-muted-foreground italic">Module data loading...</p>
      </div>
    </div>
  );
}
