import React from 'react';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold tracking-tight text-black">
            WeeklyWrap <span className="text-gray-400 font-medium">Blog</span>
          </a>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            <a href="/blog" className="hover:text-black">All Posts</a>
            <a href="/#features" className="hover:text-black">Product</a>
            <a href="/#pricing" className="hover:text-black">Pricing</a>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-gray-50 border-t border-gray-100 py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2025 WeeklyWrap. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
