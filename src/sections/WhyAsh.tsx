import type { Content, Card } from '../types'
import Icon from '../components/Icon'

type Props = {
  c: Content['whyAsh']
  elixir: Content['elixir']
  phoenix: Content['phoenix']
}

function CardGrid({ cards, accentBorder }: { cards: Card[]; accentBorder?: boolean }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`p-7 rounded-2xl bg-surface border flex flex-col gap-4 ${
            accentBorder ? 'border-border-accent' : 'border-border'
          }`}
        >
          <div className="w-11 h-11 rounded-xl bg-accent-glow flex items-center justify-center">
            <Icon name={card.icon} className="text-accent" size={22} />
          </div>
          <h4 className="text-lg font-semibold text-text-primary">{card.title}</h4>
          <p className="text-sm text-text-secondary leading-relaxed">{card.desc}</p>
        </div>
      ))}
    </div>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-[11px] font-semibold tracking-widest text-accent">{label}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

export default function WhyAsh({ c, elixir, phoenix }: Props) {
  return (
    <section id="why-ash" className="px-8 py-32 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-border" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-accent">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-mono text-xs font-semibold tracking-widest text-accent">
            ELIXIR · PHOENIX · ASH
          </span>
        </div>
        <div className="flex-1 h-px bg-border" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-text-primary text-center">
        Why Elixir + Phoenix + Ash
      </h2>

      {/* Elixir */}
      <div className="mt-20">
        <Divider label="ELIXIR · THE RUNTIME" />
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary">{elixir.title}</h3>
        <p className="mt-4 text-lg md:text-xl text-text-secondary leading-relaxed">{elixir.subtitle}</p>
        <div className="mt-10">
          <CardGrid cards={elixir.cards} />
        </div>
      </div>

      {/* Phoenix */}
      <div className="mt-20">
        <Divider label="PHOENIX · THE WEB LAYER" />
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary">{phoenix.title}</h3>
        <p className="mt-4 text-lg md:text-xl text-text-secondary leading-relaxed">{phoenix.subtitle}</p>
        <div className="mt-10">
          <CardGrid cards={phoenix.cards} />
        </div>
      </div>

      {/* Ash */}
      <div className="mt-20">
        <Divider label="ASH · THE DOMAIN LAYER" />
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary">{c.title}</h3>
        <p className="mt-4 text-lg md:text-xl text-text-secondary leading-relaxed">{c.subtitle}</p>
        <div className="mt-10">
          <CardGrid cards={c.cards} accentBorder />
        </div>

        <div className="mt-10 rounded-2xl bg-surface-elevated border border-border overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-3 font-mono text-xs text-text-muted">{c.code.filename}</span>
          </div>
          <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
            {c.code.lines.map((line, i) => (
              <div key={i} className={line.accent ? 'text-accent' : 'text-text-secondary'}>
                {line.text || '\u00A0'}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </section>
  )
}
