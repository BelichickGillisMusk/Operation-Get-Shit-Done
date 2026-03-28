'use client';

import { useState } from 'react';

// ── Market Tier Types ──────────────────────────────────────────────
type MarketTier = 'primary' | 'connector' | 'support' | 'opportunity';
type Corridor = '99' | '580' | '4' | 'bayArea' | 'northValley' | 'i5north' | '101';

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
  fleetSegments?: string[];
  providers?: string;
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
  opportunity: {
    color: '#ef4444',
    glow: '#ef444430',
    label: 'UNDERSERVED — GOLD MINE',
    markerRadius: 6,
    zoneRadius: 35,
    zoneOpacity: 0.12,
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

  // UNDERSERVED OPPORTUNITIES (6) — Redding first, work south
  { id: 'redding', name: 'Redding', tier: 'opportunity', x: 240, y: 10, county: 'Shasta', corridor: ['i5north'], registeredVehicles: '~110K', nonComplianceLevel: 'high', fleetSegments: ['Logging', 'Construction', 'I-5 Trucking'], providers: '2-4', note: 'Same drive as Fresno — way less competition' },
  { id: 'red-bluff', name: 'Red Bluff', tier: 'opportunity', x: 258, y: 28, county: 'Tehama', corridor: ['i5north'], registeredVehicles: '~30K', nonComplianceLevel: 'very-high', fleetSegments: ['Cattle', 'Olives', 'Hay Haulers'], providers: '~0-1', note: 'I-5 hub between Redding & Chico' },
  { id: 'oroville', name: 'Oroville', tier: 'opportunity', x: 295, y: 65, county: 'Butte', corridor: ['northValley'], registeredVehicles: '~40K', nonComplianceLevel: 'high', fleetSegments: ['Rice', 'Citrus', 'Dam Rebuild', 'PG&E'], providers: '~0', note: 'Post-fire construction boom' },
  { id: 'susanville', name: 'Susanville', tier: 'opportunity', x: 415, y: 35, county: 'Lassen', corridor: [], registeredVehicles: '~15K', nonComplianceLevel: 'very-high', fleetSegments: ['Logging', 'Ranching', 'Prison Fleets'], providers: '~0', note: 'ZERO providers. 2+ hrs from anyone.' },
  { id: 'ukiah', name: 'Ukiah', tier: 'opportunity', x: 48, y: 145, county: 'Mendocino', corridor: ['101'], registeredVehicles: '~50K', nonComplianceLevel: 'high', fleetSegments: ['Wine', 'Timber', 'Cannabis'], providers: '~0', note: '2 hrs from Santa Rosa. Zero OVI.' },
  { id: 'eureka', name: 'Eureka', tier: 'opportunity', x: 28, y: 35, county: 'Humboldt', corridor: ['101'], registeredVehicles: '~75K', nonComplianceLevel: 'high', fleetSegments: ['Logging', 'Dairy', 'Cannabis', 'Port'], providers: '~0', note: '4+ hrs from Sac. Timber mills + dairy.' },
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
  {
    id: 'i5north',
    name: 'I-5 North',
    color: '#ef4444',
    label: 'I-5 N',
    path: 'M240,10 L258,28 L270,48 L290,120 L305,210',
  },
  {
    id: 'hwy101',
    name: 'US-101',
    color: '#a855f7',
    label: '101',
    path: 'M28,35 L38,90 L48,145 L68,180 L78,208',
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
  const opportunityCount = markets.filter((m) => m.tier === 'opportunity').length;

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
          {(['all', 'opportunity', 'primary', 'connector', 'support'] as const).map((tier) => (
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
              <radialGradient id="zone-opportunity" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
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
                  x={c.id === 'hwy99' ? 260 : c.id === 'i580' ? 85 : c.id === 'i5north' ? 220 : c.id === 'hwy101' ? 15 : 145}
                  y={c.id === 'hwy99' ? 55 : c.id === 'i580' ? 315 : c.id === 'i5north' ? 8 : c.id === 'hwy101' ? 30 : 300}
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
                  {/* Outer pulse ring for primary + opportunity */}
                  {(m.tier === 'primary' || m.tier === 'opportunity') && (
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
            {hovered && hovered.id !== 'san-diego' && (() => {
              const tx = hovered.x > 300 ? hovered.x - 165 : hovered.x + 14;
              const lines = [hovered.fleetSegments?.join(', '), hovered.providers ? `Providers: ${hovered.providers}` : null, hovered.note].filter(Boolean);
              const h = 48 + lines.length * 12;
              return (
                <g>
                  <rect x={tx} y={hovered.y - 38} width="155" height={h} rx="4" fill="#111" stroke={TIER_CONFIG[hovered.tier].color} strokeWidth="1" opacity="0.95" />
                  <text x={tx + 6} y={hovered.y - 22} fill="#fff" fontSize="9" fontWeight="bold">{hovered.name}</text>
                  <text x={tx + 6} y={hovered.y - 10} fill="#888" fontSize="7.5">{hovered.county} County — {hovered.registeredVehicles} vehicles</text>
                  <text x={tx + 6} y={hovered.y + 2} fill={NON_COMPLIANCE_COLORS[hovered.nonComplianceLevel]} fontSize="7.5" fontWeight="bold">
                    Non-compliance: {hovered.nonComplianceLevel.toUpperCase()}
                  </text>
                  {lines.map((line, i) => (
                    <text key={i} x={tx + 6} y={hovered.y + 14 + i * 12} fill={i === 1 && hovered.providers?.includes('0') ? '#ef4444' : '#666'} fontSize="7">{line}</text>
                  ))}
                </g>
              );
            })()}

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
            { tier: 'opportunity' as MarketTier, label: 'UNDERSERVED GOLD MINES' },
            { tier: 'primary' as MarketTier, label: 'PRIMARY MARKETS' },
            { tier: 'connector' as MarketTier, label: 'CRITICAL CONNECTORS' },
            { tier: 'support' as MarketTier, label: 'SUPPORT PAGES' },
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
                      <div className="flex items-center gap-2 text-xs">
                        {m.providers && (
                          <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                            m.providers.includes('0') ? 'bg-red-500/20 text-red-400' : 'bg-gray-800 text-gray-500'
                          }`}>
                            {m.providers}
                          </span>
                        )}
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

          {/* Expansion Strategy */}
          <div className="bg-[#1a1a1a] rounded-lg border border-red-500/30 p-4">
            <p className="text-xs font-bold tracking-wider text-red-400 mb-1">
              EXPANSION: REDDING FIRST
            </p>
            <p className="text-[10px] text-gray-500 mb-3">
              Same 2.5hr drive as Fresno — but Fresno has competition. North is WIDE OPEN.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="text-red-400 font-mono w-4">1</span>
                <span className="text-gray-300">Redding &rarr; Red Bluff &rarr; Chico &rarr; Oroville</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 font-mono w-4">2</span>
                <span className="text-gray-300">Susanville (1.5hr east of Redding)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400 font-mono w-4">3</span>
                <span className="text-gray-300">Ukiah &rarr; Eureka (coast loop)</span>
              </div>
            </div>
          </div>

          {/* Pricing & Referral */}
          <div className="bg-[#1a1a1a] rounded-lg border border-green-500/30 p-4">
            <p className="text-xs font-bold tracking-wider text-green-400 mb-2">
              PRICING — NORTH MARKETS
            </p>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Per truck</span>
                <span className="text-green-400 font-bold">$100–200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Penalty if they skip</span>
                <span className="text-red-400 font-bold">$500/yr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">5 fleets × 20 trucks</span>
                <span className="text-white font-bold">$15K/visit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">6 markets × 2 visits/yr</span>
                <span className="text-[#facc15] font-bold">$180K/yr</span>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-800">
                <p className="text-gray-500">Referral: Fleet refers fleet = money back on next test</p>
              </div>
            </div>
          </div>

          {/* AI Strategy */}
          <div className="bg-[#1a1a1a] rounded-lg border border-purple-500/30 p-4">
            <p className="text-xs font-bold tracking-wider text-purple-400 mb-2">
              AI-FIRST STRATEGY (GEO)
            </p>
            <ul className="text-[11px] text-gray-400 space-y-1 list-disc list-inside">
              <li>llms.txt + robots.txt (allow GPTBot)</li>
              <li>JSON-LD schema on every page</li>
              <li>Answer capsule in first 60 words</li>
              <li>FAQ + Glossary + Video + Reviews</li>
              <li>Cited sources (CARB.ca.gov)</li>
              <li>Entity authority (Reddit, YouTube, forums)</li>
            </ul>
            <p className="text-[10px] text-gray-600 mt-2">
              AI search up 527% YoY. Only 12.4% of sites have structured data.
            </p>
          </div>
        </div>
      </div>

      {/* Coverage Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        {[
          { label: 'GOLD MINES', value: opportunityCount, color: '#ef4444', border: 'border-red-500/50' },
          { label: 'PRIMARY', value: primaryCount, color: '#facc15', border: 'border-[#facc15]/50' },
          { label: 'CONNECTORS', value: connectorCount, color: '#3b82f6', border: 'border-[#3b82f6]/50' },
          { label: 'SUPPORT', value: supportCount, color: '#00ff41', border: 'border-[#00ff41]/50' },
          { label: 'TOTAL MARKETS', value: markets.length, color: '#fff', border: 'border-white/20' },
          { label: 'CORRIDORS', value: '5 HWY', color: '#a855f7', border: 'border-[#a855f7]/50' },
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

      {/* Sites Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#1a1a1a] rounded-lg p-4 border border-red-500/20">
          <h4 className="text-sm font-medium text-red-400">carbteststockton.com</h4>
          <p className="text-xs text-gray-500 mt-1">San Joaquin Valley — Stockton, Lodi, Tracy, Modesto</p>
          <p className="text-xs text-gray-400 mt-2">Ag / Logistics / Construction fleets</p>
          <p className="text-[10px] text-gray-600 mt-1">8 core + 6 AI-citation + 4 tech files</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-lg p-4 border border-orange-500/20">
          <h4 className="text-sm font-medium text-orange-400">mobilesmoketest.com</h4>
          <p className="text-xs text-gray-500 mt-1">Tracy-Concord Corridor — I-580</p>
          <p className="text-xs text-gray-400 mt-2">Connects Valley to Bay Area</p>
          <p className="text-[10px] text-gray-600 mt-1">7 core + 6 AI-citation + tech files</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-lg p-4 border border-blue-500/20">
          <h4 className="text-sm font-medium text-blue-400">NorCal Hub (8 city pages)</h4>
          <p className="text-xs text-gray-500 mt-1">Sac + Bay Area + Santa Rosa + Chico + North</p>
          <p className="text-xs text-gray-400 mt-2">Each: LocalBusiness schema + FAQ + answer capsule</p>
          <p className="text-[10px] text-gray-600 mt-1">llms.txt + JSON-LD + cited sources</p>
        </div>
      </div>
    </div>
  );
}
