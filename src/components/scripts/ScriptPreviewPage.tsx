'use client'

import { MuxVideoPlayer } from '@/components/MuxVideoPlayer'
import { ScriptOutline } from './ScriptOutline'
import { WhatsAppDirectButton } from '@/components/WhatsAppDirectButton'
import { Action, Script, UniqueMoment } from './types'

interface ScriptPreviewPageProps {
  script: Script
  uniqueMoment: UniqueMoment
  videoPlaybackId?: string
  videoTitle?: string
  ctaTitle?: string
  ctaSubtitle?: string
  ctaMessage?: string
  ctaButtonText?: string
  showModal?: boolean
  onActionClick?: (action: Action) => void
}

export function ScriptPreviewPage({
  script,
  uniqueMoment,
  videoPlaybackId = "your-mux-playback-id-here",
  videoTitle = "Paris - Cidade Luz",
  ctaTitle = "Quer o roteiro completo?",
  ctaSubtitle = "Este é o seu pré-roteiro. Converse com nossos especialistas para contratar e receber o roteiro completo personalizado.",
  ctaMessage = "Olá! Gostaria de contratar o roteiro completo para minha viagem.",
  ctaButtonText = "Conversar com especialista",
  showModal = true,
  onActionClick
}: ScriptPreviewPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Video and Unique Moment */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <div className="text-6xl">{uniqueMoment.icon}</div>
              <h1 className="text-4xl font-bold text-gray-900">
                {uniqueMoment.title}
              </h1>
              <p className="text-xl leading-relaxed text-gray-600">
                {uniqueMoment.description}
              </p>
            </div>

            {/* Right Column - Video */}
            <div className="relative">
              <MuxVideoPlayer
                playbackId={videoPlaybackId}
                title={videoTitle}
                autoplay={false}
                loop={false}
                isMuted={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Script Outline */}
      <ScriptOutline
        script={script}
        showModal={showModal}
        onActionClick={onActionClick}
      />

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-secondary-500 to-secondary-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {ctaTitle}
          </h2>
          <p className="text-xl text-secondary-100 mb-8 max-w-2xl mx-auto">
            {ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppDirectButton variant="primary" message={ctaMessage}>
              {ctaButtonText}
            </WhatsAppDirectButton>
          </div>
        </div>
      </section>
    </div>
  )
} 