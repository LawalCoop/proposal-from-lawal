import type { Content } from '../types'
import Icon from '../components/Icon'

export default function WhatsNext({
  c,
  onDownloadPdf,
  generating,
}: {
  c: Content['whatsNext']
  onDownloadPdf: () => void
  generating: boolean
}) {
  return (
    <section id="whats-next" className="px-6 md:px-8 py-20 md:py-32 max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-xs font-medium tracking-widest text-text-secondary">{c.badge}</span>
      </div>
      <h2 className="mt-8 text-3xl md:text-5xl font-bold text-text-primary">{c.title}</h2>
      <p className="mt-6 text-lg text-text-secondary leading-relaxed">{c.body}</p>
      <p className="web-only mt-4 text-xs text-text-muted max-w-md mx-auto">
        The PDF reflects the team configuration you've selected above.
      </p>

      {/* PDF-only: plain email contacts */}
      <div className="pdf-only mt-12 space-y-2">
        <div className="text-text-secondary">
          <a href="mailto:info@lawal.coop" className="text-accent">info@lawal.coop</a>
        </div>
        <div className="text-text-secondary">
          <a href="mailto:hernan@lawal.coop" className="text-accent">hernan@lawal.coop</a>
        </div>
      </div>

      {/* Web-only: interactive CTAs */}
      <div className="web-only mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        {c.ctas.map((cta, i) => {
          const isDownload = cta.href === '#download'
          const primary = i === 0
          const className = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
            primary
              ? 'bg-accent text-bg hover:opacity-90'
              : 'bg-surface border border-border text-text-primary hover:border-accent'
          }`
          if (isDownload) {
            return (
              <button
                key={i}
                onClick={onDownloadPdf}
                disabled={generating}
                className={`${className} disabled:opacity-60`}
              >
                <Icon name={cta.icon} size={18} />
                {generating ? 'Generating…' : cta.label}
              </button>
            )
          }
          const external = cta.href.startsWith('http')
          return (
            <a
              key={i}
              href={cta.href}
              className={className}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon name={cta.icon} size={18} />
              {cta.label}
            </a>
          )
        })}
      </div>
    </section>
  )
}
