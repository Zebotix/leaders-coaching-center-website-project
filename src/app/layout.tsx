import type { Metadata, Viewport } from 'next';
import { Dosis, Inter, Merriweather } from 'next/font/google';
import './globals.css';
export const metadata: Metadata = {
  title: {
    default: 'Leaders Coaching Center | Empowering Students for Success',
    template: '%s | Leaders Coaching Center',
  },
  description:
    'Explore our portfolio of educational projects, campus initiatives, and innovative learning solutions at Apna Campus.',
  keywords: [
    'Leaders Coaching Center',
    'Education',
    'Coaching',
    'Student Success',
    'Learning Solutions',
    'Campus Initiatives',
    'Educational Projects',
    'Academic Excellence',
    'Skill Development',
    'Career Growth',
  ],
  authors: [{ name: 'Khashif' }],
  creator: 'Muhammad Zeeshan Khan',
  publisher: 'Leaders Coaching Centers',
  metadataBase: new URL('https://leaderscoachingcenter.vercel.app'),
  alternates: {
    canonical: '/',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://leaderscoachingcenter.vercel.app',
    siteName: 'Leaders Coaching Center',
    title: 'Leaders Coaching Center | Empowering Students for Success',
    description:
      'Explore our portfolio of educational projects, campus initiatives, and innovative learning solutions at Leaders Coaching Center.',
    images: [
      {
        url: '/logo/favicon.png', // Replace with actual Open Graph image
        width: 1200,
        height: 630,
        alt: 'Leaders Coaching Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leaders Coaching Center | Empowering Students for Success',
    description:
      'Explore our portfolio of educational projects, campus initiatives, and innovative learning solutions at Leaders Coaching Center.',
    images: ['/logo/favicon.png'],
    creator: '@LeadersCoachingCenter',
  },
  icons: {
    icon: [
      { url: '/logo/favicon.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/logo/favicon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo/favicon.png',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/site.webmanifest', // Consider adding a webmanifest file
  verification: {
    google: 'n3zhHWv55V2TBqwJtUEVc9-YMIGteykJyrSfCzQ57ck', // Add Google Search Console verification
  },
  category: 'education',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#010101' },
    { media: '(prefers-color-scheme: dark)', color: '#ededed' },
  ],
};

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`modal-scroll ${merriweather.className} ${inter.className} tracking-wider min-h-screen w-screen overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
