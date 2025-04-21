import Image from 'next/image'
import Link from 'next/link'

interface DestinationCardProps {
  title: string
  image: string
  profile?: string | null
  link: string
}

export default function DestinationCard({ title, image, profile, link }: DestinationCardProps) {
  return (
    <Link href={link} className="group block relative h-[400px] rounded-xl overflow-hidden">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Profile Label */}
      {profile && (
        <div className="absolute top-4 left-4 bg-accent-500/90 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-baloo">
          {profile}
        </div>
      )}
      
      {/* Title */}
      <div className="absolute bottom-4 right-4 text-white">
        <h3 className="font-baloo text-2xl font-bold">{title}</h3>
      </div>
    </Link>
  )
} 