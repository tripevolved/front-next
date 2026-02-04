'use client'

import { MuxVideoPlayer } from '@/components/MuxVideoPlayer'

export default function CruzeirosExtraordinariosHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="block md:hidden absolute inset-0">
          <MuxVideoPlayer
            playbackId="V00bvDGWfGlEibHGx8olVEj9NHxPylaTVu02Lhinuh9DQ"
            autoplay={true}
            loop={true}
            isMuted={true}
            className="w-full h-full object-cover rounded-none mx-0"
          />
        </div>
        <div className="hidden md:block absolute inset-0">
          <MuxVideoPlayer
            playbackId="wGJb3Kl017IvIuwXsAaRJvSLhxkdivTWfyvr61usw01Jw"
            autoplay={true}
            loop={true}
            isMuted={true}
            className="w-full h-full object-cover rounded-none mx-0"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="w-full px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
              Cruzeiros extraordinários,<br /> experiências únicas,<br /> exclusividade em cada detalhe.
            </h1>
            <p className="font-comfortaa text-xl md:text-2xl text-white/90">
              Descubra destinos incríveis a bordo dos melhores navios, com experiências exclusivas e detalhes que você só recebe na Trip Evolved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
