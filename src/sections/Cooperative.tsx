import type { Content } from '../types'

export default function Cooperative({ c }: { c: Content['cooperative'] }) {
  return (
    <section id="cooperative" className="px-6 md:px-8 py-20 md:py-32 max-w-6xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-xs font-medium tracking-widest text-text-secondary">{c.badge}</span>
      </div>
      <h2 className="mt-8 text-3xl md:text-5xl font-bold text-text-primary">{c.title}</h2>
      <p className="mt-6 text-lg md:text-2xl text-text-secondary leading-relaxed">{c.subtitle}</p>

      <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {c.points.map((p, i) => (
          <div key={i}>
            <div className="text-[11px] font-mono text-accent tracking-widest">0{i + 1}</div>
            <h3 className="mt-3 text-lg font-semibold text-text-primary">{p.title}</h3>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 md:p-12 rounded-2xl bg-surface border border-border-accent">
        <div className="font-mono text-[11px] font-semibold tracking-widest text-accent">{c.caseStudy.tag}</div>
        <h3 className="mt-4 text-2xl md:text-3xl font-bold text-text-primary">{c.caseStudy.title}</h3>
        <p className="mt-4 text-text-secondary leading-relaxed max-w-3xl">{c.caseStudy.desc}</p>
      </div>
    </section>
  )
}
