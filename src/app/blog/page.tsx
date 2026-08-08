import React from 'react';
import { getSortedPostsData, getCategories } from '@/lib/blog';
import { BlogCard } from '@/components/blog/blog-card';
import Link from 'next/link';

export default async function BlogIndexPage() {
  const allPosts = await getSortedPostsData();
  const categories = await getCategories();
  const featuredPost = allPosts[0];
  const remainingPosts = allPosts.slice(1);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section with Featured Post */}
      {featuredPost && (
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <Link href={`/blog/${featuredPost.slug}`} className="block overflow-hidden rounded-2xl bg-gray-100 aspect-[16/10] relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg font-medium">
                {featuredPost.category}
              </div>
            </Link>
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-2 text-sm font-semibold text-blue-600 uppercase tracking-wider">
                <span>Featured</span>
                <span>•</span>
                <span>{featuredPost.category}</span>
              </div>
              <Link href={`/blog/${featuredPost.slug}`}>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight hover:text-blue-600 transition-colors">
                  {featuredPost.title}
                </h1>
              </Link>
              <p className="text-xl text-gray-600 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{featuredPost.author}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Bar */}
      <section className="mb-12 border-y border-gray-100 py-6">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <Link href="/blog" className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium">
            All Posts
          </Link>
          {categories.map((category) => (
            <Link 
              key={category} 
              href={`/blog/category/${category.toLowerCase()}`}
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* Grid of Posts */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {remainingPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mt-32 bg-black rounded-3xl p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Stay ahead of the curve</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Join 5,000+ creators and professionals receiving our weekly guide to AI productivity and client reporting.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="flex-1 px-6 py-4 rounded-full bg-gray-900 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
