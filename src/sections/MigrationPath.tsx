import type { Content } from '../types'
import Icon from '../components/Icon'

export default function MigrationPath({ c }: { c: Content['migrationPath'] }) {
  return (
    <section id="migration" className="px-6 md:px-8 py-20 md:py-32 max-w-7xl mx-auto">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-mono text-xs font-medium tracking-widest text-text-secondary">{c.badge}</span>
        </div>
        <h2 className="mt-8 text-4xl md:text-5xl font-bold text-text-primary">{c.title}</h2>
        <p className="mt-6 text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">{c.subtitle}</p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-6 relative">
        <StackCol label={c.currentStack.label} items={c.currentStack.items} accent={false} />
        <StackCol label={c.proposedStack.label} items={c.proposedStack.items} accent={true} />
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-surface-elevated border border-border items-center justify-center z-10">
          <Icon name="arrow-right" className="text-accent" size={24} />
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-5">
        {c.insights.map((ins, i) => (
          <div key={i} className="p-6 rounded-xl bg-surface border border-border">
            <div className="inline-block px-2.5 py-1 rounded bg-accent-glow">
              <span className="font-mono text-[11px] font-semibold text-accent">{ins.tag}</span>
            </div>
            <h3 className="mt-3 text-base font-semibold text-text-primary">{ins.title}</h3>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">{ins.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function StackCol({
  label,
  items,
  accent,
}: {
  label: string
  items: Content['migrationPath']['currentStack']['items']
  accent: boolean
}) {
  return (
    <div
      className={`rounded-2xl bg-surface border overflow-hidden ${
        accent ? 'border-border-accent' : 'border-border'
      }`}
    >
      <div className={`px-6 py-4 flex items-center gap-2 ${accent ? 'bg-accent' : 'bg-surface-elevated'}`}>
        <span className={`w-2.5 h-2.5 rounded-full ${accent ? 'bg-bg' : 'bg-text-muted'}`} />
        <span
          className={`font-mono text-[11px] font-semibold tracking-widest ${
            accent ? 'text-bg' : 'text-text-muted'
          }`}
        >
          {label}
        </span>
      </div>
      <div className="p-6 space-y-5">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <Icon
              name={item.icon}
              className={accent ? 'text-accent' : 'text-text-muted'}
              size={18}
            />
            <div>
              <div className="text-[15px] font-semibold text-text-primary">{item.title}</div>
              <div className="text-[13px] text-text-secondary leading-relaxed mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
