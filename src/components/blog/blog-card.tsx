import React from 'react';
import Link from 'next/link';

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    author: string;
  };
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="group flex flex-col space-y-4">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-xl bg-gray-100 aspect-video relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
          {post.category}
        </div>
      </Link>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-medium text-gray-500">
          <span>{post.category}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
          {post.excerpt}
        </p>
        <div className="pt-2 flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-gray-200" />
          <span className="text-xs font-medium text-gray-900">{post.author}</span>
        </div>
      </div>
    </article>
  );
};
