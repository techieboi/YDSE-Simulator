const PI = Math.PI

export const DEFAULT_CONTROLS = {
  wavelength: 540,
  slitSeparation: 0.35,
  slitWidth: 0.12,
  screenDistance: 1.5,
  intensity: 0.85,
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function sinc(value) {
  if (Math.abs(value) < 1e-9) {
    return 1
  }

  return Math.sin(value) / value
}

function toMetersFromMm(value) {
  return value * 1e-3
}

function toMetersFromNm(value) {
  return value * 1e-9
}

export function computeFringeSpacing(controls) {
  const lambda = toMetersFromNm(controls.wavelength)
  const slitSeparation = toMetersFromMm(controls.slitSeparation)
  const screenDistance = controls.screenDistance

  return (lambda * screenDistance * 1e3) / slitSeparation
}

export function createIntensitySeries(controls) {
  const lambda = toMetersFromNm(controls.wavelength)
  const slitSeparation = toMetersFromMm(controls.slitSeparation)
  const slitWidth = toMetersFromMm(controls.slitWidth)
  const screenDistance = controls.screenDistance
  const fringeSpacing = computeFringeSpacing(controls)
  // Sample a wider span so more fringes remain visible on the canvas screen.
  const halfRangeMm = Math.max(10, fringeSpacing * 9.5)
  const points = 241

  return Array.from({ length: points }, (_, index) => {
    const progress = index / (points - 1)
    const yMm = -halfRangeMm + progress * halfRangeMm * 2
    const yMeters = yMm * 1e-3
    const alpha = (PI * slitSeparation * yMeters) / (lambda * screenDistance)
    const beta = (PI * slitWidth * yMeters) / (lambda * screenDistance)
    const intensity =
      clamp(Math.pow(Math.cos(alpha), 2) * Math.pow(sinc(beta), 2) * controls.intensity, 0, 1)

    return {
      yMm,
      intensity,
    }
  })
}

export function getConstructiveOrder(controls, yMm) {
  const lambda = toMetersFromNm(controls.wavelength)
  const slitSeparation = toMetersFromMm(controls.slitSeparation)
  const yMeters = yMm * 1e-3
  const pathDifference = (slitSeparation * yMeters) / controls.screenDistance

  return Math.round(pathDifference / lambda)
}

export function formatPresetSummary(controls) {
  return `${controls.wavelength} nm light, ${controls.slitSeparation} mm slit spacing, ${controls.screenDistance} m screen distance`
}

export function getWaveColor(wavelength) {
  if (wavelength < 450) {
    return {
      label: 'Violet-blue',
      accent: '#7aa2ff',
      glow: 'rgba(122, 162, 255, 0.35)',
    }
  }

  if (wavelength < 495) {
    return {
      label: 'Blue',
      accent: '#53b8ff',
      glow: 'rgba(83, 184, 255, 0.35)',
    }
  }

  if (wavelength < 570) {
    return {
      label: 'Green',
      accent: '#74f0a7',
      glow: 'rgba(116, 240, 167, 0.35)',
    }
  }

  if (wavelength < 590) {
    return {
      label: 'Yellow',
      accent: '#ffd166',
      glow: 'rgba(255, 209, 102, 0.35)',
    }
  }

  if (wavelength < 620) {
    return {
      label: 'Orange',
      accent: '#ff9f6e',
      glow: 'rgba(255, 159, 110, 0.35)',
    }
  }

  return {
    label: 'Red',
    accent: '#ff7b72',
    glow: 'rgba(255, 123, 114, 0.35)',
  }
}
