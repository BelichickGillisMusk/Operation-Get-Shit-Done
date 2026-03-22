'use client';

import { useState, useEffect } from 'react';

const links = [
  { label: 'SilverbackAI Command Center', url: 'https://silverbackai.agency', description: 'AI-powered operations hub', icon: '🦍' },
  { label: 'NorCal CARB Mobile', url: 'tel:+19168904427', description: 'Book a smog inspection — 916-890-4427', icon: '📞' },
  { label: 'Stripe Dashboard', url: 'https://dashboard.stripe.com', description: 'Payments & revenue', icon: '💳' },
  { label: 'Google Calendar', url: 'https://calendar.google.com', description: 'Schedule & appointments', icon: '📅' },
  { label: 'GCP Console', url: 'https://console.cloud.google.com', description: 'Cloud infrastructure', icon: '☁️' },
  { label: 'Claude AI', url: 'https://claude.ai', description: 'AI assistant', icon: '🤖' },
  { label: 'GitHub', url: 'https://github.com/BelichickGillisMusk', description: 'Code & projects', icon: '⚡' },
];

export default function PersonalPage() {
  const [greeting, setGreeting] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hour = now.getHours();
      const g = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
      setGreeting(g);
      setTime(now.toLocaleString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }));
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-[#facc15] to-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-black">
            BG
          </div>
          <h1 className="text-2xl font-bold text-white">Bryan Gillis</h1>
          <p className="text-gray-400 text-sm mt-1">
            NorCal CARB Mobile &mdash; License IF530523
          </p>
          <p className="text-[#facc15] text-sm mt-3 font-medium">{greeting}</p>
          <p className="text-gray-500 text-xs mt-1">{time}</p>
        </div>

        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith('tel:') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center gap-4 w-full bg-[#1a1a1a] border border-gray-800 hover:border-[#facc15]/50 rounded-lg px-5 py-4 transition-all duration-200 group"
            >
              <span className="text-2xl">{link.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium group-hover:text-[#facc15] transition-colors">
                  {link.label}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{link.description}</p>
              </div>
              <span className="text-gray-600 group-hover:text-[#facc15] transition-colors">&rarr;</span>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 text-xs">
            Powered by <span className="text-[#facc15]">SilverbackAI</span>
          </p>
        </div>
      </div>
    </main>
  );
}
