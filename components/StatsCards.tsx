'use client';

import { useState, useEffect } from 'react';

interface Stats {
  customers: number;
  revenue: number;
  retests: number;
  target: number;
}

const FALLBACK: Stats = {
  customers: 622,
  revenue: 120000,
  retests: 15300,
  target: 240000,
};

const quickLinks = [
  { label: 'CRM', url: 'https://crm.google.com', color: 'bg-blue-600 hover:bg-blue-700' },
  { label: 'Calendar', url: 'https://calendar.google.com', color: 'bg-purple-600 hover:bg-purple-700' },
  { label: 'Stripe', url: 'https://dashboard.stripe.com', color: 'bg-indigo-600 hover:bg-indigo-700' },
  { label: 'PayPal', url: 'https://www.paypal.com/myaccount', color: 'bg-sky-600 hover:bg-sky-700' },
  { label: 'Make', url: 'https://www.make.com', color: 'bg-violet-600 hover:bg-violet-700' },
  { label: 'Claude', url: 'https://claude.ai', color: 'bg-amber-600 hover:bg-amber-700' },
];

function formatCurrency(cents: number): string {
  return '$' + (cents >= 1000 ? (cents / 1000).toFixed(1) + 'K' : cents.toString());
}

export default function StatsCards() {
  const [stats, setStats] = useState<Stats>(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // Use fallback on error
    } finally {
      setLoading(false);
      setLastUpdated(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      label: 'CUSTOMERS',
      value: stats.customers.toLocaleString() + '+',
      accent: 'border-white/20',
      textColor: 'text-white',
    },
    {
      label: 'REVENUE',
      value: formatCurrency(stats.revenue),
      accent: 'border-green-500/50',
      textColor: 'text-green-400',
    },
    {
      label: 'RETESTS DUE',
      value: formatCurrency(stats.retests),
      accent: 'border-[#facc15]/50',
      textColor: 'text-[#facc15]',
    },
    {
      label: '2026 TARGET',
      value: formatCurrency(stats.target),
      accent: 'border-[#3b82f6]/50',
      textColor: 'text-[#3b82f6]',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`bg-[#1a1a1a] rounded-lg p-5 border-l-4 ${card.accent} ${
              loading ? 'animate-pulse' : ''
            }`}
          >
            <p className="text-xs text-gray-400 tracking-widest font-medium">
              {card.label}
            </p>
            <p className={`text-3xl font-bold mt-2 ${card.textColor}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {lastUpdated && (
        <p className="text-xs text-gray-600">
          Last updated: {lastUpdated} &mdash; Auto-refreshes every 60s
        </p>
      )}

      <div>
        <h3 className="text-sm text-gray-400 font-medium tracking-wide mb-3">
          QUICK LAUNCH
        </h3>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-white text-sm font-medium px-4 py-2 rounded-md transition-colors`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
