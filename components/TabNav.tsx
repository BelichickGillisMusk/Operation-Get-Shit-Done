'use client';

interface TabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: '\u25A0' },
  { id: 'agent', label: 'Agent', icon: '\u2731' },
  { id: 'terminal', label: 'Terminal', icon: '\u276F' },
  { id: 'slack', label: 'Slack', icon: '\u0023' },
  { id: 'finances', label: 'Finances', icon: '\u0024' },
  { id: 'gcp', label: 'GCP', icon: '\u2601' },
  { id: 'branding', label: 'Branding', icon: '\uD83E\uDD8D' },
];

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <nav className="flex gap-1 bg-[#1a1a1a] rounded-lg p-1 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium
            transition-all duration-200 whitespace-nowrap
            ${
              activeTab === tab.id
                ? 'bg-[#0a0a0a] text-white border-b-2 border-[#facc15] shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-[#0a0a0a]/50'
            }
          `}
        >
          <span className="text-base">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
