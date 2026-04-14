import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Silverback AI Agency | What keeps you up at night?',
  description:
    'Ops + AI strike team shipping reliable automations, agents, and runbooks for the problems that keep you up at night.',
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
