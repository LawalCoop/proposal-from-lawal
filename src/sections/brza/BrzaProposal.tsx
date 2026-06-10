import type { BrzaContent } from '../../types'

export default function BrzaProposal({ c }: { c: BrzaContent['proposal'] }) {
  return (
    <section id="proposal" className="px-6 md:px-8 py-20 md:py-32 max-w-7xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-xs font-medium tracking-widest text-text-secondary">{c.badge}</span>
      </div>
      <h2 className="mt-8 text-3xl md:text-5xl font-bold text-text-primary">{c.title}</h2>
      <p className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed max-w-4xl">{c.subtitle}</p>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
        {c.cards.map((card, index) => (
          <div key={index} className="p-7 rounded-2xl bg-surface border border-border">
            <div className="font-mono text-[11px] tracking-widest text-accent">0{index + 1}</div>
            <h3 className="mt-3 text-xl font-semibold text-text-primary">{card.title}</h3>
            <p className="mt-3 text-sm md:text-base text-text-secondary leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 rounded-2xl bg-accent-glow border border-border-accent">
        <p className="text-base md:text-lg text-text-primary leading-relaxed">{c.closing}</p>
      </div>
    </section>
  )
}
