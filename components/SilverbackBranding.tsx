'use client';

interface LogoConcept {
  id: number;
  title: string;
  tagline: string;
  description: string;
  svg: React.ReactNode;
}

/* ─────────────────────────────────────────────
   10 SVG logo concepts for Silverback AI Agency
   Theme: Strength · Wisdom · Compassion
   ───────────────────────────────────────────── */

function Logo1() {
  /* Classic Silverback – gorilla silhouette with circuit-trace halo */
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="l1bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#l1bg)" stroke="#facc15" strokeWidth="2" />
      {/* Circuit ring */}
      <circle cx="100" cy="100" r="82" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="6 4" />
      {/* Node dots on ring */}
      {[0,45,90,135,180,225,270,315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle key={deg} cx={100 + 82 * Math.sin(rad)} cy={100 - 82 * Math.cos(rad)}
            r="2.5" fill="#facc15" />
        );
      })}
      {/* Gorilla silhouette – head */}
      <ellipse cx="100" cy="88" rx="28" ry="26" fill="#94a3b8" />
      {/* Brow ridge */}
      <rect x="72" y="74" width="56" height="10" rx="5" fill="#64748b" />
      {/* Eyes */}
      <ellipse cx="89" cy="84" rx="5" ry="4" fill="#1e293b" />
      <ellipse cx="111" cy="84" rx="5" ry="4" fill="#1e293b" />
      <circle cx="90" cy="83" r="1.5" fill="#facc15" />
      <circle cx="112" cy="83" r="1.5" fill="#facc15" />
      {/* Nose */}
      <ellipse cx="100" cy="93" rx="7" ry="5" fill="#475569" />
      {/* Mouth */}
      <path d="M91 101 Q100 107 109 101" stroke="#334155" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Ears */}
      <ellipse cx="72" cy="88" rx="8" ry="10" fill="#94a3b8" />
      <ellipse cx="128" cy="88" rx="8" ry="10" fill="#94a3b8" />
      {/* Shoulders / body */}
      <path d="M65 130 Q70 110 100 108 Q130 110 135 130 Q125 145 100 148 Q75 145 65 130Z" fill="#94a3b8" />
      {/* Chest silver stripe */}
      <ellipse cx="100" cy="128" rx="14" ry="10" fill="#cbd5e1" />
      {/* Word mark */}
      <text x="100" y="170" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13"
        fontWeight="bold" fill="#facc15" letterSpacing="3">SILVERBACK</text>
      <text x="100" y="183" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7"
        fill="#94a3b8" letterSpacing="5">AI AGENCY</text>
    </svg>
  );
}

function Logo2() {
  /* Shield Guardian – gorilla crest inside a protective shield */
  return (
    <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="l2shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      {/* Shield */}
      <path d="M100 10 L180 45 L180 120 Q180 180 100 210 Q20 180 20 120 L20 45 Z"
        fill="url(#l2shield)" stroke="#facc15" strokeWidth="3" />
      {/* Inner shield line */}
      <path d="M100 25 L165 55 L165 118 Q165 168 100 195 Q35 168 35 118 L35 55 Z"
        fill="none" stroke="#334155" strokeWidth="1.5" />
      {/* Gorilla head */}
      <ellipse cx="100" cy="95" rx="30" ry="27" fill="#475569" />
      <rect x="70" y="78" width="60" height="12" rx="6" fill="#334155" />
      <ellipse cx="88" cy="93" rx="6" ry="5" fill="#0f172a" />
      <ellipse cx="112" cy="93" rx="6" ry="5" fill="#0f172a" />
      <circle cx="89" cy="92" r="2" fill="#facc15" />
      <circle cx="113" cy="92" r="2" fill="#facc15" />
      <ellipse cx="100" cy="103" rx="8" ry="6" fill="#1e293b" />
      <ellipse cx="72" cy="95" rx="9" ry="11" fill="#475569" />
      <ellipse cx="128" cy="95" rx="9" ry="11" fill="#475569" />
      {/* Silver back stripe */}
      <path d="M75 122 Q100 115 125 122 Q125 138 100 143 Q75 138 75 122Z" fill="#94a3b8" />
      {/* Stars on shield bottom */}
      {[-20, 0, 20].map((x, i) => (
        <text key={i} x={100 + x} y="175" textAnchor="middle" fontSize="10" fill="#facc15">★</text>
      ))}
      <text x="100" y="200" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10"
        fontWeight="bold" fill="#facc15" letterSpacing="2">SILVERBACK AI</text>
    </svg>
  );
}

function Logo3() {
  /* Open Hands – gorilla gently cradling a glowing orb (compassion) */
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="l3orb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
        </radialGradient>
        <filter id="l3glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="200" height="200" fill="#0f172a" rx="16" />
      {/* Gorilla face */}
      <ellipse cx="100" cy="72" rx="32" ry="30" fill="#374151" />
      <rect x="68" y="54" width="64" height="14" rx="7" fill="#1f2937" />
      <ellipse cx="87" cy="70" rx="7" ry="6" fill="#111827" />
      <ellipse cx="113" cy="70" rx="7" ry="6" fill="#111827" />
      <circle cx="88" cy="69" r="2" fill="#fde68a" />
      <circle cx="114" cy="69" r="2" fill="#fde68a" />
      <ellipse cx="100" cy="82" rx="9" ry="6" fill="#1f2937" />
      <ellipse cx="68" cy="72" rx="10" ry="13" fill="#374151" />
      <ellipse cx="132" cy="72" rx="10" ry="13" fill="#374151" />
      {/* Arms cupped upward */}
      <path d="M30 150 Q40 120 70 115 L90 113 L90 130 L75 130 Q55 135 50 158Z"
        fill="#374151" />
      <path d="M170 150 Q160 120 130 115 L110 113 L110 130 L125 130 Q145 135 150 158Z"
        fill="#374151" />
      {/* Hands / palms */}
      <ellipse cx="55" cy="155" rx="22" ry="12" fill="#4b5563" />
      <ellipse cx="145" cy="155" rx="22" ry="12" fill="#4b5563" />
      {/* Glowing orb (humanity) */}
      <circle cx="100" cy="145" r="22" fill="url(#l3orb)" filter="url(#l3glow)" opacity="0.9" />
      <text x="100" y="150" textAnchor="middle" fontSize="16" fill="white">🤝</text>
      {/* Label */}
      <text x="100" y="188" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11"
        fontWeight="bold" fill="#facc15" letterSpacing="3">SILVERBACK</text>
      <text x="100" y="199" textAnchor="middle" fontFamily="sans-serif" fontSize="7"
        fill="#9ca3af" letterSpacing="4">AI AGENCY</text>
    </svg>
  );
}

function Logo4() {
  /* Minimal Mark – geometric S-shaped primate profile, pure negative space */
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="200" fill="#18181b" rx="12" />
      {/* Bold geometric gorilla face using rectangles / circles */}
      {/* Head */}
      <rect x="55" y="45" width="90" height="80" rx="40" fill="#d1d5db" />
      {/* Brow */}
      <rect x="55" y="45" width="90" height="28" rx="14" fill="#6b7280" />
      {/* Eyes – negative space */}
      <circle cx="82" cy="60" r="9" fill="#18181b" />
      <circle cx="118" cy="60" r="9" fill="#18181b" />
      <circle cx="83" cy="59" r="4" fill="#facc15" />
      <circle cx="119" cy="59" r="4" fill="#facc15" />
      {/* Nose block */}
      <rect x="88" y="90" width="24" height="16" rx="8" fill="#9ca3af" />
      {/* Chin / muzzle */}
      <ellipse cx="100" cy="118" rx="18" ry="10" fill="#9ca3af" />
      {/* Silver stripe – body */}
      <rect x="70" y="130" width="60" height="30" rx="12" fill="#e5e7eb" />
      {/* "S" lettermark subtly overlaid */}
      <text x="100" y="155" textAnchor="middle" fontFamily="Georgia,serif" fontSize="22"
        fontWeight="bold" fill="#18181b" opacity="0.25">S</text>
      {/* Wordmark */}
      <text x="100" y="180" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10"
        fontWeight="bold" fill="#facc15" letterSpacing="4">SILVERBACK</text>
      <text x="100" y="193" textAnchor="middle" fontFamily="sans-serif" fontSize="7"
        fill="#6b7280" letterSpacing="5">AI AGENCY</text>
    </svg>
  );
}

function Logo5() {
  /* Mountain King – gorilla atop a mountain peak, wisdom from above */
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="l5sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c1445" />
          <stop offset="100%" stopColor="#1e3a5f" />
        </linearGradient>
        <linearGradient id="l5mount" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#l5sky)" />
      {/* Stars */}
      {[[20,20],[40,10],[80,15],[140,8],[170,25],[160,50],[30,55]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill="white" opacity="0.8" />
      ))}
      {/* Mountain range */}
      <polygon points="0,200 60,90 100,130 140,70 200,200" fill="url(#l5mount)" />
      <polygon points="0,200 30,140 70,180 100,130 140,170 170,130 200,200"
        fill="#0f172a" opacity="0.6" />
      {/* Snow caps */}
      <polygon points="100,130 85,100 115,100" fill="white" opacity="0.8" />
      <polygon points="140,70 128,45 152,45" fill="white" opacity="0.8" />
      {/* Gorilla silhouette on peak */}
      <ellipse cx="140" cy="36" rx="14" ry="13" fill="#334155" />
      <rect x="126" y="26" width="28" height="8" rx="4" fill="#1e293b" />
      <circle cx="134" cy="33" r="3" fill="#0f172a" />
      <circle cx="146" cy="33" r="3" fill="#0f172a" />
      <circle cx="134.5" cy="32.5" r="1.2" fill="#facc15" />
      <circle cx="146.5" cy="32.5" r="1.2" fill="#facc15" />
      <ellipse cx="140" cy="42" rx="5" ry="4" fill="#1e293b" />
      {/* Body */}
      <rect x="130" y="48" width="20" height="18" rx="6" fill="#334155" />
      <ellipse cx="140" cy="53" rx="6" ry="4" fill="#94a3b8" />
      {/* Moon */}
      <circle cx="165" cy="30" r="14" fill="#fde68a" opacity="0.9" />
      <circle cx="170" cy="25" r="11" fill="#0c1445" />
      {/* Text */}
      <text x="100" y="186" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12"
        fontWeight="bold" fill="#facc15" letterSpacing="3">SILVERBACK</text>
      <text x="100" y="198" textAnchor="middle" fontFamily="sans-serif" fontSize="7"
        fill="#94a3b8" letterSpacing="5">AI AGENCY</text>
    </svg>
  );
}

function Logo6() {
  /* Neural Gorilla – gorilla head built from connected neural-network nodes */
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="200" fill="#020617" rx="12" />
      {/* Neural connections (edges) */}
      {[
        [100,40, 78,60],[100,40,122,60],
        [78,60, 60,80],[78,60,100,80],[78,60,122,60],
        [122,60,100,80],[122,60,140,80],
        [60,80, 68,105],[60,80, 90,100],
        [140,80,132,105],[140,80,110,100],
        [90,100,100,80],[90,100,110,100],[90,100,85,125],
        [110,100,100,80],[110,100,115,125],
        [68,105,85,125],[68,105,75,130],
        [132,105,115,125],[132,105,125,130],
        [85,125,100,140],[115,125,100,140],
        [75,130,90,150],[125,130,110,150],
        [100,140,90,150],[100,140,110,150],
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#1d4ed8" strokeWidth="1" opacity="0.6" />
      ))}
      {/* Nodes forming gorilla shape */}
      {[
        [100,40,4],[78,60,3],[122,60,3],[60,80,3],[100,80,3],[140,80,3],
        [90,100,3],[110,100,3],[68,105,3],[132,105,3],
        [85,125,3],[115,125,3],[75,130,3],[125,130,3],
        [100,140,4],[90,150,3],[110,150,3],
      ].map(([x,y,r],i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#facc15" />
      ))}
      {/* Eye nodes (special) */}
      <circle cx="88" cy="88" r="5" fill="#facc15" />
      <circle cx="112" cy="88" r="5" fill="#facc15" />
      <circle cx="88" cy="88" r="2.5" fill="white" />
      <circle cx="112" cy="88" r="2.5" fill="white" />
      {/* Wordmark */}
      <text x="100" y="178" textAnchor="middle" fontFamily="monospace" fontSize="11"
        fontWeight="bold" fill="#facc15" letterSpacing="3">SILVERBACK</text>
      <text x="100" y="191" textAnchor="middle" fontFamily="monospace" fontSize="7"
        fill="#3b82f6" letterSpacing="5">AI AGENCY</text>
    </svg>
  );
}

function Logo7() {
  /* Protective Reach – big gorilla hand shielding a small human figure */
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="l7bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#l7bg)" rx="12" />
      {/* Large gorilla hand */}
      {/* Palm */}
      <ellipse cx="100" cy="120" rx="55" ry="40" fill="#374151" />
      {/* Fingers */}
      <rect x="50" y="68" width="18" height="55" rx="9" fill="#374151" />
      <rect x="72" y="58" width="18" height="65" rx="9" fill="#4b5563" />
      <rect x="94" y="55" width="18" height="68" rx="9" fill="#4b5563" />
      <rect x="116" y="60" width="18" height="63" rx="9" fill="#4b5563" />
      <rect x="138" y="72" width="16" height="52" rx="8" fill="#374151" />
      {/* Knuckle lines */}
      {[59, 81, 103, 125].map((x, i) => (
        <line key={i} x1={x} y1={85} x2={x + 14} y2={85}
          stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />
      ))}
      {/* Small human figure (protected) */}
      {/* Head */}
      <circle cx="100" cy="105" r="9" fill="#fde68a" />
      {/* Body */}
      <rect x="95" y="114" width="10" height="18" rx="3" fill="#60a5fa" />
      {/* Arms */}
      <line x1="95" y1="117" x2="85" y2="125" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
      <line x1="105" y1="117" x2="115" y2="125" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
      {/* Legs */}
      <line x1="97" y1="132" x2="93" y2="145" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
      <line x1="103" y1="132" x2="107" y2="145" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
      {/* Glow around human */}
      <circle cx="100" cy="120" r="18" fill="none" stroke="#facc15" strokeWidth="1.5" opacity="0.5" />
      {/* Wordmark */}
      <text x="100" y="178" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11"
        fontWeight="bold" fill="#facc15" letterSpacing="3">SILVERBACK</text>
      <text x="100" y="191" textAnchor="middle" fontFamily="sans-serif" fontSize="7"
        fill="#86efac" letterSpacing="5">AI AGENCY</text>
    </svg>
  );
}

function Logo8() {
  /* Half & Half – left side primal gorilla, right side circuit board */
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <clipPath id="l8left">
          <rect x="0" y="0" width="100" height="200" />
        </clipPath>
        <clipPath id="l8right">
          <rect x="100" y="0" width="100" height="200" />
        </clipPath>
      </defs>
      {/* Background split */}
      <rect x="0" y="0" width="100" height="200" fill="#1c1917" />
      <rect x="100" y="0" width="100" height="200" fill="#0f172a" />
      <line x1="100" y1="0" x2="100" y2="200" stroke="#facc15" strokeWidth="2" />

      {/* LEFT: organic gorilla half */}
      <g clipPath="url(#l8left)">
        <ellipse cx="100" cy="88" rx="42" ry="38" fill="#57534e" />
        <rect x="58" y="62" width="84" height="18" rx="9" fill="#292524" />
        <ellipse cx="84" cy="85" rx="9" ry="8" fill="#1c1917" />
        <circle cx="85" cy="84" r="3" fill="#a16207" />
        <ellipse cx="58" cy="90" rx="12" ry="15" fill="#57534e" />
        <ellipse cx="100" cy="100" rx="10" ry="7" fill="#292524" />
        <path d="M58 126 Q70 110 100 108 L100 148 Q75 145 58 126Z" fill="#57534e" />
        <ellipse cx="84" cy="128" rx="10" ry="7" fill="#d6d3d1" />
      </g>

      {/* RIGHT: circuit gorilla half */}
      <g clipPath="url(#l8right)">
        <ellipse cx="100" cy="88" rx="42" ry="38" fill="#1e293b" />
        <rect x="58" y="62" width="84" height="18" rx="9" fill="#0f172a" />
        <ellipse cx="116" cy="85" rx="9" ry="8" fill="#0f172a" />
        <circle cx="115" cy="84" r="3" fill="#facc15" />
        <ellipse cx="142" cy="90" rx="12" ry="15" fill="#1e293b" />
        {/* Circuit traces on right side */}
        <line x1="100" y1="75" x2="130" y2="75" stroke="#22d3ee" strokeWidth="1.5" />
        <line x1="130" y1="75" x2="130" y2="95" stroke="#22d3ee" strokeWidth="1.5" />
        <line x1="130" y1="95" x2="150" y2="95" stroke="#22d3ee" strokeWidth="1.5" />
        <line x1="110" y1="100" x2="110" y2="120" stroke="#22d3ee" strokeWidth="1.5" />
        <line x1="110" y1="120" x2="140" y2="120" stroke="#22d3ee" strokeWidth="1.5" />
        <circle cx="130" cy="75" r="3" fill="#22d3ee" />
        <circle cx="150" cy="95" r="3" fill="#facc15" />
        <circle cx="110" cy="100" r="3" fill="#22d3ee" />
        <circle cx="140" cy="120" r="3" fill="#facc15" />
        <path d="M100 126 Q115 110 142 108 L142 148 Q125 145 100 148Z" fill="#1e293b" />
        <ellipse cx="116" cy="128" rx="10" ry="7" fill="#334155" />
        <line x1="100" y1="130" x2="130" y2="130" stroke="#22d3ee" strokeWidth="1" />
        <line x1="120" y1="115" x2="120" y2="145" stroke="#22d3ee" strokeWidth="1" />
      </g>
      {/* Wordmark */}
      <text x="100" y="175" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10"
        fontWeight="bold" fill="#facc15" letterSpacing="3">SILVERBACK</text>
      <text x="100" y="187" textAnchor="middle" fontFamily="sans-serif" fontSize="7"
        fill="#94a3b8" letterSpacing="5">AI AGENCY</text>
    </svg>
  );
}

function Logo9() {
  /* Compass King – gorilla face inscribed in a compass rose, guiding humanity */
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="l9bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#0f0f23" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill="url(#l9bg)" />
      {/* Compass outer ring */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="#312e81" strokeWidth="2" />
      <circle cx="100" cy="100" r="75" fill="none" stroke="#4338ca" strokeWidth="1" />
      {/* Compass points (N E S W) */}
      <polygon points="100,12 106,30 100,25 94,30" fill="#facc15" />
      <polygon points="188,100 170,106 175,100 170,94" fill="#94a3b8" />
      <polygon points="100,188 94,170 100,175 106,170" fill="#94a3b8" />
      <polygon points="12,100 30,94 25,100 30,106" fill="#94a3b8" />
      <text x="100" y="10" textAnchor="middle" fontSize="8" fill="#facc15" fontWeight="bold">N</text>
      <text x="192" y="104" textAnchor="start" fontSize="8" fill="#94a3b8">E</text>
      <text x="100" y="198" textAnchor="middle" fontSize="8" fill="#94a3b8">S</text>
      <text x="5" y="104" textAnchor="start" fontSize="8" fill="#94a3b8">W</text>
      {/* Tick marks */}
      {Array.from({length: 36}).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        const r1 = 82, r2 = i % 9 === 0 ? 72 : 78;
        return (
          <line key={i}
            x1={100 + r1 * Math.sin(angle)} y1={100 - r1 * Math.cos(angle)}
            x2={100 + r2 * Math.sin(angle)} y2={100 - r2 * Math.cos(angle)}
            stroke="#4338ca" strokeWidth={i % 9 === 0 ? 2 : 1} />
        );
      })}
      {/* Gorilla face */}
      <ellipse cx="100" cy="98" rx="26" ry="24" fill="#374151" />
      <rect x="74" y="82" width="52" height="12" rx="6" fill="#1f2937" />
      <ellipse cx="89" cy="95" rx="6" ry="5" fill="#111827" />
      <ellipse cx="111" cy="95" rx="6" ry="5" fill="#111827" />
      <circle cx="90" cy="94" r="2" fill="#a5b4fc" />
      <circle cx="112" cy="94" r="2" fill="#a5b4fc" />
      <ellipse cx="100" cy="106" rx="7" ry="5" fill="#1f2937" />
      <ellipse cx="74" cy="98" rx="8" ry="10" fill="#374151" />
      <ellipse cx="126" cy="98" rx="8" ry="10" fill="#374151" />
      <path d="M78 122 Q100 115 122 122 Q120 135 100 138 Q80 135 78 122Z" fill="#374151" />
      <ellipse cx="100" cy="126" rx="12" ry="8" fill="#9ca3af" />
      {/* Wordmark */}
      <text x="100" y="168" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9"
        fontWeight="bold" fill="#facc15" letterSpacing="3">SILVERBACK</text>
      <text x="100" y="179" textAnchor="middle" fontFamily="sans-serif" fontSize="6"
        fill="#818cf8" letterSpacing="5">AI AGENCY</text>
    </svg>
  );
}

function Logo10() {
  /* Crown of Wisdom – gorilla with a subtle crown, royal stewardship theme */
  return (
    <svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="l10bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0a2e" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="l10crown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <rect width="200" height="210" fill="url(#l10bg)" rx="14" />
      {/* Decorative corner lines */}
      <line x1="10" y1="10" x2="40" y2="10" stroke="#4c1d95" strokeWidth="1" />
      <line x1="10" y1="10" x2="10" y2="40" stroke="#4c1d95" strokeWidth="1" />
      <line x1="190" y1="10" x2="160" y2="10" stroke="#4c1d95" strokeWidth="1" />
      <line x1="190" y1="10" x2="190" y2="40" stroke="#4c1d95" strokeWidth="1" />
      <line x1="10" y1="200" x2="40" y2="200" stroke="#4c1d95" strokeWidth="1" />
      <line x1="10" y1="200" x2="10" y2="170" stroke="#4c1d95" strokeWidth="1" />
      <line x1="190" y1="200" x2="160" y2="200" stroke="#4c1d95" strokeWidth="1" />
      <line x1="190" y1="200" x2="190" y2="170" stroke="#4c1d95" strokeWidth="1" />
      {/* Crown */}
      <path d="M60 65 L60 42 L80 58 L100 38 L120 58 L140 42 L140 65 Z"
        fill="url(#l10crown)" />
      {/* Crown gems */}
      <circle cx="100" cy="42" r="5" fill="#e879f9" />
      <circle cx="80" cy="56" r="3.5" fill="#22d3ee" />
      <circle cx="120" cy="56" r="3.5" fill="#22d3ee" />
      <circle cx="62" cy="48" r="3" fill="#facc15" />
      <circle cx="138" cy="48" r="3" fill="#facc15" />
      {/* Crown base band */}
      <rect x="60" y="62" width="80" height="8" rx="2" fill="#b45309" />
      {/* Gorilla face */}
      <ellipse cx="100" cy="105" rx="34" ry="32" fill="#3f3f46" />
      <rect x="66" y="86" width="68" height="16" rx="8" fill="#27272a" />
      <ellipse cx="87" cy="102" rx="8" ry="7" fill="#18181b" />
      <ellipse cx="113" cy="102" rx="8" ry="7" fill="#18181b" />
      <circle cx="88" cy="101" r="2.5" fill="#c084fc" />
      <circle cx="114" cy="101" r="2.5" fill="#c084fc" />
      <ellipse cx="100" cy="115" rx="10" ry="7" fill="#27272a" />
      <ellipse cx="66" cy="107" rx="10" ry="13" fill="#3f3f46" />
      <ellipse cx="134" cy="107" rx="10" ry="13" fill="#3f3f46" />
      {/* Body with silver back */}
      <path d="M62 145 Q70 128 100 126 Q130 128 138 145 Q130 162 100 166 Q70 162 62 145Z"
        fill="#3f3f46" />
      <ellipse cx="100" cy="145" rx="20" ry="14" fill="#a1a1aa" />
      {/* Wordmark */}
      <text x="100" y="188" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12"
        fontWeight="bold" fill="#fbbf24" letterSpacing="3">SILVERBACK</text>
      <text x="100" y="200" textAnchor="middle" fontFamily="sans-serif" fontSize="7"
        fill="#a78bfa" letterSpacing="5">AI AGENCY</text>
    </svg>
  );
}

const concepts: LogoConcept[] = [
  {
    id: 1,
    title: 'Classic Silverback',
    tagline: 'The Dignified Elder',
    description:
      'A detailed gorilla portrait ringed by a circuit-trace halo. Classic gold & slate palette — strength meets technology without losing humanity.',
    svg: <Logo1 />,
  },
  {
    id: 2,
    title: 'Shield Guardian',
    tagline: 'Protection First',
    description:
      'A heraldic shield crest with the gorilla at its centre. Signals that Silverback AI shields people — especially those most vulnerable to disruption.',
    svg: <Logo2 />,
  },
  {
    id: 3,
    title: 'Open Hands',
    tagline: 'Strength in Service',
    description:
      'Powerful gorilla arms cupping a glowing orb — humanity. The message: strength used not for dominance but for careful, compassionate stewardship.',
    svg: <Logo3 />,
  },
  {
    id: 4,
    title: 'Minimal Mark',
    tagline: 'Bold Simplicity',
    description:
      'Geometric blocks and negative space form an instantly-recognizable gorilla face. Scales perfectly to a business-card stamp or shirt embroidery.',
    svg: <Logo4 />,
  },
  {
    id: 5,
    title: 'Mountain King',
    tagline: 'Wisdom from Above',
    description:
      'The silverback silhouetted against a moonlit mountain. Evokes perspective, patience, and the long view — wisdom earned through elevation.',
    svg: <Logo5 />,
  },
  {
    id: 6,
    title: 'Neural Gorilla',
    tagline: 'Intelligence Embodied',
    description:
      'The gorilla form emerges from a neural-network of glowing nodes. The AI is not separate from the animal — it is woven into its nature.',
    svg: <Logo6 />,
  },
  {
    id: 7,
    title: 'Protective Reach',
    tagline: 'Nobody Left Behind',
    description:
      'A giant gorilla hand shelters a small human figure. The most direct statement of the agency\'s mission: protecting people in the age of AI.',
    svg: <Logo7 />,
  },
  {
    id: 8,
    title: 'Half & Half',
    tagline: 'Past Meets Future',
    description:
      'Left side — warm, organic, primal. Right side — cool circuit board geometry. One creature, two worlds bridged by a gold dividing line.',
    svg: <Logo8 />,
  },
  {
    id: 9,
    title: 'Compass King',
    tagline: 'Guiding the Way',
    description:
      'The gorilla face inscribed in a navigator\'s compass rose. Silverback AI doesn\'t just understand AI — it helps people find their bearing within it.',
    svg: <Logo9 />,
  },
  {
    id: 10,
    title: 'Crown of Wisdom',
    tagline: 'Royal Stewardship',
    description:
      'A jewelled crown atop the silverback, adorned with an amethyst and cyan gems. Royalty here means responsibility — wisdom wielded with grace.',
    svg: <Logo10 />,
  },
];

export default function SilverbackBranding() {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-4 tracking-widest uppercase">
        Silverback AI — 10 Logo Concepts
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {concepts.map((concept) => (
          <div key={concept.id} className="flex flex-col items-center gap-2">
            <div className="w-full aspect-square">
              {concept.svg}
            </div>
            <p className="text-xs text-center text-gray-400">
              {concept.id}. {concept.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
