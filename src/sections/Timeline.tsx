import type { Content } from '../types'

export default function Timeline({ c }: { c: Content['timeline'] }) {
  return (
    <section id="timeline" className="px-8 py-32 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-text-primary text-center">{c.title}</h2>
      <p className="mt-6 text-lg text-text-secondary text-center max-w-3xl mx-auto leading-relaxed">{c.subtitle}</p>

      <div className="mt-20 relative">
        <div className="absolute top-3 left-0 right-0 h-px bg-border" />
        <div className={`grid grid-cols-2 gap-8 md:grid-cols-${c.milestones.length}`} style={{ gridTemplateColumns: `repeat(${c.milestones.length}, minmax(0, 1fr))` }}>
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
        <div className="mt-24 flex flex-wrap justify-center gap-6">
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
