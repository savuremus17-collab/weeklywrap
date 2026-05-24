import { Metadata } from 'next';

const siteConfig = {
  name: 'WeeklyWrap',
  description: 'AI-powered weekly reports and productivity intelligence for creators and professionals.',
  url: 'https://weeklywrap.ai',
  ogImage: 'https://weeklywrap.ai/og-image.jpg',
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
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
      type: 'website',
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@weeklywrap',
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    alternates: {
      canonical: './',
    },
  };
}
