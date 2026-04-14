import type { Content } from '../types'
import Icon from '../components/Icon'

export default function Challenge({ c }: { c: Content['challenge'] }) {
  return (
    <section id="challenge" className="px-8 py-32 max-w-7xl mx-auto">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-mono text-xs font-medium tracking-widest text-text-secondary">{c.badge}</span>
        </div>
        <h2 className="mt-8 text-4xl md:text-6xl font-bold text-text-primary">{c.title}</h2>
        <p className="mt-6 text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
          {c.subtitle}
        </p>
      </div>

      <div className="mt-20 grid md:grid-cols-2 gap-6 relative">
        <StateCard state={c.current} accent={false} />
        <StateCard state={c.target} accent={true} />
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-surface-elevated border border-border-accent items-center justify-center z-10">
          <Icon name="arrow-right" className="text-accent" size={24} />
        </div>
      </div>
    </section>
  )
}

function StateCard({
  state,
  accent,
}: {
  state: Content['challenge']['current']
  accent: boolean
}) {
  return (
    <div
      className={`p-8 md:p-10 rounded-2xl bg-surface border ${
        accent ? 'border-border-accent' : 'border-border'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${accent ? 'bg-accent' : 'bg-text-muted'}`} />
        <span
          className={`font-mono text-[11px] font-semibold tracking-widest ${
            accent ? 'text-accent' : 'text-text-muted'
          }`}
        >
          {state.label}
        </span>
      </div>
      <h3 className="mt-5 text-2xl md:text-3xl font-bold text-text-primary leading-tight">
        {state.headline}
      </h3>
      <p className="mt-4 text-base text-text-secondary leading-relaxed">{state.desc}</p>

      <div className="mt-8 pt-6 border-t border-border grid grid-cols-3 gap-4">
        {state.stats.map((s, i) => (
          <div key={i}>
            <div
              className={`font-bold tabular-nums ${
                accent ? 'text-accent' : 'text-text-primary'
              } text-xl md:text-2xl`}
            >
              {s.value}
            </div>
            <div className="mt-1 text-[11px] font-mono tracking-wider text-text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
