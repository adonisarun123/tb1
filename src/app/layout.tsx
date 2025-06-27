import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trebound - Premium Team Building & Corporate Experiences",
  description: "Discover 350+ unique team building activities, premium venues, and unforgettable corporate experiences. From virtual escape rooms to outdoor adventures, create lasting memories with your team.",
  keywords: "team building, corporate events, team activities, corporate retreats, team outing, virtual team building, outdoor activities, corporate experiences",
  authors: [{ name: "Trebound" }],
  creator: "Trebound",
  publisher: "Trebound",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://trebound.com'),
  openGraph: {
    title: "Trebound - Premium Team Building & Corporate Experiences",
    description: "Discover 350+ unique team building activities, premium venues, and unforgettable corporate experiences.",
    url: 'https://trebound.com',
    siteName: 'Trebound',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Trebound - Team Building Experiences',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Trebound - Premium Team Building & Corporate Experiences",
    description: "Discover 350+ unique team building activities, premium venues, and unforgettable corporate experiences.",
    images: ['/og-image.png'],
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
  verification: {
    google: 'your-google-verification-code',
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
} 