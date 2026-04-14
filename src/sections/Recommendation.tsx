import { useEffect, useRef, useState } from 'react'
import type { Content } from '../types'
import Icon from '../components/Icon'

export default function Recommendation({ c }: { c: Content['recommendation'] }) {
  // On touch devices, trigger the peek animation when Option B scrolls into view
  const [bActive, setBActive] = useState(false)
  const bRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(hover: hover)').matches) return
    const el = bRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setBActive(entry.isIntersecting && entry.intersectionRatio > 0.4),
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <section id="recommendation" className="px-6 md:px-8 py-20 md:py-32 max-w-7xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-xs font-medium tracking-widest text-text-secondary">{c.badge}</span>
      </div>
      <h2 className="mt-8 text-3xl md:text-5xl font-bold text-text-primary">{c.title}</h2>
      <p className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed">{c.subtitle}</p>

      {/* Honesty disclaimer — framed, before the plans */}
      <div className="mt-12 p-6 md:p-7 rounded-2xl bg-surface border-l-4 border-accent">
        <div className="flex items-start gap-4">
          <Icon name="info" className="text-accent mt-1 shrink-0" size={20} />
          <p className="text-text-secondary leading-relaxed italic">{c.honesty}</p>
        </div>
      </div>

      {/* The three plans */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
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

      {/* Branching arrow — opens into the two options */}
      <div className="hidden md:flex justify-center mt-10 mb-2">
        <svg
          viewBox="0 0 200 80"
          className="w-56 h-20 text-accent/60"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <marker
              id="branch-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
            </marker>
          </defs>
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="100" y1="4" x2="100" y2="24" />
            <line
              x1="100"
              y1="24"
              x2="36"
              y2="66"
              markerEnd="url(#branch-arrow)"
            />
            <line
              x1="100"
              y1="24"
              x2="164"
              y2="66"
              markerEnd="url(#branch-arrow)"
            />
          </g>
        </svg>
      </div>

      {/* The two options */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {c.options.map((o) => (
          <div
            key={o.id}
            ref={o.id === 'B' ? bRef : undefined}
            className="group relative flex"
          >
            {o.id === 'B' && (
              <>
                {/* Sunset halo — centered on the bushes wrapper */}
                <div
                  className={`pointer-events-none absolute z-20 bottom-full right-0 w-48 h-32 transition-opacity duration-700 ${
                    bActive ? 'opacity-95' : 'opacity-20 group-hover:opacity-95'
                  }`}
                  style={{
                    background:
                      'radial-gradient(ellipse 55% 75% at 50% 100%, rgba(254,215,170,0.75) 0%, rgba(251,146,60,0.3) 30%, rgba(234,88,12,0.1) 55%, transparent 80%)',
                  }}
                />
                {/* Clipping wrapper ONLY for logo + bushes */}
                <div className="pointer-events-none absolute z-20 right-10 bottom-full w-28 h-24 overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}lawal-logo.png`}
                    alt=""
                    aria-hidden
                    className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-16 transition-transform duration-500 ease-out ${
                      bActive ? '-translate-y-3' : 'translate-y-full group-hover:-translate-y-3'
                    }`}
                  />
                  <svg
                    viewBox="0 0 112 22"
                    className="absolute bottom-0 left-0 w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <g fill="#2f5f28">
                      <circle cx="10" cy="17" r="10" />
                      <circle cx="24" cy="15" r="11" />
                      <circle cx="40" cy="17" r="9" />
                      <circle cx="56" cy="14" r="12" />
                      <circle cx="72" cy="16" r="10" />
                      <circle cx="88" cy="14" r="11" />
                      <circle cx="102" cy="17" r="10" />
                      <rect x="0" y="18" width="112" height="6" rx="6" ry="6" />
                    </g>
                    <g fill="#3d7a34" opacity="0.6">
                      <circle cx="14" cy="13" r="3" />
                      <circle cx="30" cy="11" r="3" />
                      <circle cx="48" cy="10" r="3" />
                      <circle cx="66" cy="11" r="3" />
                      <circle cx="82" cy="9" r="3" />
                      <circle cx="98" cy="11" r="3" />
                    </g>
                  </svg>
                </div>
              </>
            )}
            <div
              className={`relative z-10 flex-1 flex flex-col p-7 md:p-8 rounded-2xl border transition-colors ${
                o.recommended ? 'bg-accent-glow border-border-accent' : 'bg-surface border-border'
              } ${o.id === 'B' ? 'group-hover:border-border-accent' : ''}`}
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
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
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
