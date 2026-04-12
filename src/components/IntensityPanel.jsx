function buildPath(points, width, height) {
  return points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width
      const y = height - point.intensity * height
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

function IntensityPanel({ derived }) {
  const { intensitySeries, waveColor } = derived
  const maxOffset = Math.max(...intensitySeries.map((point) => Math.abs(point.yMm)))
  const graphPath = buildPath(intensitySeries, 700, 210)

  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-4 lg:p-5">
      <p className="text-sm uppercase tracking-[0.18em] text-cyan">
        Intensity Profile Across The Screen
      </p>
      <svg
        viewBox="0 0 700 260"
        className="mt-4 h-[16rem] w-full overflow-visible rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] sm:h-[18rem] lg:h-[20rem]"
        role="img"
        aria-label="Intensity graph of the interference pattern"
      >
        <defs>
          <linearGradient id="graphStroke" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor={waveColor.accent} />
            <stop offset="100%" stopColor={waveColor.accent} />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1="0"
            x2="700"
            y1={210 - 210 * ratio}
            y2={210 - 210 * ratio}
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="5 10"
          />
        ))}

        <line x1="350" x2="350" y1="0" y2="210" stroke="rgba(255,255,255,0.15)" />
        <path d={graphPath} fill="none" stroke="url(#graphStroke)" strokeWidth="4" />

        <text x="0" y="245" fill="rgba(226,232,240,0.8)" fontSize="16">
          -{maxOffset.toFixed(1)} mm
        </text>
        <text x="318" y="245" fill="rgba(226,232,240,0.8)" fontSize="16">
          center
        </text>
        <text x="595" y="245" fill="rgba(226,232,240,0.8)" fontSize="16">
          +{maxOffset.toFixed(1)} mm
        </text>
      </svg>
      <p className="mt-4 text-sm leading-6 text-slate-300">
        The outer fringes fade because the slit width creates a single-slit envelope
        around the double-slit interference pattern.
      </p>
    </section>
  )
}

export default IntensityPanel
