import Link from 'next/link'
import { EventType } from '@/components/basic/FacebookPixel'
import * as fpixel from '@/utils/libs/fpixel'

interface LinkProps {
  href: string
  className?: string
  event?: EventType
  eventOptions?: Record<string, any>
  children: React.ReactNode
  onClick?: () => void
  target?: string
}

export default function CustomLink({ 
  href,
  className = '',
  event,
  eventOptions,
  children,
  onClick,
  target,
  ...props
}: LinkProps) {
  const handleClick = () => {
    // First call the original onClick if provided
    onClick?.()

    // Then fire the Facebook Pixel event if provided
    if (event) {
      fpixel.event(event, eventOptions)
    }
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      target={target}
      {...props}
    >
      {children}
    </Link>
  )
} 