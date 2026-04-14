import type { Content } from '../types'
import Icon from '../components/Icon'

export default function Recommendation({ c }: { c: Content['recommendation'] }) {
  return (
    <section id="recommendation" className="px-6 md:px-8 py-20 md:py-32 max-w-7xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-xs font-medium tracking-widest text-text-secondary">{c.badge}</span>
      </div>
      <h2 className="mt-8 text-4xl md:text-5xl font-bold text-text-primary">{c.title}</h2>
      <p className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed">{c.subtitle}</p>

      {/* Honesty disclaimer — framed, before the plans */}
      <div className="mt-12 p-6 md:p-7 rounded-2xl bg-surface border-l-4 border-accent">
        <div className="flex items-start gap-4">
          <Icon name="info" className="text-accent mt-1 shrink-0" size={20} />
          <p className="text-text-secondary leading-relaxed italic">{c.honesty}</p>
        </div>
      </div>

      {/* The three plans */}
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {c.plans.map((p) => (
          <div
            key={p.id}
            className={`relative p-7 rounded-2xl border ${
              p.lawal ? 'bg-accent-glow border-border-accent' : 'bg-surface border-border'
            }`}
          >
            {p.lawal && (
              <div className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-accent text-bg text-[10px] font-mono font-bold tracking-widest">
                WHERE LAWAL COMES IN
              </div>
            )}
            <div className="font-mono text-[11px] tracking-widest text-text-muted">{p.label}</div>
            <h3 className="mt-3 text-xl font-bold text-text-primary">{p.title}</h3>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Intro to the two options */}
      <p className="mt-16 text-lg md:text-xl text-text-secondary leading-relaxed">
        {c.optionsIntro}
      </p>

      {/* The two options */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {c.options.map((o) => (
          <div
            key={o.id}
            className={`relative p-7 md:p-8 rounded-2xl border ${
              o.recommended ? 'bg-accent-glow border-border-accent' : 'bg-surface border-border'
            }`}
          >
            {o.recommended && (
              <div className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-accent text-bg text-[10px] font-mono font-bold tracking-widest">
                OUR RECOMMENDATION
              </div>
            )}
            <div className="font-mono text-[11px] tracking-widest text-text-muted">{o.label}</div>
            <h3 className="mt-3 text-xl md:text-2xl font-bold text-text-primary">{o.title}</h3>
            <p className="mt-4 text-sm md:text-base text-text-secondary leading-relaxed">{o.desc}</p>
          </div>
        ))}
      </div>

      {/* Combined team block */}
      <div className="mt-12 p-8 rounded-2xl bg-surface border border-border">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-accent-glow flex items-center justify-center shrink-0">
            <Icon name="users" className="text-accent" size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary">{c.combinedTeam.title}</h3>
            <p className="mt-3 text-text-secondary leading-relaxed">{c.combinedTeam.desc}</p>
          </div>
        </div>
      </div>

      {/* Footer notes — PM + commitment, clearly marked */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <NoteCard icon="handshake" title={c.pmNote.title} desc={c.pmNote.desc} />
        <NoteCard icon="calendar" title={c.commitmentNote.title} desc={c.commitmentNote.desc} />
      </div>
    </section>
  )
}

function NoteCard({
  icon,
  title,
  desc,
}: {
  icon: Content['pricing']['notes'][0]['icon']
  title: string
  desc: string
}) {
  return (
    <div className="p-6 md:p-7 rounded-2xl bg-surface border border-border">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center shrink-0">
          <Icon name={icon} className="text-accent" size={18} />
        </div>
        <div>
          <h4 className="text-base font-semibold text-text-primary">{title}</h4>
          <p className="mt-2 text-sm text-text-secondary leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  )
}
