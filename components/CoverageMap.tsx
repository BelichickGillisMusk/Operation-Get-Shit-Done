'use client';

import { useState } from 'react';

// ── Market Tier Types ──────────────────────────────────────────────
type MarketTier = 'primary' | 'connector' | 'support';
type Corridor = '99' | '580' | '4' | 'bayArea' | 'northValley';

interface MarketLocation {
  id: string;
  name: string;
  tier: MarketTier;
  x: number;
  y: number;
  county: string;
  corridor: Corridor[];
  registeredVehicles: string;
  nonComplianceLevel: 'very-high' | 'high' | 'moderate' | 'lower';
  note?: string;
}

// ── Tier Styling ───────────────────────────────────────────────────
const TIER_CONFIG = {
  primary: {
    color: '#facc15',
    glow: '#facc1530',
    label: 'PRIMARY MARKET',
    markerRadius: 7,
    zoneRadius: 42,
    zoneOpacity: 0.10,
  },
  connector: {
    color: '#3b82f6',
    glow: '#3b82f630',
    label: 'CRITICAL CONNECTOR',
    markerRadius: 5.5,
    zoneRadius: 30,
    zoneOpacity: 0.08,
  },
  support: {
    color: '#00ff41',
    glow: '#00ff4130',
    label: 'SUPPORT PAGE',
    markerRadius: 4.5,
    zoneRadius: 22,
    zoneOpacity: 0.06,
  },
};

const NON_COMPLIANCE_COLORS: Record<string, string> = {
  'very-high': '#ff3333',
  high: '#ff8c00',
  moderate: '#facc15',
  lower: '#3b82f6',
};

// ── Market Data ────────────────────────────────────────────────────
// Coordinates placed on a 500x620 SVG viewBox representing NorCal
// from roughly Chico (north) to San Jose (south), coast to Sierra foothills
const markets: MarketLocation[] = [
  // PRIMARY MARKETS (9)
  { id: 'chico', name: 'Chico', tier: 'primary', x: 280, y: 48, county: 'Butte', corridor: ['northValley'], registeredVehicles: '~120K', nonComplianceLevel: 'high', note: 'Older fleet, rural area' },
  { id: 'santa-rosa', name: 'Santa Rosa', tier: 'primary', x: 78, y: 208, county: 'Sonoma', corridor: ['bayArea'], registeredVehicles: '~300K', nonComplianceLevel: 'moderate' },
  { id: 'napa-woodland-davis', name: 'Napa / Woodland / Davis', tier: 'primary', x: 195, y: 185, county: 'Napa / Yolo', corridor: ['4'], registeredVehicles: '~250K', nonComplianceLevel: 'moderate', note: 'Davis newer fleet, Woodland agricultural' },
  { id: 'sacramento', name: 'Sacramento', tier: 'primary', x: 305, y: 210, county: 'Sacramento', corridor: ['99', '580'], registeredVehicles: '~1.1M', nonComplianceLevel: 'very-high', note: 'Largest NorCal market, enhanced smog area' },
  { id: 'san-francisco', name: 'San Francisco', tier: 'primary', x: 52, y: 348, county: 'San Francisco', corridor: ['bayArea'], registeredVehicles: '~450K', nonComplianceLevel: 'lower' },
  { id: 'oakland', name: 'Oakland', tier: 'primary', x: 100, y: 370, county: 'Alameda', corridor: ['580', 'bayArea'], registeredVehicles: '~950K', nonComplianceLevel: 'moderate', note: 'East Bay pockets of older fleets' },
  { id: 'peninsula', name: 'Peninsula', tier: 'primary', x: 62, y: 415, county: 'San Mateo', corridor: ['bayArea'], registeredVehicles: '~480K', nonComplianceLevel: 'lower' },
  { id: 'stockton', name: 'Stockton', tier: 'primary', x: 330, y: 340, county: 'San Joaquin', corridor: ['99', '4'], registeredVehicles: '~460K', nonComplianceLevel: 'very-high', note: 'Central Valley non-attainment zone' },
  { id: 'san-jose', name: 'San Jose', tier: 'primary', x: 118, y: 478, county: 'Santa Clara', corridor: ['bayArea'], registeredVehicles: '~1.1M', nonComplianceLevel: 'lower' },

  // CRITICAL CONNECTORS (4) — I-580, I-4, Hwy 99 intersections
  { id: 'richmond', name: 'Richmond', tier: 'connector', x: 95, y: 320, county: 'Contra Costa', corridor: ['580', 'bayArea'], registeredVehicles: '~680K', nonComplianceLevel: 'moderate' },
  { id: 'concord', name: 'Concord', tier: 'connector', x: 155, y: 310, county: 'Contra Costa', corridor: ['4', '580'], registeredVehicles: '~680K', nonComplianceLevel: 'moderate', note: 'I-4 / I-680 junction' },
  { id: 'antioch', name: 'Antioch', tier: 'connector', x: 225, y: 305, county: 'Contra Costa', corridor: ['4'], registeredVehicles: '~680K', nonComplianceLevel: 'high', note: 'East County — Valley demographics' },
  { id: 'livermore', name: 'Livermore', tier: 'connector', x: 175, y: 395, county: 'Alameda', corridor: ['580'], registeredVehicles: '~950K', nonComplianceLevel: 'moderate', note: 'I-580 corridor gateway' },

  // SUPPORT PAGES (7)
  { id: 'roseville', name: 'Roseville', tier: 'support', x: 320, y: 178, county: 'Placer', corridor: ['99'], registeredVehicles: '~240K', nonComplianceLevel: 'lower' },
  { id: 'fairfield', name: 'Fairfield', tier: 'support', x: 155, y: 255, county: 'Solano', corridor: ['580', '4'], registeredVehicles: '~260K', nonComplianceLevel: 'high', note: 'I-80 / I-680 junction' },
  { id: 'hayward', name: 'Hayward', tier: 'support', x: 110, y: 430, county: 'Alameda', corridor: ['580', 'bayArea'], registeredVehicles: '~950K', nonComplianceLevel: 'moderate' },
  { id: 'tracy', name: 'Tracy', tier: 'support', x: 255, y: 405, county: 'San Joaquin', corridor: ['580'], registeredVehicles: '~460K', nonComplianceLevel: 'high', note: 'I-580 / I-5 junction' },
  { id: 'lodi', name: 'Lodi', tier: 'support', x: 310, y: 300, county: 'San Joaquin', corridor: ['99'], registeredVehicles: '~460K', nonComplianceLevel: 'very-high', note: 'Hwy 99 corridor' },
  { id: 'stockton-support', name: 'Stockton (2nd Page)', tier: 'support', x: 345, y: 355, county: 'San Joaquin', corridor: ['99', '4'], registeredVehicles: '~460K', nonComplianceLevel: 'very-high' },
  { id: 'san-diego', name: 'San Diego', tier: 'support', x: 460, y: 590, county: 'San Diego', corridor: [], registeredVehicles: '~2.1M', nonComplianceLevel: 'moderate', note: 'mobilecarbsmoketest.com — Expansion' },
];

// ── Highway Corridors ──────────────────────────────────────────────
const corridors: { id: string; name: string; color: string; path: string; label: string }[] = [
  {
    id: 'hwy99',
    name: 'Highway 99',
    color: '#ff3333',
    label: 'HWY 99',
    path: 'M280,60 L290,120 L305,210 L310,300 L330,340 L340,400 L360,470',
  },
  {
    id: 'i580',
    name: 'Interstate 580',
    color: '#facc15',
    label: 'I-580',
    path: 'M95,320 L100,370 L175,395 L255,405 L330,340',
  },
  {
    id: 'i4',
    name: 'Highway 4',
    color: '#06b6d4',
    label: 'HWY 4',
    path: 'M155,310 L225,305 L280,310 L330,340',
  },
];

// ── Simplified NorCal Coastline Path ────────────────────────────────
const NORCAL_OUTLINE =
  'M10,160 L30,180 L25,210 L35,250 L20,290 L30,330 L38,350 ' +
  'L48,340 L65,335 L70,345 L55,355 L48,365 ' + // SF Bay inlet
  'L55,375 L50,400 L42,430 L50,470 L60,510 L75,560 L90,600 ' + // coast south
  'L480,600 L480,20 L10,20 Z'; // close east & north

// ── Component ──────────────────────────────────────────────────────
export default function CoverageMap() {
  const [hoveredMarket, setHoveredMarket] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<MarketTier | 'all'>('all');

  const filtered =
    selectedTier === 'all'
      ? markets
      : markets.filter((m) => m.tier === selectedTier);

  const primaryCount = markets.filter((m) => m.tier === 'primary').length;
  const connectorCount = markets.filter((m) => m.tier === 'connector').length;
  const supportCount = markets.filter((m) => m.tier === 'support').length;

  const hovered = markets.find((m) => m.id === hoveredMarket);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight">REGIONAL COVERAGE MAP</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            NorCal CARB Mobile — Corridor Strategy: I-580 / Hwy 4 / Hwy 99
          </p>
        </div>
        <div className="flex gap-2">
          {(['all', 'primary', 'connector', 'support'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                selectedTier === tier
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-gray-500 hover:text-gray-300 border border-transparent'
              }`}
            >
              {tier === 'all' ? 'ALL' : tier.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* CARB Intel Banner */}
      <div className="bg-[#1a1a1a] border border-red-500/30 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-red-400 text-sm font-bold tracking-wider">CARB INTEL</span>
          <span className="text-xs text-gray-500">2024 Compliance Data</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-2xl font-bold text-red-400">38.2%</p>
            <p className="text-xs text-gray-400">Non-Compliant Vehicles</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">742,792</p>
            <p className="text-xs text-gray-400">Total Enrolled Statewide</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#facc15]">110,090</p>
            <p className="text-xs text-gray-400">Screened (2024)</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">85%</p>
            <p className="text-xs text-gray-400">Unscreened = Opportunity</p>
          </div>
        </div>
      </div>

      {/* Map + Roster Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* SVG Map */}
        <div className="flex-1 bg-[#1a1a1a] rounded-lg p-4 border border-gray-800 min-h-[480px]">
          <svg
            viewBox="0 0 500 620"
            className="w-full h-auto"
            style={{ maxHeight: '600px' }}
          >
            <defs>
              {/* Glow filters for each tier */}
              <filter id="glow-primary" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-connector" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Pulse animation for primary markets */}
              <radialGradient id="zone-primary" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#facc15" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="zone-connector" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="zone-support" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00ff41" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#00ff41" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* NorCal outline */}
            <path
              d={NORCAL_OUTLINE}
              fill="#111111"
              stroke="#333"
              strokeWidth="1"
              opacity="0.5"
            />

            {/* Highway corridors */}
            {corridors.map((c) => (
              <g key={c.id}>
                <path
                  d={c.path}
                  fill="none"
                  stroke={c.color}
                  strokeWidth="2.5"
                  strokeDasharray="8,4"
                  opacity="0.35"
                />
                {/* Label at start of path */}
                <text
                  x={c.id === 'hwy99' ? 260 : c.id === 'i580' ? 85 : 145}
                  y={c.id === 'hwy99' ? 55 : c.id === 'i580' ? 315 : 300}
                  fill={c.color}
                  fontSize="9"
                  fontWeight="bold"
                  opacity="0.6"
                >
                  {c.label}
                </text>
              </g>
            ))}

            {/* Coverage zones (radial gradients) */}
            {filtered.map((m) => (
              <circle
                key={`zone-${m.id}`}
                cx={m.x}
                cy={m.y}
                r={TIER_CONFIG[m.tier].zoneRadius}
                fill={`url(#zone-${m.tier})`}
                opacity={hoveredMarket === m.id ? 1.5 : 1}
              />
            ))}

            {/* Market markers */}
            {filtered.map((m) => {
              const cfg = TIER_CONFIG[m.tier];
              const isHovered = hoveredMarket === m.id;
              const isSD = m.id === 'san-diego';

              return (
                <g
                  key={m.id}
                  onMouseEnter={() => setHoveredMarket(m.id)}
                  onMouseLeave={() => setHoveredMarket(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer pulse ring for primary */}
                  {m.tier === 'primary' && (
                    <circle
                      cx={m.x}
                      cy={m.y}
                      r={cfg.markerRadius + 4}
                      fill="none"
                      stroke={cfg.color}
                      strokeWidth="1"
                      opacity="0.3"
                    >
                      <animate
                        attributeName="r"
                        values={`${cfg.markerRadius + 2};${cfg.markerRadius + 10};${cfg.markerRadius + 2}`}
                        dur="3s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.4;0;0.4"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Non-compliance ring */}
                  <circle
                    cx={m.x}
                    cy={m.y}
                    r={cfg.markerRadius + 2}
                    fill="none"
                    stroke={NON_COMPLIANCE_COLORS[m.nonComplianceLevel]}
                    strokeWidth="1.5"
                    opacity={isHovered ? 0.9 : 0.4}
                  />

                  {/* Main marker dot */}
                  <circle
                    cx={m.x}
                    cy={m.y}
                    r={isHovered ? cfg.markerRadius + 1.5 : cfg.markerRadius}
                    fill={cfg.color}
                    filter={m.tier === 'primary' ? 'url(#glow-primary)' : undefined}
                    opacity={isHovered ? 1 : 0.85}
                  />

                  {/* City label */}
                  {!isSD && (
                    <text
                      x={m.x}
                      y={m.y - cfg.markerRadius - 6}
                      textAnchor="middle"
                      fill={isHovered ? '#fff' : '#aaa'}
                      fontSize={isHovered ? '10' : '8.5'}
                      fontWeight={isHovered ? 'bold' : 'normal'}
                      style={{ transition: 'all 0.15s ease' }}
                    >
                      {m.name}
                    </text>
                  )}

                  {/* San Diego — show as expansion callout */}
                  {isSD && (
                    <>
                      <line x1={m.x} y1={m.y} x2={440} y2={570} stroke="#00ff41" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.4" />
                      <text x={440} y={566} textAnchor="middle" fill="#00ff41" fontSize="8" opacity="0.7">
                        SAN DIEGO
                      </text>
                      <text x={440} y={577} textAnchor="middle" fill="#666" fontSize="6.5">
                        EXPANSION MKT
                      </text>
                    </>
                  )}
                </g>
              );
            })}

            {/* Hover tooltip */}
            {hovered && hovered.id !== 'san-diego' && (
              <g>
                <rect
                  x={hovered.x + 14}
                  y={hovered.y - 35}
                  width="145"
                  height={hovered.note ? 58 : 44}
                  rx="4"
                  fill="#111"
                  stroke={TIER_CONFIG[hovered.tier].color}
                  strokeWidth="1"
                  opacity="0.95"
                />
                <text x={hovered.x + 20} y={hovered.y - 20} fill="#fff" fontSize="9" fontWeight="bold">
                  {hovered.name}
                </text>
                <text x={hovered.x + 20} y={hovered.y - 8} fill="#888" fontSize="7.5">
                  {hovered.county} County — {hovered.registeredVehicles} vehicles
                </text>
                <text x={hovered.x + 20} y={hovered.y + 4} fill={NON_COMPLIANCE_COLORS[hovered.nonComplianceLevel]} fontSize="7.5" fontWeight="bold">
                  Non-compliance: {hovered.nonComplianceLevel.toUpperCase()}
                </text>
                {hovered.note && (
                  <text x={hovered.x + 20} y={hovered.y + 16} fill="#666" fontSize="7">
                    {hovered.note}
                  </text>
                )}
              </g>
            )}

            {/* Corridor legend */}
            <g>
              <text x="380" y="25" fill="#555" fontSize="8" fontWeight="bold">CORRIDORS</text>
              {corridors.map((c, i) => (
                <g key={c.id}>
                  <line x1="380" y1={38 + i * 14} x2="400" y2={38 + i * 14} stroke={c.color} strokeWidth="2" strokeDasharray="4,2" />
                  <text x="405" y={41 + i * 14} fill="#888" fontSize="7.5">{c.name}</text>
                </g>
              ))}
            </g>

            {/* Non-compliance legend */}
            <g>
              <text x="380" y="90" fill="#555" fontSize="8" fontWeight="bold">NON-COMPLIANCE</text>
              {Object.entries(NON_COMPLIANCE_COLORS).map(([level, color], i) => (
                <g key={level}>
                  <circle cx="386" cy={103 + i * 14} r="3" fill={color} />
                  <text x="395" y={106 + i * 14} fill="#888" fontSize="7.5">
                    {level.replace('-', ' ').toUpperCase()}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* Market Roster Sidebar */}
        <div className="w-full lg:w-80 space-y-4">
          {/* Tier Groups */}
          {[
            { tier: 'primary' as MarketTier, label: 'PRIMARY MARKETS', emoji: '' },
            { tier: 'connector' as MarketTier, label: 'CRITICAL CONNECTORS', emoji: '' },
            { tier: 'support' as MarketTier, label: 'SUPPORT PAGES', emoji: '' },
          ].map(({ tier, label }) => {
            const tierMarkets = markets.filter((m) => m.tier === tier);
            const cfg = TIER_CONFIG[tier];
            return (
              <div key={tier} className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cfg.color }}
                    />
                    <span className="text-xs font-bold tracking-wider text-gray-300">
                      {label}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">{tierMarkets.length}</span>
                </div>
                <div className="divide-y divide-gray-800/50">
                  {tierMarkets.map((m) => (
                    <div
                      key={m.id}
                      className={`px-4 py-2 flex items-center justify-between text-sm transition-colors cursor-pointer ${
                        hoveredMarket === m.id
                          ? 'bg-white/5'
                          : 'hover:bg-white/[0.02]'
                      }`}
                      onMouseEnter={() => setHoveredMarket(m.id)}
                      onMouseLeave={() => setHoveredMarket(null)}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: NON_COMPLIANCE_COLORS[m.nonComplianceLevel],
                          }}
                        />
                        <span className={hoveredMarket === m.id ? 'text-white' : 'text-gray-400'}>
                          {m.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-gray-600">{m.county}</span>
                        <span
                          className="font-medium"
                          style={{ color: NON_COMPLIANCE_COLORS[m.nonComplianceLevel] }}
                        >
                          {m.nonComplianceLevel === 'very-high'
                            ? 'VERY HIGH'
                            : m.nonComplianceLevel.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Neediest Markets Callout */}
          <div className="bg-[#1a1a1a] rounded-lg border border-red-500/30 p-4">
            <p className="text-xs font-bold tracking-wider text-red-400 mb-2">
              NEEDIEST MARKETS (HIGHEST OPPORTUNITY)
            </p>
            <div className="space-y-1.5">
              {markets
                .filter((m) => m.nonComplianceLevel === 'very-high')
                .map((m) => (
                  <div key={m.id} className="flex items-center justify-between text-xs">
                    <span className="text-white font-medium">{m.name}</span>
                    <span className="text-red-400">{m.registeredVehicles} vehicles</span>
                  </div>
                ))}
              <p className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-800">
                San Joaquin Valley &amp; Sacramento — Enhanced smog area, 38.2% non-compliance, older vehicle fleets
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'PRIMARY MARKETS', value: primaryCount, color: '#facc15', border: 'border-[#facc15]/50' },
          { label: 'CONNECTORS', value: connectorCount, color: '#3b82f6', border: 'border-[#3b82f6]/50' },
          { label: 'SUPPORT PAGES', value: supportCount, color: '#00ff41', border: 'border-[#00ff41]/50' },
          { label: 'TOTAL COVERAGE', value: primaryCount + connectorCount + supportCount, color: '#fff', border: 'border-white/20' },
          { label: 'CORRIDORS', value: '3 HWY', color: '#a855f7', border: 'border-[#a855f7]/50' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-[#1a1a1a] rounded-lg p-3 border-l-4 ${stat.border}`}
          >
            <p className="text-xs text-gray-500 tracking-wider">{stat.label}</p>
            <p className="text-xl font-bold mt-1" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
