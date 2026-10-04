import React from 'react';
import './globals.css';

export interface Metadata {
  title: string;
  description: string;
  openGraph?: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    type: string;
  };
  twitter?: {
    card: string;
    title: string;
    description: string;
    creator: string;
  };
  icons?: {
    icon: string;
  };
}

export const metadata: Metadata = {
  title: '8WHIE — Cybersecurity • Research • Technology',
  description: '8WHIE explores cybersecurity, ethical hacking, technology, research and digital security through practical education and experimentation.',
  openGraph: {
    title: '8WHIE — EXPLORE. BREAK. SECURE.',
    description: 'Cybersecurity, research, ethical hacking and technology.',
    url: 'https://8whie.com',
    siteName: '8WHIE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '8WHIE — EXPLORE. BREAK. SECURE.',
    description: 'Cybersecurity, research, ethical hacking and technology.',
    creator: '@im_aryanthakur',
  },
  icons: {
    icon: '/images/8whie-logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "8WHIE",
              "url": "https://8whie.com",
              "logo": "https://8whie.com/images/8whie-logo.svg",
              "founder": {
                "@type": "Person",
                "name": "Aryan Thakur",
                "email": "iaryan9905@gmail.com"
              },
              "description": "8WHIE is a cybersecurity and technology platform exploring ethical hacking, digital security, research and the systems that shape the modern internet."
            }),
          }}
        />
      </head>
      <body className="bg-[#070707] text-[#F2F2F2] selection:bg-[#B7FF00]/25 selection:text-[#F2F2F2] antialiased overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
