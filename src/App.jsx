import { useMemo, useState } from 'react'
import ControlSlider from './components/ControlSlider'
import IntensityPanel from './components/IntensityPanel'
import PresetButtons from './components/PresetButtons'
import SimulatorCanvas from './components/SimulatorCanvas'
import { PRESETS } from './data/presets'
import {
  DEFAULT_CONTROLS,
  clamp,
  computeFringeSpacing,
  createIntensitySeries,
  getConstructiveOrder,
  getWaveColor,
} from './lib/physics'

function App() {
  const [controls, setControls] = useState(DEFAULT_CONTROLS)

  const derived = useMemo(() => {
    const fringeSpacingMm = computeFringeSpacing(controls)
    const intensitySeries = createIntensitySeries(controls)
    const centerPoint = intensitySeries[Math.floor(intensitySeries.length / 2)]
    const offCenterPoint = intensitySeries[Math.floor(intensitySeries.length * 0.72)]
    const order = getConstructiveOrder(controls, offCenterPoint.yMm)

    return {
      fringeSpacingMm,
      intensitySeries,
      waveColor: getWaveColor(controls.wavelength),
      centerIntensity: centerPoint.intensity,
      sampleOrder: order,
      samplePathDifferenceNm: Math.abs(order * controls.wavelength),
    }
  }, [controls])

  const updateControl = (key, value) => {
    setControls((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const applyPreset = (preset) => {
    setControls(preset.values)
  }

  const resetControls = () => {
    setControls(DEFAULT_CONTROLS)
  }

  return (
    <main className="min-h-screen bg-ink text-slate-100">
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-10 w-full overflow-hidden border-b border-white/10 bg-slate-950/95 px-3 py-3 sm:px-4 sm:py-4 lg:px-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,231,255,0.14),transparent_30%),linear-gradient(90deg,rgba(255,255,255,0.03),transparent_30%,transparent_70%,rgba(255,255,255,0.03))]" />
          <div className="relative flex items-center justify-between gap-5">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan">
                Physics project
              </p>
              <h1 className="truncate text-lg font-semibold text-white sm:text-xl lg:text-2xl">
                Young&apos;s Double Slit Experiment: Visualized
              </h1>
            </div>
            <p className="hidden text-sm text-slate-300 lg:block">
              Interactive visualization of Young&apos;s double slit experiment
            </p>
          </div>
        </header>

        <section className="flex flex-1 flex-col gap-4 px-3 py-3 sm:px-4 sm:py-4 lg:flex-row lg:items-start lg:px-4">
          <div className="min-w-0 lg:w-[46%] lg:flex-shrink-0 xl:w-[48%]">
            <SimulatorCanvas controls={controls} derived={derived} />
          </div>

          <aside className="min-w-0 space-y-5 lg:w-[24%] lg:flex-shrink-0 xl:w-[23%]">
            <IntensityPanel derived={derived} />

            <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-cyan">Presets</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">
                Quick demonstrations
              </h2>
              <PresetButtons presets={PRESETS} onSelect={applyPreset} />
            </section>
          </aside>

          <section className="min-w-0 rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 lg:flex-1">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-cyan">Controls</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">
                  Adjust the experiment live
                </h2>
              </div>
              <button
                type="button"
                onClick={resetControls}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan/40 hover:bg-cyan/10"
              >
                Reset defaults
              </button>
            </div>
            <div className="mt-5 space-y-5">
              <ControlSlider
                label="Wavelength"
                value={controls.wavelength}
                min={380}
                max={750}
                step={5}
                unit="nm"
                description="Higher wavelength spreads fringes farther apart."
                onChange={(value) => updateControl('wavelength', value)}
              />
              <ControlSlider
                label="Slit separation"
                value={controls.slitSeparation}
                min={0.15}
                max={1.2}
                step={0.01}
                unit="mm"
                description="Wider separation compresses the interference bands."
                onChange={(value) => updateControl('slitSeparation', value)}
              />
              <ControlSlider
                label="Slit width"
                value={controls.slitWidth}
                min={0.04}
                max={0.3}
                step={0.005}
                unit="mm"
                description="Controls the single-slit envelope around the fringes."
                onChange={(value) => updateControl('slitWidth', value)}
              />
              <ControlSlider
                label="Screen distance"
                value={controls.screenDistance}
                min={0.5}
                max={3}
                step={0.05}
                unit="m"
                description="A farther screen gives the fringes more room to separate."
                onChange={(value) => updateControl('screenDistance', value)}
              />
              <ControlSlider
                label="Brightness"
                value={controls.intensity}
                min={0.2}
                max={1}
                step={0.05}
                unit="x"
                description="Scales the visibility of the displayed pattern."
                onChange={(value) => updateControl('intensity', clamp(value, 0.2, 1))}
              />
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}

export default App
