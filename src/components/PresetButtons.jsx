function PresetButtons({ presets, onSelect }) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
      {presets.map((preset) => (
        <button
          key={preset.name}
          type="button"
          onClick={() => onSelect(preset)}
          className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan/30 hover:bg-cyan/10"
        >
          <p className="text-base font-semibold text-white">{preset.name}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{preset.description}</p>
        </button>
      ))}
    </div>
  )
}

export default PresetButtons
