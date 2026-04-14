import type { Content } from '../types'
import ScrollHint from '../components/ScrollHint'

export default function Cover({ c }: { c: Content['cover'] }) {
  return (
    <section
      id="cover"
      className="relative min-h-screen flex flex-col items-center justify-center px-8 py-32 text-center"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-accent bg-accent-glow mb-10">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-[11px] font-semibold tracking-widest text-accent">
          REWRITE PROPOSAL
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary leading-[1.05] max-w-5xl">
        Rewrite Proposal<br />
        for <span className="text-accent">{c.brand}</span>
      </h1>

      <div className="mt-10 flex items-center gap-3 text-text-secondary">
        <span className="text-sm md:text-base tracking-wider">by</span>
        <img
          src={`${import.meta.env.BASE_URL}lawal-logo.png`}
          alt="Lawal"
          className="web-only h-6 md:h-7 object-contain"
        />
        <img
          src={`${import.meta.env.BASE_URL}lawal-logo-dark.png`}
          alt="Lawal"
          className="pdf-only h-6 md:h-7 object-contain"
        />
      </div>
      <p className="mt-3 text-xs md:text-sm text-text-muted tracking-widest uppercase">
        Elixir Technology Cooperative
      </p>

      <div className="mt-12 flex items-center gap-4 text-[11px] font-mono tracking-widest uppercase text-text-muted">
        <span>April 2026</span>
        <span className="w-1 h-1 rounded-full bg-text-muted" />
        <span>v0.1</span>
      </div>

      <ScrollHint />
    </section>
  )
}
