'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const BENEFIT_CARDS = [
  {
    id: 'curadoria',
    title: 'Curadoria',
    deepCopy:
      'Cada hospedagem, companhia de cruzeiro, destino e experiência passa por um rigoroso e profundo estudo, garantindo a qualidade e, mais importante, para quem a experiência se encaixa melhor. Dos melhores cruzeiros do mundo a jantares românticos ao pôr do sol e tratamentos de spa no Caribe — tudo pensado para você.',
  },
  {
    id: 'travel-designer',
    title: 'Travel Designer Dedicado',
    deepCopy:
      'Cada viagem conta com o seu parceiro estratégico, um especialista que estará ao seu lado, entendendo e construindo sua viagem. O processo é simples: (1) você nos conta sua ideia e datas de viagem, (2) construímos a proposta e ajustamos até a perfeição, (3) você contrata unindo o melhor serviço ao melhor valor, sem comissões ou taxas escondidas.',
  },
  {
    id: 'sem-comissoes',
    title: 'Sem comissões e taxas escondidas',
    deepCopy:
      'No modelo comissionado, você não sabe o que está pagando nem porque. Cansamos dele porque cria incentivos que não se alinham à sua viagem. Para você, isso significa valores significativamente mais baixos, sem descontos artificiais, e uma relação de confiança total. Exemplo: em uma viagem de R$ 82.500 (cruzeiro + hotéis + transfers), cerca de R$ 7.920 retornam em cashback ou desconto direto.',
  },
]

type CirculoEvolvedModalType = 'essential' | 'total'

export function CirculoEvolvedModal({
  isOpen,
  onClose,
  type = 'essential',
}: {
  isOpen: boolean
  onClose: () => void
  type?: CirculoEvolvedModalType
}) {
  const router = useRouter()
  const isTotal = type === 'total'
  const ctaLabel =
    type === 'total'
      ? 'Contratar o Círculo Evolved Total'
      : 'Contratar o Círculo Evolved Essencial'

  const handleCheckout = () => {
    onClose()
    router.push('/app/circulo-evolved/checkout')
  }

  const handleWhatsApp = () => {
    const message = 'Olá! Gostaria de falar com um especialista sobre o Círculo Evolved.'
    window.open(`https://wa.me/5551993582462?text=${encodeURIComponent(message)}`, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header with close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="font-baloo text-xl font-bold text-secondary-900">
            Círculo Evolved
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          <h3 className="font-baloo text-lg font-bold text-secondary-900 leading-snug">
            Zero comissões e taxas escondidas, curadoria excepcional de destinos e experiências, e qualidade em cada detalhe — os 3 pilares que fazem do Círculo Evolved a melhor escolha para você, que investe em viagens memoráveis.
          </h3>
          {/* 3 Benefit cards with depth */}
          {BENEFIT_CARDS.filter((card) => (card.id === 'travel-designer' ? isTotal : true)).map(
            (card) => (
            <div
              key={card.id}
              className="bg-secondary-50 rounded-xl border border-secondary-200 overflow-hidden"
            >
              {card.id === 'curadoria' && (
                <div className="relative w-full h-28">
                  <Image
                    src="/assets/consultoria/cruzeiros-unicos/destinos.jpg"
                    alt="Destinos paradisíacos — curadoria exclusiva"
                    fill
                    className="object-cover"
                    sizes="(max-width: 672px) 100vw, 672px"
                  />
                </div>
              )}
              {card.id === 'travel-designer' && (
                <div className="relative w-full h-28">
                  <Image
                    src="/assets/consultoria/travel-designer.png"
                    alt="Planejamento de viagem — parceiro estratégico ao seu lado"
                    fill
                    className="object-cover"
                    sizes="(max-width: 672px) 100vw, 672px"
                  />
                </div>
              )}
              {card.id === 'sem-comissoes' && (
                <div className="flex justify-center pt-5 pb-2">
                  <svg className="w-14 h-14 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
              )}
              <div className="p-5">
                <h3 className="font-baloo text-lg font-bold text-secondary-900 mb-2">
                  {card.title}
                </h3>
                <p className="font-comfortaa text-secondary-700 text-sm leading-relaxed">
                  {card.deepCopy}
                </p>
              </div>
            </div>
          )
          )}

          {isTotal ? (
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/hZyiun44Eh4?si=RklrrDSLTCIOBMYK"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : null}
        </div>

        {/* CTA footer */}
        <div className="px-6 py-4 border-t border-gray-200 shrink-0 bg-white space-y-4">
          <button
            onClick={handleCheckout}
            className="w-full font-baloo bg-accent-500 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-accent-600 transition-all shadow-lg hover:shadow-accent-500/30"
          >
            {ctaLabel}
          </button>
          <div className="text-center">
            <p className="font-comfortaa text-sm text-secondary-600 mb-2">Ficou com alguma dúvida?</p>
            <button
              type="button"
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 font-baloo text-green-600 font-semibold hover:text-green-700 transition-colors underline decoration-green-500 underline-offset-2"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Falar com um especialista
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CirculoEvolvedCall() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="relative py-8 md:py-10 bg-secondary-500 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/80 to-secondary-500" aria-hidden />
        <div className="relative w-full max-w-xl mx-auto px-4 text-center">
          <h2 className="font-baloo text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
            Quer levar essa experiência para outro nível?
          </h2>
          <p className="font-comfortaa text-sm md:text-base text-white/90 max-w-lg mx-auto mb-6">
            No Círculo Evolved, todas as suas viagens seguem esse mesmo padrão — com preços transparentes e curadoria especializada para você não ter risco de errar na sua viagem.
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-block font-baloo bg-accent-500 text-white px-6 py-2.5 rounded-full text-base font-semibold hover:bg-accent-600 transition-all shadow-lg hover:shadow-accent-500/30"
          >
            Descobrir o Círculo Evolved
          </button>
        </div>
      </section>

      <CirculoEvolvedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
