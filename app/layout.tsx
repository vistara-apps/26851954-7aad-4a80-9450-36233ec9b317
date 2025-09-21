import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ForkMaster - Ethically forge your next big thing',
  description: 'Build on the shoulders of giants by identifying opportunities to ethically fork existing projects and create differentiated MiniApps on Base.',
  keywords: ['Base', 'MiniApp', 'Fork', 'Blockchain', 'Development'],
  openGraph: {
    title: 'ForkMaster',
    description: 'Ethically forge your next big thing by building on the shoulders of giants.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
