import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bryan Gillis — NorCal CARB Mobile',
  description: 'Bryan Gillis — NorCal CARB Mobile smog inspection, powered by SilverbackAI',
  openGraph: {
    title: 'Bryan Gillis — NorCal CARB Mobile',
    description: 'Mobile smog inspection — Sacramento, CA',
    type: 'website',
  },
};

export default function PersonalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
