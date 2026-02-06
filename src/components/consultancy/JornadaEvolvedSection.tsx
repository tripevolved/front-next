'use client'

import Image from 'next/image'
import Button from '@/components/common/Button'
import { EventType } from '@/components/basic/FacebookPixel'

interface JornadaEvolvedSectionProps {
  onCtaClick: () => void
  eventSource?: string
  event?: EventType
  id?: string
  className?: string
}

export default function JornadaEvolvedSection({
  onCtaClick,
  eventSource = 'Jornada Evolved Section',
  event = 'pre_descobrir_viagem',
  id,
  className = '',
}: JornadaEvolvedSectionProps) {
  return (
    <section id={id} className={`py-20 bg-secondary-500 ${className}`}>
      <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
        <div className="text-center mb-12">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-white mb-4">
            Jornada Evolved: 100% transparente
          </h2>
          <p className="font-comfortaa text-lg text-white/90 max-w-2xl mx-auto">
            Um serviço completo de curadoria e desenho de viagem, com valor fixo e previsível.
          </p>
        </div>

        <ul className="max-w-2xl mx-auto space-y-4 mb-10">
          <li className="flex gap-4 font-comfortaa text-white/90 items-start">
            <Image
              src="/assets/icons/icon-check-gold.svg"
              alt=""
              width={24}
              height={24}
              className="shrink-0 mt-0.5 w-6 h-6"
            />
            <span><strong className="font-baloo text-white">Curadoria</strong> — Seleção de destinos, cruzeiros e experiências alinhados ao que você busca.</span>
          </li>
          <li className="flex gap-4 font-comfortaa text-white/90 items-start">
            <Image
              src="/assets/icons/icon-check-gold.svg"
              alt=""
              width={24}
              height={24}
              className="shrink-0 mt-0.5 w-6 h-6"
            />
            <span><strong className="font-baloo text-white">Desenho de viagem</strong> — Serviço completo de planejamento e desenho da sua jornada sob medida.</span>
          </li>
          <li className="flex gap-4 font-comfortaa text-white/90 items-start">
            <Image
              src="/assets/icons/icon-check-gold.svg"
              alt=""
              width={24}
              height={24}
              className="shrink-0 mt-0.5 w-6 h-6"
            />
            <span><strong className="font-baloo text-white">Valores líquidos ou cashback</strong> — Comissões revertidas em descontos ou cashback: você vê o valor real.</span>
          </li>
        </ul>

        <div className="text-center mb-6">
          <span className="font-baloo text-4xl md:text-5xl font-bold text-accent-400">
            R$ 5.700,00
          </span>
        </div>

        <div className="bg-white/15 border-2 border-accent-400/60 rounded-2xl p-6 max-w-2xl mx-auto mb-10 text-center">
          <p className="font-comfortaa text-white leading-relaxed">
            Você recupera o valor do serviço em descontos ou cashback ao fechar sua viagem — ou recebe a diferença de volta.
          </p>
        </div>

        <div className="text-center">
          <Button
            onClick={onCtaClick}
            event={event}
            eventOptions={{ source: eventSource }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Começar minha jornada
          </Button>
        </div>
      </div>
    </section>
  )
}
