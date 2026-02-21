import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GM Command Center | Operation Get Shit Done',
  description: 'Command center for NorCal CARB Mobile — Bryan Gillis',
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-[#0a0a0a] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
