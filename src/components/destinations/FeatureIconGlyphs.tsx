import type { ReactNode } from 'react'

/** Minimal line icons — sober stroke, no fill. */

const stroke = 1.25

function Svg({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  )
}

export function IconCulture({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M4 21V10h16v11M8 21V7M12 21V4M16 21V7" />
    </Svg>
  )
}

export function IconFood({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M11 4v16M9 4h4M9 8h4M17 4l-3 16h2l3-16" />
    </Svg>
  )
}

export function IconParty({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M8 22h8M12 22v-7M9 5h6l-1 7H10L9 5z" />
    </Svg>
  )
}

export function IconRelax({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0L12 2.69z" />
    </Svg>
  )
}

export function IconAttractions({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M12 21s7-4.35 7-11a7 7 0 0 0-14 0c0 6.65 7 11 7 11z" />
      <circle cx="12" cy="10" r="2" />
    </Svg>
  )
}

export function IconAccommodation({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M3 10v11M3 17h18M21 10v11M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M7 21v-4h10v4" />
    </Svg>
  )
}

export function IconNaturalBeauty({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M3 18h18M6 18 10 9l4 6 3-5 5 8" />
    </Svg>
  )
}

export function IconUniqueness({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M12 2l9 9-9 9-9-9 9-9z" />
    </Svg>
  )
}

export function IconAdrenaline({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z" />
    </Svg>
  )
}

export function IconDefault({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </Svg>
  )
}
