function ControlSlider({
  label,
  value,
  min,
  max,
  step,
  unit,
  description,
  onChange,
}) {
  return (
    <label className="block rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-medium text-white">{label}</p>
          <p className="mt-1 text-sm leading-6 text-slate-300">{description}</p>
        </div>
        <div className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-sm font-semibold text-cyan">
          {value}
          {unit}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 w-full"
      />
      <div className="mt-2 flex justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </label>
  )
}

export default ControlSlider
