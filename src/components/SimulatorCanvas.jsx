import { useEffect, useRef } from 'react'

function getWaveSpacingPx(wavelengthNm) {
  const normalized = (wavelengthNm - 380) / (750 - 380)
  return 22 + normalized * 18
}

function getWaveCycleDurationMs(wavelengthNm) {
  const spacingPx = getWaveSpacingPx(wavelengthNm)
  const waveSpeedPxPerSecond = 11
  return (spacingPx / waveSpeedPxPerSecond) * 1000
}

function drawCanvas(canvas, controls, derived, phase) {
  const context = canvas.getContext('2d')

  if (!context) {
    return
  }

  const cssWidth = canvas.clientWidth || 900
  const cssHeight = canvas.clientHeight || 520
  const dpr = window.devicePixelRatio || 1

  if (canvas.width !== Math.floor(cssWidth * dpr) || canvas.height !== Math.floor(cssHeight * dpr)) {
    canvas.width = Math.floor(cssWidth * dpr)
    canvas.height = Math.floor(cssHeight * dpr)
  }

  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.clearRect(0, 0, cssWidth, cssHeight)

  const { intensitySeries, waveColor } = derived
  const width = cssWidth
  const height = cssHeight
  const sourceX = width * 0.1
  const barrierX = width * 0.31
  const screenX = width * 0.89
  const centerY = height * 0.5
  const slitGap = 72 + controls.slitSeparation * 42
  const slitHeight = 18 + controls.slitWidth * 70
  const slitTopY = centerY - slitGap / 2
  const slitBottomY = centerY + slitGap / 2
  const waveStartX = barrierX + 16
  const screenTop = 24
  const screenHeight = height - 48
  const slitTravel = screenX - waveStartX - 18
  const maxOffset = Math.max(...intensitySeries.map((point) => Math.abs(point.yMm)))

  const background = context.createLinearGradient(0, 0, 0, height)
  background.addColorStop(0, '#061726')
  background.addColorStop(1, '#021019')
  context.fillStyle = background
  context.fillRect(0, 0, width, height)

  for (let x = 0; x <= width; x += 32) {
    context.strokeStyle = 'rgba(216, 230, 242, 0.05)'
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, height)
    context.stroke()
  }

  for (let y = 0; y <= height; y += 32) {
    context.strokeStyle = 'rgba(216, 230, 242, 0.05)'
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(width, y)
    context.stroke()
  }

  context.strokeStyle = 'rgba(255,255,255,0.12)'
  context.lineWidth = 1
  context.beginPath()
  context.moveTo(sourceX + 22, centerY)
  context.lineTo(screenX - 18, centerY)
  context.stroke()

  context.fillStyle = 'rgba(255,255,255,0.1)'
  context.fillRect(barrierX - 8, 18, 16, height - 36)

  context.clearRect(barrierX - 9, slitTopY - slitHeight / 2, 18, slitHeight)
  context.clearRect(barrierX - 9, slitBottomY - slitHeight / 2, 18, slitHeight)

  context.fillStyle = 'rgba(127,231,255,0.28)'
  context.fillRect(barrierX - 8, slitTopY - slitHeight / 2, 16, slitHeight)
  context.fillRect(barrierX - 8, slitBottomY - slitHeight / 2, 16, slitHeight)

  const sourceGlow = context.createRadialGradient(sourceX, centerY, 0, sourceX, centerY, 30)
  sourceGlow.addColorStop(0, '#ffffff')
  sourceGlow.addColorStop(0.28, waveColor.accent)
  sourceGlow.addColorStop(1, 'rgba(255,255,255,0)')
  context.fillStyle = sourceGlow
  context.beginPath()
  context.arc(sourceX, centerY, 30, 0, Math.PI * 2)
  context.fill()

  const waveSpacing = getWaveSpacingPx(controls.wavelength)
  const waveCycle = waveSpacing
  const sourceWaveCount = 7

  const sourceWaveCenter = { x: sourceX, y: centerY }
  const sourceFadeMaskX = barrierX - sourceX + 4

  context.save()
  context.beginPath()
  context.rect(sourceX - 4, 0, sourceFadeMaskX, height)
  context.clip()
  for (let ring = 0; ring < sourceWaveCount; ring += 1) {
    const radius = 24 + ring * waveSpacing + (phase * waveCycle)
    const alpha = Math.max(0.03, 0.3 - ring * 0.03)
    context.beginPath()
    context.arc(sourceWaveCenter.x, sourceWaveCenter.y, radius, -0.55, 0.55)
    context.strokeStyle = waveColor.glow.replace('0.35', alpha.toFixed(2))
    context.lineWidth = 2
    context.stroke()
  }
  context.restore()

  const slitWaveCenters = [
    { x: waveStartX, y: slitTopY },
    { x: waveStartX, y: slitBottomY },
  ]
  const slitWaveCount = Math.ceil(slitTravel / waveSpacing) + 3

  slitWaveCenters.forEach((center, index) => {
    context.save()
    context.beginPath()
    context.rect(barrierX - 2, 0, screenX - barrierX - 10, height)
    context.clip()
    for (let ring = 0; ring < slitWaveCount; ring += 1) {
      const radius = 24 + ring * waveSpacing + (phase * waveCycle)
      if (radius > slitTravel) {
        continue
      }
      const alpha = Math.max(0.03, 0.3 - ring * 0.012 - index * 0.02)
      context.beginPath()
      context.arc(center.x, center.y, radius, -0.55, 0.55)
      context.strokeStyle = waveColor.glow.replace('0.35', alpha.toFixed(2))
      context.lineWidth = 2
      context.stroke()
    }
    context.restore()
  })

  context.fillStyle = 'rgba(15, 23, 42, 0.96)'
  context.fillRect(screenX, screenTop, 18, screenHeight)
  context.strokeStyle = 'rgba(255,255,255,0.14)'
  context.strokeRect(screenX, screenTop, 18, screenHeight)

  intensitySeries.forEach((point, index) => {
    const y = screenTop + ((point.yMm + maxOffset) / (maxOffset * 2)) * screenHeight
    const bandHeight = screenHeight / intensitySeries.length + 1
    const alpha = Math.max(0.05, point.intensity)
    const band = context.createLinearGradient(screenX, 0, screenX + 18, 0)
    band.addColorStop(0, `rgba(255,255,255,${alpha * 0.2})`)
    band.addColorStop(0.5, `rgba(255,255,255,${alpha})`)
    band.addColorStop(1, `rgba(255,255,255,${alpha * 0.25})`)
    context.fillStyle = band
    context.fillRect(screenX, y - bandHeight / 2 + index * 0.01, 18, bandHeight)
  })

  context.fillStyle = '#ffffff'
  context.font = '600 12px Inter, sans-serif'
  context.fillText('Source', sourceX - 18, 28)
  context.fillText('Double slits', barrierX - 28, 28)
  context.fillText('Screen', screenX - 6, 28)

  context.fillStyle = 'rgba(15, 23, 42, 0.72)'
  context.strokeStyle = 'rgba(127, 231, 255, 0.28)'
  context.lineWidth = 1
  context.beginPath()
  context.roundRect(waveStartX + 62, centerY - 18, 126, 24, 12)
  context.fill()
  context.stroke()
  context.fillStyle = 'rgba(248, 250, 252, 0.92)'
  context.font = '700 11px Inter, sans-serif'
  context.fillText('Central maximum', waveStartX + 76, centerY - 2)
}

function SimulatorCanvas({ controls, derived }) {
  const canvasRef = useRef(null)
  const { fringeSpacingMm } = derived

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return undefined
    }

    let animationFrame = 0
    let startTime = 0

    const render = (timestamp) => {
      if (!startTime) {
        startTime = timestamp
      }

      const cycleDurationMs = getWaveCycleDurationMs(controls.wavelength)
      const phase = ((timestamp - startTime) / cycleDurationMs) % 1
      drawCanvas(canvas, controls, derived, phase)
      animationFrame = window.requestAnimationFrame(render)
    }

    animationFrame = window.requestAnimationFrame(render)

    const resizeObserver = new ResizeObserver(() => {
      drawCanvas(canvas, controls, derived, 0)
    })

    resizeObserver.observe(canvas)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
    }
  }, [controls, derived])

  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-4 lg:p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-cyan">Simulation View</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">
            Light through two narrow slits
          </h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
          Fringe spacing: {fringeSpacingMm.toFixed(2)} mm
        </div>
      </div>

      <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-[#021019] p-3 lg:p-4">
        <canvas
          ref={canvasRef}
          width={1200}
          height={520}
          className="block h-[30rem] w-full rounded-[1.2rem] sm:h-[34rem] lg:h-[40rem] xl:h-[44rem]"
          aria-label="Canvas showing the source, double slits, wavefronts, and interference screen"
        />
        <div className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            The source emits coherent light toward a barrier with two narrow openings.
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            Each slit acts like a new wave source, producing expanding semicircular wavefronts.
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            The screen brightness comes from constructive and destructive interference.
          </div>
        </div>
      </div>
    </section>
  )
}

export default SimulatorCanvas
