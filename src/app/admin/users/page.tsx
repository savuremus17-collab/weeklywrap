'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/premium/glass-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, MoreVertical } from 'lucide-react';

const users = [
  { id: 1, name: 'Alex Rivera', email: 'alex@example.com', plan: 'Pro', status: 'Active', joined: '2025-05-10' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@example.com', plan: 'Agency', status: 'Active', joined: '2025-05-12' },
  { id: 3, name: 'Marcus Miller', email: 'marcus@example.com', plan: 'Free', status: 'Idle', joined: '2025-05-15' },
  { id: 4, name: 'Elena Gomez', email: 'elena@example.com', plan: 'Pro', status: 'Active', joined: '2025-05-18' },
  { id: 5, name: 'Jordan Smith', email: 'jordan@example.com', plan: 'Agency', status: 'Error', joined: '2025-05-20' },
];

export default function AdminUsers() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Monitor and manage WeeklyWrap users and their status.</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            className="w-full bg-card/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" 
            placeholder="Search users..."
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <GlassCard className="overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="p-4 font-semibold text-sm">User</th>
              <th className="p-4 font-semibold text-sm">Plan</th>
              <th className="p-4 font-semibold text-sm">Status</th>
              <th className="p-4 font-semibold text-sm">Joined</th>
              <th className="p-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm">
                  <Badge variant={user.plan === 'Free' ? 'outline' : 'default'} className="bg-primary/10 text-primary border-primary/20">
                    {user.plan}
                  </Badge>
                </td>
                <td className="p-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${
                      user.status === 'Active' ? 'bg-green-500' : 
                      user.status === 'Error' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    {user.status}
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {user.joined}
                </td>
                <td className="p-4">
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
