import { Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alexmarfo.dev';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Alex Marfo Appiah — Backend Engineer',
    template: '%s — Alex Marfo Appiah',
  },
  description:
    'Backend engineer specializing in Node.js, Express, and building production-grade APIs. View my projects, skills, and get in touch.',
  keywords: ['backend engineer', 'Node.js', 'Express', 'API development', 'portfolio', 'Alex Marfo Appiah'],
  authors: [{ name: 'Alex Marfo Appiah' }],
  creator: 'Alex Marfo Appiah',
  openGraph: {
    title: 'Alex Marfo Appiah — Backend Engineer',
    description:
      'Backend engineer specializing in Node.js, Express, and building production-grade APIs.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Alex Marfo Appiah',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Marfo Appiah — Backend Engineer',
    description:
      'Backend engineer specializing in Node.js, Express, and building production-grade APIs.',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" style={{ paddingTop: 'var(--nav-height)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
