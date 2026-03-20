import { NextResponse } from 'next/server';

const capabilities = {
  lastUpdated: '2026-03-20',
  owner: 'Bryan — NorCal CARB Mobile',
  team: 'Bryan-Claude-Musk — BEST TEAM EVER',

  domains: {
    'norcalcarbmobile.com': {
      purpose: 'NorCal CARB Mobile — smog business (customer-facing)',
      hosting: 'Squarespace (last non-Cloudflare property, migrating soon)',
    },
    'carbcleantruckcheck.app': {
      purpose: 'CARB Clean Truck Check compliance app',
      hosting: 'Cloudflare',
    },
    'silverbackai.agency': {
      purpose: 'SilverbackAI — AI agency',
      hosting: 'Cloudflare',
    },
    'dmcproperties': {
      purpose: 'DMC Properties — real estate/property project',
      hosting: 'Cloudflare',
    },
    'chigbulaws.com': {
      purpose: 'Law-related site',
      hosting: 'Cloudflare',
    },
  },

  connectedServices: {
    figma: {
      name: 'Figma',
      category: 'Design',
      capabilities: [
        'Pull design context and convert to code',
        'Get screenshots of any Figma frame/component',
        'Read design metadata, tokens, and variables',
        'Create FigJam diagrams for planning',
        'Map Figma components to codebase via Code Connect',
        'Read component documentation and annotations',
      ],
    },
    cloudflare: {
      name: 'Cloudflare',
      category: 'Infrastructure',
      capabilities: [
        'List, create, query, and delete D1 databases',
        'Manage KV namespaces (CRUD)',
        'Manage R2 buckets (object storage)',
        'List, inspect, and read Worker code',
        'Configure Hyperdrive connections',
        'Search Cloudflare documentation',
        'Set active account',
        'Manage DNS for all domains',
      ],
    },
    asana: {
      name: 'Asana',
      category: 'Project Management',
      capabilities: [
        'Create, update, delete, and search tasks',
        'Create projects and project statuses',
        'Manage goals and goal metrics',
        'Organize portfolios and sections',
        'Set task dependencies and dependents',
        'Add comments (stories) to tasks',
        'Manage followers on tasks',
        'Typeahead search across workspace',
        'List teams, users, and workspaces',
        'Track time periods and allocations',
        'Read attachments on tasks',
      ],
    },
    slack: {
      name: 'Slack',
      category: 'Communication',
      capabilities: [
        'Send messages to any channel',
        'Send draft messages for review before sending',
        'Schedule messages for future delivery',
        'Read channels and threads',
        'Search public and private channels',
        'Search for users',
        'Create, read, and update canvases (docs)',
        'Read user profiles',
      ],
    },
    gmail: {
      name: 'Gmail',
      category: 'Email',
      capabilities: [
        'Search messages with Gmail search syntax',
        'Read individual messages and full threads',
        'Create email drafts',
        'List drafts',
        'List email labels',
        'Get profile info',
      ],
    },
    googleCalendar: {
      name: 'Google Calendar',
      category: 'Scheduling',
      capabilities: [
        'List all calendars',
        'List, create, update, and delete events',
        'Find available meeting times with others',
        'Find Bryan\'s free time slots',
        'Respond to event invitations (accept/decline)',
      ],
    },
    stripe: {
      name: 'Stripe',
      category: 'Payments',
      capabilities: [
        'Read customer records',
        'Pull balance transactions and revenue data',
        'Track month-to-date revenue',
        'Customer count tracking',
      ],
      note: 'Integrated via /api/stats route in GM Command Center',
    },
    twilio: {
      name: 'Twilio',
      category: 'SMS',
      capabilities: [
        'Send SMS notifications to Bryan',
        'Configurable sender/receiver numbers',
      ],
      note: 'Claude-managed — Bryan does not interact with Twilio directly',
    },
  },

  aiStack: {
    primary: {
      name: 'Claude MAX (Anthropic)',
      usage: 'Primary AI — Claude Code CLI, chat, API, automation',
      models: 'Claude 4.x family, Claude 3.5 Sonnet',
      customBots: ['Milla-claude-2426'],
    },
    secondary: {
      name: 'Gemini Pro / Gemini Developer (Google)',
      usage: 'API access, Google AI Studio',
    },
  },

  claudeCodeSkills: {
    commit: 'Create git commits with proper formatting and messages',
    'review-pr': 'Review pull requests for quality and issues',
    simplify: 'Review changed code for reuse, quality, and efficiency',
    loop: 'Run commands or skills on recurring intervals (e.g., every 5 minutes)',
    'claude-api': 'Build apps with Claude API / Anthropic SDK',
    'session-start-hook': 'Set up repository hooks for Claude Code web sessions',
    'update-config': 'Configure Claude Code settings, hooks, permissions, and env vars',
    'keybindings-help': 'Customize keyboard shortcuts and bindings',
  },

  techStack: {
    infrastructure: 'Cloudflare (Workers, D1, KV, R2, Pages, Hyperdrive, DNS)',
    ai: 'Claude MAX (primary) + Gemini Pro (secondary)',
    automation: 'OpenClaw + Claude Code (replaced Make.com)',
    frontend: 'Next.js 14 + TypeScript + Tailwind CSS (Claude-managed)',
    payments: 'Stripe (primary), PayPal (secondary)',
    sms: 'Twilio (Claude-managed)',
    hosting: 'Cloudflare Pages (target for all projects)',
  },

  projectPlanningChecklist: [
    'Does it need a database? → Cloudflare D1',
    'Does it need file storage? → Cloudflare R2',
    'Does it need caching or config? → Cloudflare KV',
    'Does it need an API? → Cloudflare Worker',
    'Does it need a UI? → Cloudflare Pages',
    'Does it need AI (primary)? → Claude API',
    'Does it need AI (secondary)? → Gemini API / AI Studio',
    'Does it need automation? → OpenClaw + Claude Code',
    'Does it need to send emails? → Gmail MCP',
    'Does it need to send texts? → Twilio (Claude sets it up)',
    'Does it need team notifications? → Slack MCP',
    'Does it need scheduling? → Google Calendar MCP',
    'Does it need task tracking? → Asana MCP',
    'Does it need design work? → Figma MCP',
    'Does it need payments? → Stripe',
    'Does it need a domain? → Cloudflare DNS',
  ],
};

export async function GET() {
  return NextResponse.json(capabilities, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
