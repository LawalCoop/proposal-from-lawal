import { useState, useRef } from 'react'
import type { Content } from './types'
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

const SECTIONS = [
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

export default function App() {
  const [content, setContent] = useState<Content | null>(null)
  const [, setConfig] = useState({ devs: 4, ux: true, pm: false, total: 34500 })
  const [generating, setGenerating] = useState(false)
  const proposalRef = useRef<HTMLDivElement>(null)

  function handleUnlock(c: Content) {
    setContent(c)
  }

  async function handleDownloadPdf() {
    if (!proposalRef.current || generating) return
    setGenerating(true)
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])

      const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter(
        (el): el is HTMLElement => el !== null,
      )

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
          ignoreElements: (n) =>
            n.classList.contains('pdf-ignore') || n.tagName === 'NAV',
          onclone: (clonedDoc) => {
            clonedDoc.body.classList.add('pdf-exporting')
            // Flatten pill badges to plain highlighted text for PDF
            const badges = clonedDoc.querySelectorAll<HTMLElement>('.inline-flex.rounded-full')
            badges.forEach((el) => {
              el.style.display = 'inline-block'
              el.style.padding = '0'
              el.style.border = 'none'
              el.style.background = 'transparent'
              el.style.marginBottom = '8px'
              const spans = el.querySelectorAll<HTMLElement>('span')
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

      pdf.save('lawal-gls-proposal.pdf')
    } catch (err) {
      console.error('PDF generation failed', err)
      alert('PDF generation failed. Check the console for details.')
    } finally {
      setGenerating(false)
    }
  }

  if (!content)
    return (
      <>
        <Background />
        <PasswordGate onUnlock={handleUnlock} />
      </>
    )

  return (
    <div ref={proposalRef} className="relative">
      <div className="pdf-ignore">
        <Background />
      </div>
      <SectionNav sectionIds={SECTIONS} />
      <Cover c={content.cover} />
      <Greeting c={content.greeting} />
      <Challenge c={content.challenge} />
      <Cooperative c={content.cooperative} />
      <Timeline c={content.timeline} />
      <WhyAsh c={content.whyAsh} elixir={content.elixir} phoenix={content.phoenix} />
      <MigrationPath c={content.migrationPath} />
      <Recommendation c={content.recommendation} />
      <Pricing c={content.pricing} onConfigChange={setConfig} />
      <WhatsNext c={content.whatsNext} onDownloadPdf={handleDownloadPdf} generating={generating} />
      <Footer />
    </div>
  )
}
