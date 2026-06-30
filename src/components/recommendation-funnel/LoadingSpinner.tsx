'use client'

type Props = {
  message?: string
}

export function LoadingSpinner({ message }: Props) {
  return (
    <div className="flex flex-1 justify-center items-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500" />
        {message && <p className="font-comfortaa text-secondary-600">{message}</p>}
      </div>
    </div>
  )
}
