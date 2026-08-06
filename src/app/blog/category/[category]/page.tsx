import React from 'react';
import { getPostsByCategory, getCategories } from '@/lib/blog';
import { BlogCard } from '@/components/blog/blog-card';
import Link from 'next/link';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);
  const categories = await getCategories();
  const displayCategory = categories.find(c => c.toLowerCase() === category.toLowerCase()) || category;

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-16 text-center">
        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Category</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{displayCategory}</h1>
        
        <div className="flex flex-wrap gap-4 items-center justify-center border-y border-gray-100 py-6">
          <Link href="/blog" className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium transition-colors">
            All Posts
          </Link>
          {categories.map((c) => (
            <Link 
              key={c} 
              href={`/blog/category/${c.toLowerCase()}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                c.toLowerCase() === category.toLowerCase() 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
      </header>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      
      {posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No posts found in this category.</p>
        </div>
      )}
    </div>
  );
}
