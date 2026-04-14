import type { Content } from '../types'

export default function Greeting({ c }: { c: Content['greeting'] }) {
  return (
    <section id="greeting" className="px-8 py-32 max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-text-primary">{c.greeting}</h2>
      <p className="mt-6 text-xl md:text-2xl text-text-secondary leading-relaxed whitespace-pre-line">{c.body}</p>
      <div className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border-accent bg-accent-glow">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-sm tracking-wider text-accent">{c.stack}</span>
      </div>
    </section>
  )
}
