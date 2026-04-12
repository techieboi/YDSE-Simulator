export const PRESETS = [
  {
    name: 'Red Light',
    description: 'Longer wavelength with clearly spaced fringes.',
    values: {
      wavelength: 650,
      slitSeparation: 0.35,
      slitWidth: 0.12,
      screenDistance: 1,
      intensity: 1,
    },
  },
  {
    name: 'Blue Light',
    description: 'Shorter wavelength that packs the bands closer together.',
    values: {
      wavelength: 460,
      slitSeparation: 0.35,
      slitWidth: 0.12,
      screenDistance: 1,
      intensity: 1,
    },
  },
  {
    name: 'Wide Gap',
    description: 'Increase slit separation to show fringe compression immediately.',
    values: {
      wavelength: 540,
      slitSeparation: 0.75,
      slitWidth: 0.1,
      screenDistance: 1,
      intensity: 1,
    },
  },
  {
    name: 'Default',
    description: 'Balanced settings that show a clear pattern.',
    values: {
      wavelength: 540,
      slitSeparation: 0.35,
      slitWidth: 0.12,
      screenDistance: 1,
      intensity: 1,
    },
  },
]
