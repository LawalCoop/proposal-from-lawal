import { useState, useMemo } from 'react'
import type { Content } from '../types'
import Icon from '../components/Icon'

type Props = {
  c: Content['pricing']
  onConfigChange?: (config: { devs: number; ux: boolean; pm: boolean; total: number }) => void
}

export default function Pricing({ c, onConfigChange }: Props) {
  const [devs, setDevs] = useState(c.devDefault)
  const [ux, setUx] = useState(false)
  const [pm, setPm] = useState(false)

  const total = useMemo(() => {
    return devs * c.devRate + (ux ? c.uxRate : 0) + (pm ? c.pmRate : 0)
  }, [devs, ux, pm, c])

  // notify parent for PDF export
  useMemo(() => {
    onConfigChange?.({ devs, ux, pm, total })
  }, [devs, ux, pm, total, onConfigChange])

  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`

  return (
    <section id="pricing" className="px-6 md:px-8 py-20 md:py-32 max-w-6xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-xs font-medium tracking-widest text-text-secondary">{c.badge}</span>
      </div>
      <h2 className="mt-8 text-3xl md:text-5xl font-bold text-text-primary">{c.title}</h2>
      <p className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed">{c.subtitle}</p>

      <div className="mt-14 md:mt-16 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-8">
        <div className="space-y-5">
          {/* Devs stepper */}
          <div className="p-7 rounded-2xl bg-surface border border-border">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary">Elixir Developers</h3>
                <p className="mt-1 text-sm text-text-secondary">{fmt(c.devRate)} / month each</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDevs((d) => Math.max(1, d - 1))}
                  className="w-11 h-11 rounded-lg bg-surface-elevated border border-border text-text-primary hover:border-accent transition text-xl"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-10 text-center text-2xl font-bold text-text-primary tabular-nums">{devs}</span>
                <button
                  onClick={() => setDevs((d) => Math.min(20, d + 1))}
                  className="w-11 h-11 rounded-lg bg-surface-elevated border border-border text-text-primary hover:border-accent transition text-xl"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border text-right font-mono text-sm text-accent">
              {fmt(devs * c.devRate)} / mo
            </div>
          </div>

          {/* UX checkbox */}
          <ToggleCard
            label={c.uxLabel}
            rate={c.uxRate}
            note={c.uxNote}
            checked={ux}
            onToggle={() => setUx((v) => !v)}
            fmt={fmt}
          />

          {/* PM checkbox */}
          <ToggleCard
            label={c.pmLabel}
            rate={c.pmRate}
            note={c.pmNote}
            checked={pm}
            onToggle={() => setPm((v) => !v)}
            fmt={fmt}
            optional
          />
        </div>

        {/* Total + notes */}
        <div className="space-y-5">
          <div className="p-8 rounded-2xl bg-accent-glow border border-border-accent">
            <div className="font-mono text-[11px] tracking-widest text-accent">MONTHLY INVESTMENT</div>
            <div className="mt-4 text-4xl md:text-5xl font-bold text-text-primary tabular-nums leading-none">{fmt(total)}</div>
            <div className="mt-3 text-xs text-text-secondary">/ month</div>
            <div className="mt-6 pt-6 border-t border-border-accent text-sm text-text-secondary">
              Every 2–3 months: scale up, scale down, or wrap up gracefully.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
            {c.notes.map((n, i) => (
              <div key={i} className="flex items-start gap-3">
                <Icon name={n.icon} className="text-text-muted shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-text-secondary leading-relaxed">{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ToggleCard({
  label,
  rate,
  note,
  checked,
  onToggle,
  fmt,
  optional,
}: {
  label: string
  rate: number
  note: string
  checked: boolean
  onToggle: () => void
  fmt: (n: number) => string
  optional?: boolean
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      className={`w-full cursor-pointer text-left p-7 rounded-2xl bg-surface border transition ${
        checked ? 'border-border-accent' : 'border-border hover:border-text-muted'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
            checked ? 'bg-accent border-accent' : 'border-border'
          }`}
        >
          {checked && <Icon name="check" className="text-bg" size={14} />}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-lg font-semibold text-text-primary">
              {label} {optional && <span className="text-xs font-normal text-text-muted">(optional)</span>}
            </h3>
            <span className={`font-mono text-sm ${checked ? 'text-accent' : 'text-text-muted'}`}>
              {fmt(rate)} / mo
            </span>
          </div>
          <p className="mt-2 text-sm text-text-secondary leading-relaxed">{note}</p>
        </div>
      </div>
    </div>
  )
}
