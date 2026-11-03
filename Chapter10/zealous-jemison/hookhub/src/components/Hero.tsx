import type { Hook } from '@/types/hook';

interface HeroProps {
  hooks: Hook[];
}

function formatCompact(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n);
}

const logLines: { event: string; detail: string; tone: 'ok' | 'warn' | 'info' }[] = [
  { event: 'UserPromptSubmit', detail: 'prompt logged', tone: 'info' },
  { event: 'PreToolUse', detail: 'Bash: rm -rf ./dist  → blocked', tone: 'warn' },
  { event: 'PreToolUse', detail: 'Edit: src/app/page.tsx  → allowed', tone: 'ok' },
  { event: 'PostToolUse', detail: 'prettier + eslint  → clean', tone: 'ok' },
  { event: 'Stop', detail: 'desktop notification sent', tone: 'info' },
];

const toneClass = {
  ok: 'text-[var(--accent-green)]',
  warn: 'text-[var(--accent)]',
  info: 'text-[var(--accent-blue)]',
} as const;

export default function Hero({ hooks }: HeroProps) {
  const totalStars = hooks.reduce((sum, h) => sum + (h.stars ?? 0), 0);
  const languages = new Set(hooks.map((h) => h.language)).size;
  const stats = [
    { value: String(hooks.length), label: 'curated hooks' },
    { value: formatCompact(totalStars), label: 'GitHub stars' },
    { value: String(languages), label: 'languages' },
  ];

  return (
    <section className="hero relative isolate py-16 md:py-24 lg:py-28">
      {/* Decorative background */}
      <div aria-hidden="true" className="hero-orb hero-orb-a" />
      <div aria-hidden="true" className="hero-orb hero-orb-b" />
      <div aria-hidden="true" className="hero-grid" />

      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        {/* Copy */}
        <div className="min-w-0">
          <div className="hero-rise inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--light-gray)]/60 px-3.5 py-1.5 text-xs font-medium text-[var(--slate-light)] backdrop-blur-sm">
            <span className="hero-dot" aria-hidden="true" />
            Community hooks for Claude Code
          </div>

          <h1
            className="hero-rise mt-7 text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-medium leading-[1.04] tracking-[-0.025em] text-[var(--foreground)]"
            style={{ animationDelay: '80ms', fontFamily: 'var(--font-lora), Georgia, serif' }}
          >
            Make Claude Code
            <br />
            work <span className="hero-underline text-[var(--accent)] italic">your way.</span>
          </h1>

          <p
            className="hero-rise mt-7 max-w-xl text-lg md:text-xl leading-relaxed text-[var(--slate-light)]"
            style={{ animationDelay: '160ms' }}
          >
            Hooks run your own code at every step of the agent loop. Discover
            battle-tested guardrails, automations and notifications built by the
            community, and drop them straight into your workflow.
          </p>

          <div
            className="hero-rise mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: '240ms' }}
          >
            <a
              href="#all-hooks"
              className="group inline-flex items-center gap-2 rounded-xl bg-[var(--foreground)] px-6 py-3.5 font-medium text-[var(--background)] transition-all duration-200 hover:bg-[var(--accent)] hover:text-white hover:shadow-lg hover:shadow-[#d97757]/25"
            >
              Browse hooks
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
            <button className="rounded-xl border border-[var(--border)] px-6 py-3.5 font-medium text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]">
              Submit a hook
            </button>
          </div>

          <dl
            className="hero-rise mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-[var(--border)] pt-7"
            style={{ animationDelay: '320ms' }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-[var(--foreground)]" style={{ fontFamily: 'var(--font-poppins), Arial, sans-serif' }}>
                  {s.value}
                  <span className="mt-1 block text-sm font-normal tracking-normal text-[var(--slate-light)]" aria-hidden="true">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Terminal visual */}
        <div className="hero-rise relative min-w-0" style={{ animationDelay: '200ms' }} aria-hidden="true">
          <div className="hero-glow" />
          <div className="hero-float relative overflow-hidden rounded-2xl border border-white/10 bg-[#141413] shadow-2xl shadow-black/20">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#d97757]" />
              <span className="h-3 w-3 rounded-full bg-[#b0aea5]/60" />
              <span className="h-3 w-3 rounded-full bg-[#788c5d]" />
              <span className="ml-3 text-xs text-[#b0aea5]" style={{ fontFamily: 'var(--font-poppins), Arial, sans-serif' }}>
                ~/.claude/settings.json
              </span>
            </div>

            <pre className="overflow-x-auto px-5 pt-5 text-[13px] leading-6 text-[#e8e6dc] font-mono">
              <code>
                <span className="text-[#b0aea5]">{'{'}</span>{'\n'}
                {'  '}<span className="text-[#6a9bcc]">&quot;hooks&quot;</span>: {'{'}{'\n'}
                {'    '}<span className="text-[#6a9bcc]">&quot;PreToolUse&quot;</span>: [{'{'}{'\n'}
                {'      '}<span className="text-[#6a9bcc]">&quot;matcher&quot;</span>: <span className="text-[#d97757]">&quot;Bash&quot;</span>,{'\n'}
                {'      '}<span className="text-[#6a9bcc]">&quot;command&quot;</span>: <span className="text-[#d97757]">&quot;./guard.py&quot;</span>{'\n'}
                {'    '}{'}'}]{'\n'}
                {'  '}{'}'}{'\n'}
                <span className="text-[#b0aea5]">{'}'}</span>
              </code>
            </pre>

            <div className="mt-4 border-t border-white/10 bg-black/20 px-5 py-4 font-mono text-[12.5px] leading-6">
              {logLines.map((line, i) => (
                <div
                  key={i}
                  className="hero-log flex gap-3 whitespace-nowrap"
                  style={{ animationDelay: `${700 + i * 450}ms` }}
                >
                  <span className="text-[#b0aea5]/70">▸</span>
                  <span className="w-[8.5rem] shrink-0 text-[#faf9f5]">{line.event}</span>
                  <span className={`truncate ${toneClass[line.tone]}`}>{line.detail}</span>
                </div>
              ))}
              <div className="hero-log mt-1 flex items-center gap-2 text-[#b0aea5]" style={{ animationDelay: `${700 + logLines.length * 450}ms` }}>
                <span className="text-[#d97757]">❯</span>
                <span className="hero-caret" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
