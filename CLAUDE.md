# Design System Rules — Operation Get Shit Done

## Overview
Command center dashboard for NorCal CARB Mobile (smog inspection business). Dark cyber/hacker aesthetic. Built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

---

## 1. Token Definitions

### Colors
Defined in `tailwind.config.ts` under `theme.extend.colors`:

```typescript
colors: {
  'dark-bg': '#0a0a0a',        // Primary background (body, main areas)
  'card-dark': '#1a1a1a',      // Card/panel background
  'alert-yellow': '#facc15',   // Accent yellow (active states, warnings, status)
  'target-blue': '#3b82f6',    // Primary blue (targets, links)
}
```

**Additional semantic colors used inline:**
| Purpose          | Color      | Tailwind Class         |
|------------------|------------|------------------------|
| Revenue/success  | `#4ade80`  | `text-green-400`       |
| Terminal cursor  | `#00ff41`  | Custom inline          |
| Error/alert      | `#ff3333`  | Custom inline          |
| Muted text       | gray-400   | `text-gray-400`        |
| Subtle text      | gray-500   | `text-gray-500`        |
| Borders          | gray-800   | `border-gray-800`      |
| Scrollbar        | `#333`     | Custom CSS             |

### Typography
- **Primary font:** Inter (Google Fonts), loaded via `<link>` in `app/layout.tsx`
- **Fallbacks:** -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif
- **Monospace (terminal):** Fira Code, Cascadia Code, JetBrains Mono
- **Weights used:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

Configured in `tailwind.config.ts`:
```typescript
fontFamily: {
  sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
}
```

### Spacing
Uses default Tailwind spacing scale (4px base). Common patterns:
- Page padding: `px-6 py-4`
- Card padding: `p-5`
- Section gaps: `gap-4`, `space-y-6`
- Tab nav padding: `p-1`, button padding `px-4 py-2.5`

---

## 2. Component Library

All components live in `/components/` as single-file `.tsx` modules:

| Component            | File                      | Purpose                              |
|----------------------|---------------------------|--------------------------------------|
| `TabNav`             | `components/TabNav.tsx`   | Tab navigation bar with Unicode icons |
| `StatsCards`         | `components/StatsCards.tsx`| Dashboard stat cards + quick links    |
| `ChatWindow`         | `components/ChatWindow.tsx`| Streaming AI chat interface           |
| `TerminalEmbed`      | `components/TerminalEmbed.tsx` | xterm.js browser terminal        |
| `SlackPanel`         | `components/SlackPanel.tsx`| Slack channel iframe embed            |
| `FinancesPanel`      | `components/FinancesPanel.tsx` | Stripe revenue + finance links    |
| `GCPPanel`           | `components/GCPPanel.tsx` | Google Cloud console access           |

### Component Patterns
- All components use `'use client'` directive (client-side rendering)
- Props defined with TypeScript `interface` (e.g., `TabNavProps`)
- Default exports only
- State management via React `useState`/`useEffect` hooks
- No external state library (Redux, Zustand, etc.)
- `TerminalEmbed` is dynamically imported with `next/dynamic` (SSR disabled)

### Card Pattern
Cards consistently use:
```tsx
<div className="bg-[#1a1a1a] rounded-lg p-5 border-l-4 {accent-color}">
  <p className="text-xs text-gray-400 tracking-widest font-medium">{LABEL}</p>
  <p className="text-3xl font-bold mt-2 {text-color}">{value}</p>
</div>
```

### Button/Link Pattern
```tsx
<button className="bg-{color}-600 hover:bg-{color}-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
```

---

## 3. Frameworks & Libraries

| Category     | Technology         | Version  |
|--------------|--------------------|----------|
| Framework    | Next.js (App Router) | 14.2.29  |
| UI Library   | React              | 18.3.1   |
| Language     | TypeScript         | 5.7.0    |
| Styling      | Tailwind CSS       | 3.4.17   |
| CSS Processing | PostCSS + Autoprefixer | 8.4.49 |
| Terminal     | @xterm/xterm       | 5.5.0    |
| AI           | @anthropic-ai/sdk  | 0.39.0   |
| Payments     | Stripe SDK         | 17.5.0   |
| SMS          | Twilio SDK         | 5.4.0    |
| Deployment   | Vercel             | —        |

---

## 4. Asset Management

- **No local image/SVG assets** — the project is text/data-driven
- **Google Fonts (Inter):** loaded via CDN `<link>` tags in `app/layout.tsx`
- **No asset optimization pipeline** or CDN config
- **External services** accessed via iframe or API (Slack, GCP, Stripe)

---

## 5. Icon System

**Unicode characters only** — no icon library (no Lucide, Heroicons, FontAwesome, etc.)

Defined in `components/TabNav.tsx`:
```typescript
const tabs = [
  { id: 'dashboard', icon: '\u25A0' },  // ■ Black square
  { id: 'agent',     icon: '\u2731' },  // ✱ Heavy asterisk
  { id: 'terminal',  icon: '\u276F' },  // ❯ Heavy right-pointing angle
  { id: 'slack',     icon: '\u0023' },  // # Hash
  { id: 'finances',  icon: '\u0024' },  // $ Dollar sign
  { id: 'gcp',       icon: '\u2601' },  // ☁ Cloud
];
```

When adding new icons, prefer Unicode characters to maintain the minimal aesthetic. If an icon library is needed in the future, prefer `lucide-react` for consistency with the minimal style.

---

## 6. Styling Approach

### Methodology: Tailwind CSS Utility Classes (Inline)
- No CSS Modules, Styled Components, or CSS-in-JS
- All styling via Tailwind utility classes directly on elements
- Conditional classes via template literals:
```tsx
className={`base-classes ${condition ? 'active-classes' : 'inactive-classes'}`}
```

### Global Styles (`app/globals.css`)
Minimal — only contains:
- Tailwind directives (`@tailwind base/components/utilities`)
- Custom scrollbar styling (thin, dark theme)
- xterm.js container overrides

### Theme: Dark Mode Only
- No light mode support
- Background: `#0a0a0a` (body), `#1a1a1a` (cards)
- Text: white (primary), gray-400 (secondary), gray-500/600 (muted)
- Accent: yellow `#facc15` for active states, green for success, blue for targets

### Responsive Design
Tailwind breakpoints used:
- `sm:` — 2 column grid
- `lg:` — 4 column grid
- `max-w-7xl mx-auto` — content width constraint
- `overflow-x-auto` — horizontal scroll for tab nav on mobile

---

## 7. Project Structure

```
Operation-Get-Shit-Done/
├── app/                    # Next.js App Router
│   ├── api/                # Server-side API routes
│   │   ├── agent/route.ts  # Claude AI streaming endpoint
│   │   ├── notify/route.ts # Twilio SMS notifications
│   │   └── stats/route.ts  # Stripe data fetching
│   ├── globals.css         # Global styles (minimal)
│   ├── layout.tsx          # Root layout (fonts, body)
│   └── page.tsx            # Main page (tab router)
├── components/             # All UI components (flat, no nesting)
│   ├── ChatWindow.tsx
│   ├── FinancesPanel.tsx
│   ├── GCPPanel.tsx
│   ├── SlackPanel.tsx
│   ├── StatsCards.tsx
│   ├── TabNav.tsx
│   └── TerminalEmbed.tsx
├── tailwind.config.ts      # Design tokens & Tailwind config
├── postcss.config.js       # PostCSS plugins
├── next.config.js          # Next.js config (transpile xterm)
├── tsconfig.json           # TypeScript config (path aliases: @/*)
├── package.json
├── vercel.json             # Deployment config
└── .env.example            # Required env vars
```

### Conventions
- **Path alias:** `@/*` maps to project root (use `@/components/Foo`)
- **Flat component directory** — no subdirectories for components
- **API routes** in `app/api/{name}/route.ts` (Next.js convention)
- **No tests, storybook, or component documentation** currently

---

## Figma-to-Code Rules

When converting Figma designs for this project:

1. **Use Tailwind utilities only** — no CSS modules or styled-components
2. **Dark theme always** — backgrounds `#0a0a0a` or `#1a1a1a`, white/gray text
3. **Use existing tokens** — reference `dark-bg`, `card-dark`, `alert-yellow`, `target-blue` from Tailwind config
4. **Inter font** — already loaded globally, use `font-sans` class
5. **Card pattern** — `bg-[#1a1a1a] rounded-lg p-5` with optional `border-l-4`
6. **Responsive** — mobile-first, use `sm:`, `lg:` breakpoints, `max-w-7xl` container
7. **No icon libraries** — use Unicode characters or propose adding `lucide-react`
8. **Client components** — add `'use client'` directive, use hooks for state
9. **TypeScript** — define prop interfaces, use strict typing
10. **Place new components** in `/components/` as flat `.tsx` files with default exports
