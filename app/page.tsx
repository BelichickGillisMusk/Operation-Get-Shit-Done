const painPoints = [
  {
    title: 'Fire drills after midnight',
    detail: 'Pager alerts, brittle handoffs, fragile scripts that break when you are asleep.',
  },
  {
    title: 'Manual glue work',
    detail: 'Copy/paste between tools, spreadsheets as APIs, no single reliable source of truth.',
  },
  {
    title: 'Noisy data, no signal',
    detail: 'Metrics without meaning, dashboards that never change decisions, alerts nobody trusts.',
  },
  {
    title: 'AI with no guardrails',
    detail: 'Agents that hallucinate, workflows without observability, zero incident playbooks.',
  },
];

const weeklyWins = [
  {
    label: 'Week 1',
    title: 'Stabilize the midnight pager',
    points: ['Triage + containment agent', 'Human-in-the-loop when confidence drops', 'Clear observability + rollback'],
  },
  {
    label: 'Week 2',
    title: 'Automate the glue work',
    points: ['APIs before spreadsheets', 'Event-driven jobs, not cron chaos', 'Auditable logs by default'],
  },
  {
    label: 'Week 3',
    title: 'Harden & hand off',
    points: ['Golden paths + runbooks', 'Ownership map for every edge', 'Cloudflare/Vercel ready deploy'],
  },
];

const signals = [
  { label: 'Time to impact', value: '< 10 days', detail: 'First automation in prod-like environments.' },
  { label: 'Coverage', value: 'Cloudflare · Vercel · GCP', detail: 'We deploy where you already run.' },
  { label: 'Reliability', value: 'Humans stay in the loop', detail: 'Controls, approvals, and observability baked in.' },
];

const playbook = [
  {
    title: 'Interrogate the problem',
    detail: 'We start with the thing that keeps you up at night: capture signals, map failure modes, quantify the true cost.',
  },
  {
    title: 'Ship an opinionated fix',
    detail: 'A small, hardening-first automation: typed inputs, approvals, alerts that matter, and rollback.',
  },
  {
    title: 'Operationalize',
    detail: 'Handoff with runbooks, dashboards that do real work, and an owner for every edge case.',
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-black via-[#0b1020] to-black text-white">
      <div className="pointer-events-none absolute -top-40 left-10 h-80 w-80 rounded-full bg-[#3b82f6]/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-0 h-80 w-80 rounded-full bg-[#facc15]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-16">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold">
              Silverback AI Agency
            </span>
            <span className="text-gray-400">Ops + AI strike team</span>
          </div>
          <div className="text-sm text-gray-400">
            We ship calm, reliable systems for the problems that won&apos;t let you sleep.
          </div>
        </header>

        <section className="mt-12 grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">What keeps you up at night?</p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              We hunt the fire that wakes you at 2am and ship an automation that puts it out.
            </h1>
            <p className="text-lg text-gray-300">
              Tell us the scariest, most expensive thing on your mind. We pair operational discipline with AI so your
              team stops babysitting brittle scripts and starts sleeping through the night.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:hello@silverbackai.agency?subject=What%20keeps%20you%20up%20at%20night"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
              >
                Send the fire drill
              </a>
              <a
                href="#offerings"
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white hover:-translate-y-0.5"
              >
                See how we work
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {painPoints.map((pain) => (
                <div
                  key={pain.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_10px_40px_-25px_rgba(255,255,255,0.4)]"
                >
                  <p className="text-base font-semibold">{pain.title}</p>
                  <p className="mt-2 text-sm text-gray-300">{pain.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_-35px_rgba(59,130,246,0.6)] backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Deployment track</p>
                <p className="text-lg font-semibold">What the next 3 weeks look like</p>
              </div>
              <span className="rounded-full bg-[#facc15]/10 px-3 py-1 text-xs font-semibold text-[#facc15]">
                Cloudflare ready
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {weeklyWins.map((week) => (
                <div key={week.label} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#facc15]">
                      {week.label}
                    </span>
                    <p className="text-base font-semibold">{week.title}</p>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-gray-300">
                    {week.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#3b82f6]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#3b82f6]/10 px-4 py-3 text-sm text-gray-100">
              We ship inside your stack: Cloudflare Workers/Pages, Vercel, GCP. No new platform required.
            </div>
          </div>
        </section>

        <section id="offerings" className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Signals</p>
              <h2 className="text-2xl font-semibold">How you know we&apos;re the right crew</h2>
            </div>
            <div className="text-sm text-gray-300">
              Clear owners, measurable uptime, and no hallucinated promises.
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {signals.map((signal) => (
              <div key={signal.label} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#facc15]">{signal.label}</p>
                <p className="mt-2 text-2xl font-semibold">{signal.value}</p>
                <p className="mt-2 text-sm text-gray-300">{signal.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {playbook.map((step, idx) => (
            <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-gray-200">
                  Step {idx + 1}
                </span>
                <span className="text-xs text-gray-400">No fluff, just delivery</span>
              </div>
              <p className="mt-4 text-lg font-semibold">{step.title}</p>
              <p className="mt-3 text-sm text-gray-300">{step.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-transparent p-8">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Ready to sleep again?</p>
              <h3 className="text-2xl font-semibold">Drop the problem on our desk.</h3>
              <p className="text-sm text-gray-300">
                Send the pager noise, the failing script, or the messy spreadsheet workflow. We&apos;ll turn it into a
                controlled, observable system and hand it back with runbooks and owners.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:hello@silverbackai.agency?subject=Ship%20this%20before%20it%20breaks%20again"
                  className="rounded-full bg-[#facc15] px-4 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#facc15]/40"
                >
                  Start with an email
                </a>
                <a
                  href="https://silverbackai.agency"
                  className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white hover:-translate-y-0.5"
                >
                  silverbackai.agency
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-gray-200">
              <div className="flex items-center gap-2 text-[#3b82f6]">
                <span className="h-2 w-2 rounded-full bg-[#facc15]" />
                <p className="font-semibold">Guardrails first, then polish.</p>
              </div>
              <p className="mt-3 text-gray-300">
                We build in approvals, audit logs, and observability before the shiny UI. AI is only as good as the
                systems that catch it when it drifts. We make sure you can see and steer every step.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
