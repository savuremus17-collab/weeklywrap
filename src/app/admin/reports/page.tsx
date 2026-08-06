'use client';
import React from 'react';

export default function AdminReports() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports Management</h1>
        <p className="text-muted-foreground">Overview of platform reports.</p>
      </div>
      <div className="bg-card/50 border border-border rounded-xl p-12 text-center">
        <p className="text-muted-foreground italic">Module data loading...</p>
      </div>
    </div>
  );
}
