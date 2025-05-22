import { ButtonHTMLAttributes } from 'react'
import * as fpixel from '@/utils/libs/fpixel'
import { EventType } from '@/components/basic/FacebookPixel'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  event?: EventType
  eventOptions?: Record<string, any>
}

export default function Button({ 
  className = '',
  onClick,
  event,
  eventOptions,
  children,
  ...props
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // First call the original onClick if provided
    onClick?.(e)

    // Then fire the Facebook Pixel event if provided
    if (event) {
      fpixel.event(event, eventOptions)
    }
  }

  return (
    <button
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
} 