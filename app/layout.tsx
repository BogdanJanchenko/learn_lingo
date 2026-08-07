import localFont from 'next/font/local';
import 'modern-normalize';
import './globals.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Toaster } from 'react-hot-toast';

import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'TravelTrucks - Campers of your dreams',
  description:
    'You can find everything you want in our catalog. Rent the best camper vans for your perfect road trip.',
  keywords: ['camper rental', 'rent motorhome', 'camper vans', 'road trip', 'rent campers Ukraine'],
  authors: [{ name: 'TravelTrucks Team' }],

  openGraph: {
    title: 'TravelTrucks - Campers of your dreams',
    description:
      'You can find everything you want in our catalog. High-quality camper vans for unforgettable journeys.',
    url: baseUrl, // Теперь ссылка на страницу в OG-тегах тоже динамическая
    siteName: 'TravelTrucks',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TravelTrucks - Premium Camper Vans',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TravelTrucks - Campers of your dreams',
    description:
      'You can find everything you want in our catalog. High-quality camper vans for unforgettable journeys.',
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

const inter = localFont({
  src: [
    {
      path: '../public/fonts/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-family',
});

const manrope = localFont({
  src: [
    {
      path: '../public/fonts/Manrope-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--second-family',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <TanStackProvider>
          <Toaster position="top-right" />
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
