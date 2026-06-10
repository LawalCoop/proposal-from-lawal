export type IconName =
  | 'database' | 'shield-check' | 'git-branch' | 'arrow-right' | 'gem'
  | 'workflow' | 'clock' | 'server' | 'hexagon' | 'zap' | 'layers' | 'box'
  | 'check' | 'message-square' | 'info' | 'handshake' | 'globe' | 'wallet'
  | 'download' | 'message-circle' | 'calendar' | 'code' | 'brain' | 'users'
  | 'mail' | 'send' | 'github' | 'link'

export type Card = { icon: IconName; title: string; desc: string }
export type StackItem = { icon: IconName; title: string; desc: string }
export type CodeLine = { text: string; accent?: boolean }

export type Content = {
  meta: { title: string; recipients: string[] }
  cover: { brand: string; subtitle: string }
  greeting: { greeting: string; body: string; stack: string }
  challenge: {
    badge: string
    title: string
    subtitle: string
    current: { label: string; headline: string; desc: string; stats: { value: string; label: string }[] }
    target: { label: string; headline: string; desc: string; stats: { value: string; label: string }[] }
  }
  elixir: {
    title: string
    subtitle: string
    cards: Card[]
  }
  whyAsh: {
    badge: string
    title: string
    subtitle: string
    cards: Card[]
    code: { filename: string; lines: CodeLine[] }
  }
  migrationPath: {
    badge: string
    title: string
    subtitle: string
    currentStack: { label: string; items: StackItem[] }
    proposedStack: { label: string; items: StackItem[] }
    insights: { tag: string; title: string; desc: string }[]
  }
  phoenix: { title: string; subtitle: string; cards: Card[] }
  cooperative: {
    badge: string
    title: string
    subtitle: string
    points: { title: string; desc: string }[]
    caseStudy: { tag: string; title: string; desc: string }
  }
  timeline: {
    title: string
    subtitle: string
    milestones: { year: string; title: string; desc: string }[]
    extras: { label: string; title: string; desc: string }[]
    closing: string
  }
  recommendation: {
    badge: string
    title: string
    subtitle: string
    honesty: string
    plans: { id: string; label: string; title: string; desc: string; lawal?: boolean }[]
    optionsIntro: string
    options: { id: string; label: string; title: string; desc: string; recommended?: boolean }[]
    combinedTeam: { title: string; desc: string }
    pmNote: { title: string; desc: string }
    commitmentNote: { title: string; desc: string }
  }
  pricing: {
    badge: string
    title: string
    subtitle: string
    devRate: number
    devDefault: number
    uxRate: number
    uxLabel: string
    uxNote: string
    pmRate: number
    pmLabel: string
    pmNote: string
    notes: { icon: IconName; text: string }[]
  }
  whatsNext: {
    badge: string
    title: string
    body: string
    ctas: { icon: IconName; label: string; href: string }[]
  }
}

export type BrzaContent = {
  meta: {
    title: string
    recipients: string[]
    template: 'brza'
  }
  cover: {
    eyebrow: string
    title: string
    subtitle: string
    date: string
    version: string
    preparedBy: string
  }
  greeting: {
    title: string
    paragraphs: string[]
    calloutLabel: string
    calloutText: string
  }
  overview: {
    badge: string
    title: string
    subtitle: string
    current: {
      label: string
      headline: string
      desc: string
      stats: { value: string; label: string }[]
    }
    target: {
      label: string
      headline: string
      desc: string
      stats: { value: string; label: string }[]
    }
  }
  scope: {
    badge: string
    title: string
    subtitle: string
    items: { icon: IconName; title: string; desc: string }[]
    footer: string
  }
  implementation: {
    badge: string
    title: string
    subtitle: string
    phases: { label: string; title: string; desc: string }[]
    estimate: {
      value: string
      label: string
      desc: string
    }
  }
  pricing: {
    badge: string
    title: string
    subtitle: string
    total: string
    totalLabel: string
    breakdown: { label: string; value: string; accent?: boolean }[]
    notes: { icon: IconName; text: string }[]
  }
  proposal: {
    badge: string
    title: string
    subtitle: string
    cards: { title: string; desc: string }[]
    closing: string
  }
  whatsNext: {
    badge: string
    title: string
    body: string
    ctas: { icon: IconName; label: string; href: string }[]
  }
}

export type ProposalContent = Content | BrzaContent
