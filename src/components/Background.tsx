export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-bg" />

      {/* ambient purple glow baked into a gradient (no blur filter) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(168,85,247,0.18) 0%, rgba(139,92,246,0.06) 35%, transparent 70%)',
        }}
      />

      {/* single large glass pane — pure gradients + borders, no blur filter */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[96vw] h-[96vh] rounded-[32px]"
        style={{
          background:
            'linear-gradient(135deg, rgba(168,85,247,0.07) 0%, rgba(168,85,247,0.015) 45%, rgba(192,132,252,0.06) 100%)',
          border: '1px solid rgba(168,85,247,0.2)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.1), inset 0 0 80px rgba(168,85,247,0.05)',
        }}
      >
        {/* diagonal shine streak */}
        <div
          className="absolute inset-0 rounded-[32px]"
          style={{
            background:
              'linear-gradient(120deg, transparent 35%, rgba(192,132,252,0.1) 50%, transparent 65%)',
          }}
        />
        {/* top edge highlight */}
        <div
          className="absolute top-0 left-8 right-8 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(10,6,18,0.7) 100%)',
        }}
      />
    </div>
  )
}
