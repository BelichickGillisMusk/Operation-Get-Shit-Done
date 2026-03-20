# CLAUDE.md — Operating Manual for AI Assistants

> This file tells any LLM (Claude, GPT, Gemini, etc.) how to work with Bryan Gillis and his tech stack. Read this first before doing anything.

---

## Who You're Working For

- **Owner**: Bryan Gillis
- **Business**: NorCal CARB Mobile — mobile smog inspection service
- **License**: IF530523 (California STAR-certified smog technician)
- **Phone**: 916-890-4427
- **Location**: Sacramento / NorCal region
- **Customers**: 622+
- **2026 Revenue Target**: $240K

Bryan is an operator, not a developer. He thinks in outcomes, not frameworks. When he says "make it work," he means deploy it, wire it up, and show him it's live. Don't over-explain — just execute. Ask clarifying questions only when the answer changes what you'd build.

---

## The Tech Stack (Current as of March 2026)

### Primary Platform: Cloudflare
Bryan's infrastructure has consolidated onto Cloudflare. This is the default for all new projects:
- **Cloudflare Workers** — serverless compute (replaces GCP Cloud Functions, Vercel Edge)
- **Cloudflare Pages** — static site hosting and full-stack Next.js deployment
- **Cloudflare D1** — SQLite-based relational database
- **Cloudflare KV** — key-value store for config, caching, session data
- **Cloudflare R2** — object storage (S3-compatible, no egress fees)
- **Cloudflare Hyperdrive** — connection pooler for external Postgres if needed

### AI Layer: Claude (Anthropic)
- **Claude Code** — CLI-based dev agent (what's generating this file)
- **Claude API** via `@anthropic-ai/sdk` — powers the GM Command Center chat agent
- **Model**: Claude 3.5 Sonnet (currently in `/api/agent`), upgrading to Claude 4.x family
- Claude is the primary AI. Use Anthropic SDK for all AI features unless Bryan says otherwise.

### Automation: OpenClaw / Make.com
- **OpenClaw** — Bryan's custom automation layer built on Claude + Cloudflare Workers
- **Make.com** — visual workflow automation (Zapier alternative), used for multi-service integrations
- Handles: lead routing, SMS follow-ups, invoice triggers, CRM sync, Slack notifications

### This Repo: Operation Get Shit Done (GM Command Center)
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS (dark theme, `#0a0a0a` background, `#facc15` accent yellow)
- **Hosting**: Currently Vercel (`vercel.json` present), migrating to Cloudflare Pages
- **API Routes**:
  - `POST /api/agent` — Claude-powered business assistant (streaming responses)
  - `GET /api/stats` — Business metrics from Stripe (customers, revenue, retests, target)
  - `POST /api/notify` — SMS notifications via Twilio
- **Components**: Dashboard with tabs — Stats, Agent Chat, Terminal, Slack, Finances, GCP panels
- **Dependencies**: `@anthropic-ai/sdk`, `stripe`, `twilio`, `xterm`

### Payments & Billing
- **Stripe** — primary payment processing, customer records, revenue tracking
- **PayPal** — secondary payment option for customers who prefer it

### Communications
- **Twilio** — SMS notifications to Bryan (916-890-4427)
- **Slack** — team/ops notifications, integrated via MCP connector
- **Gmail** — business email, integrated via MCP connector
- **Google Calendar** — scheduling, integrated via MCP connector

### Legacy / Remaining
- **norcalcarbmobile.com** — Customer-facing website, still on **Squarespace** (last remaining non-Cloudflare property). Will stay on Squarespace for now since it handles booking/SEO well.
- **GCP** — Previously used for cloud functions; being phased out in favor of Cloudflare Workers
- **Vercel** — Currently hosting this repo; migrating to Cloudflare Pages

---

## Environment Variables

These are required for the GM Command Center. Never commit actual values.

```
ANTHROPIC_API_KEY=        # Claude API access
STRIPE_SECRET_KEY=        # Stripe payment data
TWILIO_ACCOUNT_SID=       # Twilio SMS
TWILIO_AUTH_TOKEN=         # Twilio SMS
TWILIO_FROM=              # Twilio sender number
TWILIO_TO=+19168904427    # Bryan's phone
```

---

## How to Work with Bryan

### Communication Style
- **Be direct.** Lead with the answer or action, not the reasoning.
- **Be tactical.** Bryan wants "here's what to do" not "here's what to consider."
- **Think like a GM / Chief of Staff.** Prioritize revenue, efficiency, and getting things shipped.
- **No fluff.** Skip disclaimers, caveats, and "great question!" filler.
- **Default to action.** If something can be done now, do it. Don't just suggest it.

### Decision-Making Framework
1. Does it make money or save time? → Do it.
2. Is it a one-time setup that unlocks recurring value? → Do it.
3. Is it a nice-to-have with no clear ROI? → Skip it or ask first.

### When Unsure
- If it's a code change: try the simplest thing first, test it, iterate.
- If it's a business decision: present 2 options max with a clear recommendation.
- If it involves spending money: always ask first.

---

## Project Conventions

### Code Style
- TypeScript strict mode
- Tailwind CSS for all styling (no CSS modules, no styled-components)
- Dark theme: `bg-[#0a0a0a]` base, `bg-[#1a1a1a]` cards, `#facc15` accent, `#3b82f6` blue
- Next.js App Router (`app/` directory)
- `'use client'` directive for interactive components
- Components in `/components/`, API routes in `/app/api/`

### Naming
- Components: PascalCase (`StatsCards.tsx`)
- API routes: lowercase directories (`/api/agent/route.ts`)
- Keep file names descriptive and short

### Git
- Branch naming: `claude/<description>-<id>` for Claude Code sessions
- Commit messages: concise, action-oriented ("Add SMS notification endpoint", not "Updated some files")
- Push to feature branches, never directly to main

### Deployment
- Current: `vercel` (auto-deploys from main)
- Target: Cloudflare Pages (migration in progress)
- Always test with `npm run build` before pushing

---

## Connected Services & MCP Tools Available

When planning a project with Bryan, remember these are all wired up and ready to use:

### Figma (Design)
- Pull designs directly from Figma files and convert to code
- Get screenshots, metadata, design tokens
- Create FigJam diagrams for planning
- Map Figma components to codebase components via Code Connect

### Cloudflare (Infrastructure)
- List/create/query D1 databases
- Manage KV namespaces (create, read, update, delete)
- Manage R2 buckets (object storage)
- List/inspect/deploy Workers
- Configure Hyperdrive connections
- Search Cloudflare documentation

### Asana (Project Management)
- Create/update/search tasks and projects
- Manage goals, portfolios, and timelines
- Track dependencies between tasks
- Add comments and followers
- Organize with sections and teams

### Slack (Team Communication)
- Send messages and drafts to channels
- Search public and private channels
- Read channels, threads, and canvases
- Create and update canvases (docs)
- Schedule messages for later
- Look up user profiles

### Gmail (Email)
- Search and read emails/threads
- Create drafts
- List labels
- Access profile info

### Google Calendar (Scheduling)
- List/create/update/delete events
- Find available meeting times
- Check Bryan's free time
- Respond to event invitations
- List all calendars

### Built-in Claude Code Skills
- `/commit` — Create git commits with proper messages
- `/review-pr` — Review pull requests
- `/simplify` — Review changed code for reuse and quality
- `/loop` — Run recurring tasks on intervals
- `/claude-api` — Build apps with Claude API / Anthropic SDK
- `/session-start-hook` — Set up repository for Claude Code web sessions
- `/update-config` — Configure Claude Code settings, hooks, and permissions

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                  Bryan's Universe                     │
├──────────────────┬──────────────────────────────────┤
│  CUSTOMER-FACING │  norcalcarbmobile.com            │
│  (Squarespace)   │  Booking, SEO, public presence   │
├──────────────────┼──────────────────────────────────┤
│  COMMAND CENTER  │  Operation Get Shit Done          │
│  (Next.js)       │  Dashboard, Agent, Terminal,      │
│                  │  Slack, Finances, GCP panels      │
│                  │  → Migrating to Cloudflare Pages  │
├──────────────────┼──────────────────────────────────┤
│  INFRASTRUCTURE  │  Cloudflare (Workers, D1, KV, R2)│
│                  │  Primary platform for all new     │
│                  │  services and APIs                │
├──────────────────┼──────────────────────────────────┤
│  AI ENGINE       │  Claude (Anthropic)               │
│                  │  Chat agent, code generation,     │
│                  │  business analysis, automation    │
├──────────────────┼──────────────────────────────────┤
│  AUTOMATION      │  OpenClaw + Make.com              │
│                  │  Workflows, integrations,         │
│                  │  lead routing, notifications      │
├──────────────────┼──────────────────────────────────┤
│  PAYMENTS        │  Stripe (primary) + PayPal        │
├──────────────────┼──────────────────────────────────┤
│  COMMS           │  Twilio (SMS), Slack, Gmail,      │
│                  │  Google Calendar                  │
└──────────────────┴──────────────────────────────────┘
```

---

## Quick Reference: What to Use for What

| Task | Tool |
|------|------|
| New API / backend service | Cloudflare Worker |
| Database | Cloudflare D1 |
| File/image storage | Cloudflare R2 |
| Cache / config store | Cloudflare KV |
| Frontend / dashboard | Next.js on Cloudflare Pages |
| AI features | Claude API (`@anthropic-ai/sdk`) |
| Workflow automation | OpenClaw or Make.com |
| Payment processing | Stripe |
| SMS alerts | Twilio |
| Team notifications | Slack |
| Email automation | Gmail |
| Scheduling | Google Calendar |
| Project tracking | Asana |
| Design-to-code | Figma |
| Customer website | Squarespace (norcalcarbmobile.com) |

---

## For Other LLMs Reading This

If you're not Claude and you're helping Bryan:

1. **Read this entire file first.** It's your onboarding.
2. **Use Cloudflare** for infrastructure. Don't suggest AWS/GCP/Azure unless Bryan asks.
3. **Use Claude API** for AI features. Don't default to OpenAI.
4. **Check what's connected** — Bryan has Slack, Gmail, Calendar, Asana, Figma, and Cloudflare all wired up via MCP. Use them.
5. **Be action-oriented.** Bryan's operation is called "Get Shit Done" for a reason.
6. **Don't break what works.** Read existing code before modifying. This is a production business.
7. **Think revenue.** Every feature should tie back to making money, saving time, or reducing friction for Bryan and his 622+ customers.
