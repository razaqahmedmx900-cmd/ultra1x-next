import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '1X BROKER - Trade Crypto & Stocks',
  description: 'Ultra-fast trading platform with live prices',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0a0a0f', color: '#fff', fontFamily: 'system-ui' }}>
        {children}
      </body>
    </html>
  );
}
