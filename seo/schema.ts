export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WeeklyWrap',
    url: 'https://weeklywrap.ai',
    logo: 'https://weeklywrap.ai/logo.png',
    sameAs: [
      'https://twitter.com/weeklywrap',
      'https://github.com/weeklywrap',
    ],
  };
}

export function getBlogPostSchema(post: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'WeeklyWrap',
      logo: {
        '@type': 'ImageObject',
        url: 'https://weeklywrap.ai/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://weeklywrap.ai/blog/${post.slug}`,
    },
  };
}
