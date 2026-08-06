import React from 'react';
import { getPostData, getSortedPostsData } from '@/lib/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const postData = await getPostData(slug);

    return (
      <article className="container mx-auto px-4 py-20 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-12 group">
          <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span>
          Back to all posts
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center space-x-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
            {postData.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {postData.title}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200" />
            <div>
              <p className="text-base font-bold text-gray-900">{postData.author}</p>
              <p className="text-sm text-gray-500">
                {new Date(postData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </header>

        <div 
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-black prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-black prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />

        <footer className="mt-20 pt-10 border-t border-gray-100">
          <div className="bg-gray-50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Automate your weekly reports</h3>
              <p className="text-gray-600">
                Stop wasting hours on manual reporting. Let WeeklyWrap turn your work into stunning reports automatically.
              </p>
            </div>
            <Link href="/" className="px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-gray-900 transition-colors">
              Get Started for Free
            </Link>
          </div>
        </footer>
      </article>
    );
  } catch (e) {
    notFound();
  }
}
