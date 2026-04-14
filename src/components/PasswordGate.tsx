import { useState, FormEvent } from 'react'
import { decryptContent, EncryptedPayload } from '../lib/crypto'
import type { Content } from '../types'

type Props = {
  onUnlock: (content: Content) => void
}

function getSlug(): string | null {
  const params = new URLSearchParams(window.location.search)
  const slug = params.get('for')
  if (!slug) return null
  // Allow only safe slug characters
  if (!/^[a-z0-9-]+$/.test(slug)) return null
  return slug
}

export default function PasswordGate({ onUnlock }: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const slug = getSlug()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (!slug) throw new Error('Missing ?for= parameter')
      const res = await fetch(`${import.meta.env.BASE_URL}content.${slug}.enc.json`)
      if (!res.ok) throw new Error('Content not found')
      const payload = (await res.json()) as EncryptedPayload
      const content = (await decryptContent(payload, password)) as Content
      document.title = content.meta.title
      onUnlock(content)
    } catch (e) {
      const msg = e instanceof Error && e.message === 'Missing ?for= parameter'
        ? 'No proposal specified. Append ?for=<slug> to the URL.'
        : e instanceof Error && e.message === 'Content not found'
        ? 'Proposal not found for this URL.'
        : 'Wrong password'
      setError(msg)
      setLoading(false)
    }
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
