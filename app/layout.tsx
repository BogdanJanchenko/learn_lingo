import localFont from 'next/font/local';
import 'modern-normalize';
import './globals.css';

import { Toaster } from 'react-hot-toast';

import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'LearnLingo - Find your perfect language tutor',
  description:
    'Find your personal language tutor online. Filter by language, level and price, and book a free trial lesson.',
  keywords: [
    'language tutor',
    'online language lessons',
    'learn english',
    'find a language teacher',
  ],
  authors: [{ name: 'LearnLingo Team' }],

  openGraph: {
    title: 'LearnLingo - Find your perfect language tutor',
    description:
      'Find a personal language tutor online and start learning today. Experienced teachers, flexible schedule, free trial lesson.',
    url: baseUrl,
    siteName: 'LearnLingo',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LearnLingo - Language tutors',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'LearnLingo - Find your perfect language tutor',
    description:
      'Find a personal language tutor online and start learning today. Experienced teachers, flexible schedule, free trial lesson.',
    images: ['/images/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const roboto = localFont({
  src: [
    {
      path: '../public/fonts/Roboto-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Roboto-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Roboto-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-family',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        <TanStackProvider>
          <ThemeProvider>
            <Toaster position="top-right" />
            <Header />
            {children}
          </ThemeProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
