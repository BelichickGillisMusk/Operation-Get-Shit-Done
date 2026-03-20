import { NextResponse } from 'next/server';

const capabilities = {
  lastUpdated: '2026-03-20',
  owner: 'Bryan Gillis — NorCal CARB Mobile',

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
      note: 'Integrated via /api/notify route in GM Command Center',
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
  },

  techStack: {
    primary: {
      infrastructure: 'Cloudflare (Workers, D1, KV, R2, Pages, Hyperdrive)',
      ai: 'Claude / Anthropic API (@anthropic-ai/sdk)',
      automation: 'OpenClaw + Make.com',
      frontend: 'Next.js 14 + TypeScript + Tailwind CSS',
      payments: 'Stripe (primary), PayPal (secondary)',
      sms: 'Twilio',
      website: 'Squarespace (norcalcarbmobile.com)',
    },
    hosting: {
      current: 'Vercel (migrating to Cloudflare Pages)',
      target: 'Cloudflare Pages',
    },
  },

  projectPlanningChecklist: [
    'Does it need a database? → Cloudflare D1',
    'Does it need file storage? → Cloudflare R2',
    'Does it need caching or config? → Cloudflare KV',
    'Does it need an API? → Cloudflare Worker',
    'Does it need a UI? → Next.js on Cloudflare Pages',
    'Does it need AI? → Claude API',
    'Does it need automation? → OpenClaw or Make.com',
    'Does it need to send emails? → Gmail integration',
    'Does it need to send texts? → Twilio',
    'Does it need team notifications? → Slack',
    'Does it need scheduling? → Google Calendar',
    'Does it need task tracking? → Asana',
    'Does it need design work? → Figma',
    'Does it need payments? → Stripe',
  ],
};

export async function GET() {
  return NextResponse.json(capabilities, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
