import { useState, useEffect, FormEvent } from 'react'
import { decryptContent, EncryptedPayload } from '../lib/crypto'
import type { Content } from '../types'

type Props = {
  onUnlock: (content: Content) => void
}

type Status = 'checking' | 'ready' | 'missing' | 'no-slug'

function getSlug(): string | null {
  const params = new URLSearchParams(window.location.search)
  const slug = params.get('for')
  if (!slug) return null
  if (!/^[a-z0-9-]+$/.test(slug)) return null
  return slug
}

export default function PasswordGate({ onUnlock }: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<Status>('checking')
  const slug = getSlug()

  useEffect(() => {
    if (!slug) {
      setStatus('no-slug')
      return
    }
    fetch(`${import.meta.env.BASE_URL}content.${slug}.enc.json`, { method: 'HEAD' })
      .then((res) => setStatus(res.ok ? 'ready' : 'missing'))
      .catch(() => setStatus('missing'))
  }, [slug])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}content.${slug}.enc.json`)
      if (!res.ok) throw new Error('Content not found')
      const payload = (await res.json()) as EncryptedPayload
      const content = (await decryptContent(payload, password)) as Content
      document.title = content.meta.title
      onUnlock(content)
    } catch {
      setError('Wrong password')
      setLoading(false)
    }
  }

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg p-6">
        <div className="text-text-muted text-sm font-mono tracking-widest">LOADING…</div>
      </div>
    )
  }

  if (status === 'missing' || status === 'no-slug') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg p-6">
        <div className="w-full max-w-md text-center space-y-6">
          <img
            src={`${import.meta.env.BASE_URL}lawal-logo.png`}
            alt="Lawal"
            className="h-14 mx-auto object-contain"
          />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-text-muted text-xs font-mono tracking-widest">
            <span className="w-2 h-2 rounded-full bg-text-muted" />
            PROPOSAL NOT FOUND
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-text-primary">
              Sorry — this proposal doesn't exist or has expired.
            </h1>
            <p className="text-text-secondary text-sm leading-relaxed">
              If you'd like us to put together a proposal for you, get in touch with Lawal.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href="mailto:info@lawal.coop"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-bg font-semibold hover:opacity-90 transition"
            >
              info@lawal.coop
            </a>
            <a
              href="https://lawal.coop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border text-text-primary hover:border-accent transition"
            >
              lawal.coop
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-6">
          <img
            src={`${import.meta.env.BASE_URL}lawal-logo.png`}
            alt="Lawal"
            className="h-14 mx-auto object-contain"
          />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-accent bg-accent-glow text-accent text-xs font-mono tracking-widest">
            <span className="w-2 h-2 rounded-full bg-accent" />
            END-TO-END ENCRYPTED
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-text-primary">Enter the passphrase to view the proposal</h1>
            <p className="text-text-secondary text-sm leading-relaxed">
              This proposal contains information shared under NDA, so the entire
              content is encrypted at rest (AES-256-GCM). Nothing is readable
              without the passphrase — not in the browser, not on the server, not
              in the public repository.
            </p>
            <p className="text-text-muted text-xs leading-relaxed">
              The passphrase was shared with you out-of-band. Decryption happens
              locally in your browser; nothing is ever sent anywhere.
            </p>
          </div>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          placeholder="Passphrase"
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition"
        />
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full py-3 rounded-xl bg-accent text-bg font-semibold hover:opacity-90 disabled:opacity-50 transition"
        >
          {loading ? 'Unlocking…' : 'Unlock'}
        </button>
      </form>
    </div>
  )
}
