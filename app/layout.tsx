import type { Metadata } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import './globals.css';

import { Toaster } from '@/components/ui/sonner';
import 'quill/dist/quill.core.css';
import { QueryProviders } from '@/providers/query-providers';

const brics = Bricolage_Grotesque({
  variable: '--font-Bricolage',
  subsets: ['latin'],
});

const dm_sans = DM_Sans({
  variable: '--font-dm_sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HNG Connect',
  description:
    'HNG Connect connects HNG interns both past and present, and companies in one dynamic ecosystem turning job seeking into real opportunities.',
  openGraph: {
    title: 'HNG Connect',
    description:
      'HNG Connect connects HNG interns both past and present, and companies in one dynamic ecosystem turning job seeking into real opportunities.',
    url: 'https://takeda.emerj.net/',
    siteName: 'HNG Connect',
    images: [
      {
        url: '/images/webLinkPreview.png',
        width: 1200,
        height: 630,
        alt: 'HNG Connect Preview',
      },
    ],
    type: 'website',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${brics.variable} ${dm_sans.variable} antialiased`}>
        <QueryProviders>
          <Toaster position="top-right" richColors theme="light" />
          {children}
        </QueryProviders>
      </body>
    </html>
  );
}
