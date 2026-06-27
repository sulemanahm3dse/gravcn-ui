import type { Metadata, Viewport } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Poppins } from 'next/font/google';
import { PWARegistry } from '../components/pwa-registry';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'GravCN UI',
  description: 'A beautiful, accessible, and customizable UI library.',
  keywords: ['UI library', 'React', 'Next.js', 'Tailwind CSS', 'Components'],
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gravcn.ui',
    title: 'GravCN UI',
    description: 'A beautiful, accessible, and customizable UI library.',
    siteName: 'GravCN UI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GravCN UI',
    description: 'A beautiful, accessible, and customizable UI library.',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <PWARegistry />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
