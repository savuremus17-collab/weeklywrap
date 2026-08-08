import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  FileText, 
  BarChart3, 
  Settings,
  ShieldCheck
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, href: '/admin' },
    { label: 'Users', icon: Users, href: '/admin/users' },
    { label: 'Subscriptions', icon: CreditCard, href: '/admin/subscriptions' },
    { label: 'Reports', icon: FileText, href: '/admin/reports' },
    { label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-xl flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-border">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">WeeklyWrap Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors group"
            >
              <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Exit Admin</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
