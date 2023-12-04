'use client'

export const Range = ({
  value,
  label,
  onChange,
  min,
  max,
  step,
}: {
  value: number
  label?: string
  onChange: (value: number) => void
  min: number
  max: number
  step: number
}) => {
  return (
    <label className='w-full'>
      <div>{label ? label : value}</div>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={String(value)}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className='w-full'
      />
    </label>
  )
}
