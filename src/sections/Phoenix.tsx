import type { Content } from '../types'
import Icon from '../components/Icon'

export default function Phoenix({ c }: { c: Content['phoenix'] }) {
  return (
    <section id="phoenix" className="px-8 py-32 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-text-primary text-center">{c.title}</h2>
      <p className="mt-6 text-lg text-text-secondary text-center max-w-3xl mx-auto leading-relaxed">{c.subtitle}</p>
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {c.cards.map((card, i) => (
          <div key={i} className="p-7 rounded-2xl bg-surface border border-border flex flex-col gap-4">
            <div className="w-11 h-11 rounded-xl bg-accent-glow flex items-center justify-center">
              <Icon name={card.icon} className="text-accent" size={22} />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">{card.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
