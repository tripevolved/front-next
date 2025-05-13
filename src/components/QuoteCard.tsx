import Image from 'next/image'

interface QuoteCardProps {
  text: string
  footer: string
  footerSub: string
}

export default function QuoteCard({ text, footer, footerSub }: QuoteCardProps) {
  // Get initials from the name (footer)
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="mb-6">
        <svg className="w-8 h-8 text-accent-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="font-comfortaa text-lg text-gray-700 mb-6">{text}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center">
          <span className="text-accent-600 font-baloo font-semibold text-lg">
            {getInitials(footer)}
          </span>
        </div>
        <div>
          <h4 className="font-baloo font-semibold text-gray-900">{footer}</h4>
          <p className="text-sm text-gray-500">{footerSub}</p>
        </div>
      </div>
    </div>
  )
} 