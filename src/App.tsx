import { useRef, useState } from 'react'
import type { BrzaContent, Content, ProposalContent } from './types'
import PasswordGate from './components/PasswordGate'
import Background from './components/Background'
import SectionNav from './components/SectionNav'
import Cover from './sections/Cover'
import Greeting from './sections/Greeting'
import Challenge from './sections/Challenge'
import WhyAsh from './sections/WhyAsh'
import MigrationPath from './sections/MigrationPath'
import Cooperative from './sections/Cooperative'
import Timeline from './sections/Timeline'
import Recommendation from './sections/Recommendation'
import Pricing from './sections/Pricing'
import WhatsNext from './sections/WhatsNext'
import Footer from './components/Footer'
import BrzaCover from './sections/brza/BrzaCover'
import BrzaGreeting from './sections/brza/BrzaGreeting'
import BrzaOverview from './sections/brza/BrzaOverview'
import BrzaScope from './sections/brza/BrzaScope'
import BrzaImplementation from './sections/brza/BrzaImplementation'
import BrzaPricing from './sections/brza/BrzaPricing'
import BrzaProposal from './sections/brza/BrzaProposal'

const LEGACY_SECTIONS = [
  { id: 'cover', label: 'Cover' },
  { id: 'greeting', label: 'Introduction' },
  { id: 'challenge', label: 'The Challenge' },
  { id: 'cooperative', label: 'Who We Are' },
  { id: 'timeline', label: 'Elixir Experience' },
  { id: 'why-ash', label: 'Why Elixir + Ash + Phoenix' },
  { id: 'migration', label: 'Migration Path' },
  { id: 'recommendation', label: 'Recommendation' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'whats-next', label: "What's Next" },
]

const BRZA_SECTIONS = [
  { id: 'cover', label: 'Portada' },
  { id: 'greeting', label: 'Contexto' },
  { id: 'overview', label: 'Objetivo' },
  { id: 'scope', label: 'Alcance' },
  { id: 'implementation', label: 'Implementación' },
  { id: 'pricing', label: 'Costo' },
  { id: 'proposal', label: 'Propuesta' },
]

function isBrzaContent(content: ProposalContent): content is BrzaContent {
  return (content as BrzaContent).meta.template === 'brza'
}

function getPdfFilename(content: ProposalContent) {
  if (isBrzaContent(content)) return 'propuesta-brza.pdf'
  return 'lawal-gls-proposal.pdf'
}

export default function App() {
  const [content, setContent] = useState<ProposalContent | null>(null)
  const [generating, setGenerating] = useState(false)
  const proposalRef = useRef<HTMLDivElement>(null)

  function handleUnlock(nextContent: ProposalContent) {
    setContent(nextContent)
  }

  async function handleDownloadPdf() {
    if (!proposalRef.current || generating || !content) return
    setGenerating(true)
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])

      const sections = isBrzaContent(content) ? BRZA_SECTIONS : LEGACY_SECTIONS
      const sectionEls = sections
        .map((section) => document.getElementById(section.id))
        .filter((el): el is HTMLElement => el !== null)

      const SCALE = 1.5
      const A4_W = 595.28
      const A4_H = 841.89
      const MARGIN = 24
      const GAP = 20
      const contentW = A4_W - MARGIN * 2
      const contentH = A4_H - MARGIN * 2

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
      let cursorY = MARGIN
      let placedAny = false

      function sliceCanvasToJpeg(canvas: HTMLCanvasElement, yStart: number, h: number): string {
        const slice = document.createElement('canvas')
        slice.width = canvas.width
        slice.height = Math.min(h, canvas.height - yStart)
        const ctx = slice.getContext('2d')!
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, slice.width, slice.height)
        ctx.drawImage(canvas, 0, -yStart)
        return slice.toDataURL('image/jpeg', 0.85)
      }

      for (const el of sectionEls) {
        const isCover = el.id === 'cover'
        const canvas = await html2canvas(el, {
          backgroundColor: '#ffffff',
          scale: SCALE,
          useCORS: true,
          logging: false,
          windowWidth: el.scrollWidth,
          ignoreElements: (n) => n.classList.contains('pdf-ignore') || n.tagName === 'NAV',
          onclone: (clonedDoc) => {
            clonedDoc.body.classList.add('pdf-exporting')
            const badges = clonedDoc.querySelectorAll<HTMLElement>('.inline-flex.rounded-full')
            badges.forEach((badge) => {
              badge.style.display = 'inline-block'
              badge.style.padding = '0'
              badge.style.border = 'none'
              badge.style.background = 'transparent'
              badge.style.marginBottom = '8px'
              const spans = badge.querySelectorAll<HTMLElement>('span')
              if (spans.length >= 2) {
                spans[0].style.display = 'none'
                const text = spans[1]
                text.style.color = '#7e22ce'
                text.style.fontWeight = '700'
                text.style.letterSpacing = '0.04em'
              }
            })
            const style = clonedDoc.createElement('style')
            style.textContent = `
              .tracking-widest { letter-spacing: 0.04em !important; }
              .tracking-wider { letter-spacing: 0.02em !important; }
              .inline-flex { white-space: nowrap; }
            `
            clonedDoc.head.appendChild(style)
          },
        })
        const ratio = contentW / canvas.width
        const imgHeightPt = canvas.height * ratio

        if (isCover) {
          if (placedAny) pdf.addPage()
          let fitW = contentW
          let fitH = canvas.height * (contentW / canvas.width)
          if (fitH > contentH) {
            fitH = contentH
            fitW = canvas.width * (contentH / canvas.height)
          }
          const x = (A4_W - fitW) / 2
          const y = (A4_H - fitH) / 2
          const imgData = canvas.toDataURL('image/jpeg', 0.85)
          pdf.addImage(imgData, 'JPEG', x, y, fitW, fitH)
          cursorY = A4_H
          placedAny = true
          continue
        }

        const gapBefore = placedAny ? GAP : 0
        const availableOnPage = A4_H - MARGIN - cursorY

        if (imgHeightPt + gapBefore <= availableOnPage) {
          const imgData = canvas.toDataURL('image/jpeg', 0.85)
          cursorY += gapBefore
          pdf.addImage(imgData, 'JPEG', MARGIN, cursorY, contentW, imgHeightPt)
          cursorY += imgHeightPt
          placedAny = true
        } else if (imgHeightPt <= contentH) {
          pdf.addPage()
          cursorY = MARGIN
          const imgData = canvas.toDataURL('image/jpeg', 0.85)
          pdf.addImage(imgData, 'JPEG', MARGIN, cursorY, contentW, imgHeightPt)
          cursorY += imgHeightPt
          placedAny = true
        } else {
          if (placedAny && cursorY > MARGIN) {
            pdf.addPage()
            cursorY = MARGIN
          }
          const pxPerPage = Math.floor(contentH / ratio)
          let yOffset = 0
          while (yOffset < canvas.height) {
            const sliceH = Math.min(pxPerPage, canvas.height - yOffset)
            const sliceImgData = sliceCanvasToJpeg(canvas, yOffset, sliceH)
            const sliceHeightPt = sliceH * ratio
            if (yOffset > 0) {
              pdf.addPage()
              cursorY = MARGIN
            }
            pdf.addImage(sliceImgData, 'JPEG', MARGIN, cursorY, contentW, sliceHeightPt)
            cursorY += sliceHeightPt
            yOffset += sliceH
          }
          placedAny = true
        }
      }

      pdf.save(getPdfFilename(content))
    } catch (err) {
      console.error('PDF generation failed', err)
      alert('PDF generation failed. Check the console for details.')
    } finally {
      setGenerating(false)
    }
  }

  if (!content) {
    return (
      <>
        <Background />
        <PasswordGate onUnlock={handleUnlock} />
      </>
    )
  }

  if (isBrzaContent(content)) {
    return (
      <div ref={proposalRef} className="relative">
        <div className="pdf-ignore">
          <Background />
        </div>
        <SectionNav sectionIds={BRZA_SECTIONS} />
        <BrzaCover c={content.cover} />
        <BrzaGreeting c={content.greeting} />
        <BrzaOverview c={content.overview} />
        <BrzaScope c={content.scope} />
        <BrzaImplementation c={content.implementation} />
        <BrzaPricing c={content.pricing} />
        <BrzaProposal c={content.proposal} />
        <Footer />
      </div>
    )
  }

  const legacyContent = content as Content

  return (
    <div ref={proposalRef} className="relative">
      <div className="pdf-ignore">
        <Background />
      </div>
      <SectionNav sectionIds={LEGACY_SECTIONS} />
      <Cover c={legacyContent.cover} />
      <Greeting c={legacyContent.greeting} />
      <Challenge c={legacyContent.challenge} />
      <Cooperative c={legacyContent.cooperative} />
      <Timeline c={legacyContent.timeline} />
      <WhyAsh c={legacyContent.whyAsh} elixir={legacyContent.elixir} phoenix={legacyContent.phoenix} />
      <MigrationPath c={legacyContent.migrationPath} />
      <Recommendation c={legacyContent.recommendation} />
      <Pricing c={legacyContent.pricing} />
      <WhatsNext c={legacyContent.whatsNext} onDownloadPdf={handleDownloadPdf} generating={generating} />
      <Footer />
    </div>
  )
}
