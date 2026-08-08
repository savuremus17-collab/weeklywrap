import { Metadata } from 'next';

const siteConfig = {
  name: 'WeeklyWrap',
  description: 'Automatically generate beautiful client reports, productivity summaries and AI insights in minutes. The #1 weekly reporting tool for freelancers, creators and agencies. Free plan available.',
  url: 'https://theweeklywrap.online',
  ogImage: 'https://theweeklywrap.online/og-image.jpg',
  keywords: [
    // Core product keywords
    'weekly report generator',
    'automated client reports',
    'AI weekly reports',
    'automatic report generator',
    'client reporting tool',
    // Audience keywords
    'freelancer reporting tool',
    'agency reporting software',
    'content creator analytics',
    'productivity tracker for freelancers',
    // Problem-based keywords
    'automate weekly reports',
    'save time on client reports',
    'weekly summary generator',
    'AI productivity report',
    'weekly client update tool',
    // Long tail keywords
    'how to automate client reporting',
    'best tool for weekly reports',
    'AI report generator for freelancers',
    'weekly wrap up generator',
    'automated weekly summary for clients',
  ],
  links: {
    twitter: 'https://twitter.com/weeklywrap',
    github: 'https://github.com/weeklywrap',
  },
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: {
      default: `${siteConfig.name} — AI-Powered Weekly Reports for Freelancers & Agencies`,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: 'WeeklyWrap', url: siteConfig.url }],
    creator: 'WeeklyWrap',
    openGraph: {
      title: `${siteConfig.name} — Your Week, Wrapped by AI`,
      description,
      images: [{ url: image }],
      type: 'website',
      siteName: siteConfig.name,
      url: siteConfig.url,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteConfig.name} — AI Weekly Reports`,
      description,
      images: [image],
      creator: '@weeklywrap',
      site: '@weeklywrap',
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: { index: false, follow: false },
    }),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: siteConfig.url,
    },
    verification: {
      google: 'reJign_qKd0wbMhzZTOBeDpcLbLBtmH1lE99GkoX-TY',
    },
  };
}
