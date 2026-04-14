import type { Content } from '../types'

export default function Timeline({ c }: { c: Content['timeline'] }) {
  return (
    <section id="timeline" className="px-6 md:px-8 py-20 md:py-32 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-text-primary text-center">{c.title}</h2>
      <p className="mt-6 text-base md:text-lg text-text-secondary text-center max-w-3xl mx-auto leading-relaxed">{c.subtitle}</p>

      {/* Mobile: vertical list with a line on the left */}
      <div className="mt-12 md:hidden relative pl-8">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
        <div className="space-y-8">
          {c.milestones.map((m, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-8 top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-bg" />
              <div className="font-mono text-xs text-accent">{m.year}</div>
              <div className="mt-1 text-base font-semibold text-text-primary">{m.title}</div>
              <div className="mt-1 text-sm text-text-secondary leading-relaxed">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block mt-20 relative">
        <div className="absolute top-3 left-0 right-0 h-px bg-border" />
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: `repeat(${c.milestones.length}, minmax(0, 1fr))` }}
        >
          {c.milestones.map((m, i) => (
            <div key={i} className="relative">
              <div className="w-2 h-2 rounded-full bg-accent ring-4 ring-bg" />
              <div className="mt-4 font-mono text-xs text-accent">{m.year}</div>
              <div className="mt-1 text-sm font-semibold text-text-primary">{m.title}</div>
              <div className="mt-2 text-xs text-text-secondary leading-relaxed">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {c.extras.length > 0 && (
        <div className="mt-16 md:mt-24 flex flex-wrap justify-center gap-6">
          {c.extras.map((e, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl bg-surface border border-border max-w-xl w-full text-center"
            >
              <div className="font-mono text-[11px] font-semibold tracking-widest text-accent">{e.label}</div>
              <h3 className="mt-3 text-lg font-semibold text-text-primary">{e.title}</h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>
      )}

    </section>
  )
}
