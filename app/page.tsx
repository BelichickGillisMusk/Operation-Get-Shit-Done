'use client';

import { useState } from 'react';
import TabNav from '@/components/TabNav';
import StatsCards from '@/components/StatsCards';
import ChatWindow from '@/components/ChatWindow';
import SlackPanel from '@/components/SlackPanel';
import FinancesPanel from '@/components/FinancesPanel';
import GCPPanel from '@/components/GCPPanel';
import SilverbackBranding from '@/components/SilverbackBranding';
import dynamic from 'next/dynamic';

const TerminalEmbed = dynamic(() => import('@/components/TerminalEmbed'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-[#1a1a1a] rounded-lg">
      <p className="text-gray-400">Loading terminal...</p>
    </div>
  ),
});

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              GM COMMAND CENTER
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              NorCal CARB Mobile &mdash; Bryan Gillis &mdash; License IF530523
            </p>
          </div>
          <div className="text-right text-xs text-gray-500">
            <p>OPERATION: GET SHIT DONE</p>
            <p className="text-[#facc15]">SYSTEM ONLINE</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-4">
        <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6">
          {activeTab === 'dashboard' && <StatsCards />}
          {activeTab === 'agent' && <ChatWindow />}
          {activeTab === 'terminal' && <TerminalEmbed />}
          {activeTab === 'slack' && <SlackPanel />}
          {activeTab === 'finances' && <FinancesPanel />}
          {activeTab === 'gcp' && <GCPPanel />}
          {activeTab === 'branding' && <SilverbackBranding />}
        </div>
      </div>
    </main>
  );
}
