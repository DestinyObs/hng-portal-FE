import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Bricolage_Grotesque({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Bricolage_Grotesque({
  variable: '--font-geist-mono',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Toaster position='top-right' richColors theme='light'/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
