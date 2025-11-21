import type { Metadata } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/sonner';
import 'quill/dist/quill.core.css';

const brics = Bricolage_Grotesque({
  variable: '--font-Bricolage',
  subsets: ['latin'],
});

const dm_sans = DM_Sans({
  variable: '--font-dm_sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HNG Portal',
  description:
    'HNG Portal connects HNG interns both past and present, and companies in one dynamic ecosystem turning job seeking into real opportunities.',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${brics.variable} ${dm_sans.variable} antialiased`}>
        <Providers>
          <Toaster position="top-right" richColors theme="light" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
