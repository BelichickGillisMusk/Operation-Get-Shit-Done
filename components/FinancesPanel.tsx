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

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function FinancesPanel() {
  const [stats, setStats] = useState<Stats>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch {
        // Use fallback
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const progressPercent = Math.min(
    Math.round((stats.revenue / stats.target) * 100),
    100
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`bg-[#1a1a1a] rounded-lg p-6 ${loading ? 'animate-pulse' : ''}`}>
          <h3 className="text-sm text-gray-400 tracking-widest font-medium mb-4">
            STRIPE REVENUE SUMMARY
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500">MTD Revenue</p>
              <p className="text-3xl font-bold text-green-400">
                {formatCurrency(stats.revenue)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Retests Due (Outstanding)</p>
              <p className="text-2xl font-bold text-[#facc15]">
                {formatCurrency(stats.retests)}
              </p>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress to 2026 Target</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#0a0a0a] rounded-full h-2">
                <div
                  className="bg-[#3b82f6] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {formatCurrency(stats.revenue)} / {formatCurrency(stats.target)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg p-6">
          <h3 className="text-sm text-gray-400 tracking-widest font-medium mb-4">
            QUICK LINKS
          </h3>
          <div className="space-y-3">
            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-3 rounded-md transition-colors"
            >
              <span>Open Stripe Dashboard</span>
              <span>&rarr;</span>
            </a>
            <a
              href="https://www.paypal.com/myaccount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium px-5 py-3 rounded-md transition-colors"
            >
              <span>Open PayPal</span>
              <span>&rarr;</span>
            </a>
            <a
              href="https://dashboard.stripe.com/payments"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-[#1a1a1a] border border-gray-700 hover:border-gray-500 text-white text-sm font-medium px-5 py-3 rounded-md transition-colors"
            >
              <span>Stripe Payments</span>
              <span>&rarr;</span>
            </a>
            <a
              href="https://dashboard.stripe.com/customers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-[#1a1a1a] border border-gray-700 hover:border-gray-500 text-white text-sm font-medium px-5 py-3 rounded-md transition-colors"
            >
              <span>Stripe Customers</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
