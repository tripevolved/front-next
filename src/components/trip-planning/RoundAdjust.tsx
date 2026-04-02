'use client'

export function RoundAdjust({
  value,
  min,
  max,
  onChange,
  ariaDecreaseLabel = 'Diminuir',
  ariaIncreaseLabel = 'Aumentar',
}: {
  value: number
  min: number
  max: number
  onChange: (next: number) => void
  ariaDecreaseLabel?: string
  ariaIncreaseLabel?: string
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-gray-700"
        aria-label={ariaDecreaseLabel}
      >
        -
      </button>
      <span className="min-w-[2.5rem] text-center font-semibold text-secondary-900">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-gray-700"
        aria-label={ariaIncreaseLabel}
      >
        +
      </button>
    </div>
  )
}

