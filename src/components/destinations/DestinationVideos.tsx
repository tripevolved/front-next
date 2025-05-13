import { PublicDestination } from '@/core/types/destination'

interface DestinationVideosProps {
  destination: PublicDestination
}

export function DestinationVideos({ destination }: DestinationVideosProps) {
  if (!destination.videos || destination.videos.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-6">Explorar {destination.title}</h2>
      <div className="grid grid-cols-1 gap-6">
        {destination.videos.map((video, index) => (
          <div key={index} className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
            {video.provider === 'youtube' && (
              <iframe 
                src={`https://www.youtube.com/embed/${video.source}`}
                title={`Video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            )}
            {video.provider === 'vimeo' && (
              <iframe 
                src={`https://player.vimeo.com/video/${video.source}`}
                title={`Video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            )}
          </div>
        ))}
      </div>
    </section>
  )
} 