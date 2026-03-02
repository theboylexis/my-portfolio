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

export const metadata = {
  title: 'Alex Marfo — Junior Backend Engineer',
  description:
    'Junior backend engineer specializing in Node.js, Express, and building production-grade APIs. View my projects, skills, and get in touch.',
  keywords: ['backend engineer', 'Node.js', 'Express', 'API development', 'portfolio'],
  authors: [{ name: 'Alex Marfo' }],
  openGraph: {
    title: 'Alex Marfo — Junior Backend Engineer',
    description:
      'Junior backend engineer specializing in Node.js, Express, and building production-grade APIs.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Alex Marfo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Marfo — Junior Backend Engineer',
    description:
      'Junior backend engineer specializing in Node.js, Express, and building production-grade APIs.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <Navbar />
        <main style={{ paddingTop: 'var(--nav-height)' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
