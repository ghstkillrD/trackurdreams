import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import Header from '@/components/shared/Header';
import '@/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Track ur Dreams - Unlock the Secrets of Your Subconscious',
  description: 'Record your dreams and gain AI-powered insights to understand your subconscious mind. Track patterns, emotions, and discover connections to your waking life.',
  keywords: ['dreams', 'dream tracking', 'AI insights', 'subconscious', 'self-improvement', 'mindfulness'],
  authors: [{ name: 'Track ur Dreams' }],
  openGraph: {
    title: 'Track ur Dreams',
    description: 'Unlock the Secrets of Your Subconscious',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Track ur Dreams',
    description: 'Unlock the Secrets of Your Subconscious',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        {/* Floating background shapes */}
        <div className="floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>
        
        {/* Main content */}
        <div className="min-h-screen bg-gradient-to-br from-lavender-mist via-misty-blue to-soft-pink">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
} 