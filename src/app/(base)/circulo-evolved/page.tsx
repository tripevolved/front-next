'use client'

import Image from 'next/image'
import Link from 'next/link'

const PARA_QUEM_ITEMS = [
  'Casais e famílias que buscam um parceiro estratégico para suas viagens, não um vendedor',
  'Quem investe R$ 100 mil ou mais em viagens por ano e busca vantagens exclusivas',
  'Apaixonados por cruzeiros e hospedagens com conforto e gastronomia únicos',
  'Quem busca alinhamento e confiança com quem desenha suas viagens',
]

export default function CirculoEvolvedPage() {
  const scrollToParaQuem = () => {
    document.getElementById('para-quem')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-secondary-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/80 to-secondary-500" aria-hidden />
        <div className="relative w-full max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h1 className="font-baloo text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Viajar bem também significa investir melhor
          </h1>
          <p className="font-comfortaa text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Um pagamento anual te dá acesso a curadoria única e valores sem comissão para suas viagens — que você não encontra em outro lugar.
          </p>
          <button
            type="button"
            onClick={scrollToParaQuem}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all shadow-lg hover:shadow-accent-500/30"
          >
            Quero saber mais
          </button>
        </div>
      </section>

      {/* Para quem é o Círculo Evolved */}
      <section
        id="para-quem"
        className="scroll-mt-20 py-16 md:py-24 bg-secondary-50"
      >
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Para quem é o Círculo Evolved
              </h2>
              <ul className="space-y-4 mb-10">
                {PARA_QUEM_ITEMS.map((item, i) => (
                  <li key={i} className="flex gap-4 font-comfortaa text-secondary-700 items-start">
                    <Image
                      src="/assets/icons/icon-check-gold.svg"
                      alt=""
                      width={28}
                      height={28}
                      className="shrink-0 mt-0.5 w-7 h-7"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/app/checkout/circulo-evolved"
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Contratar o Círculo Evolved
              </Link>
            </div>
            <div className="relative aspect-[4/3] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/assets/consultoria/yosemite-trail.png"
                alt="Paisagem de trilha em Yosemite — experiências únicas para quem investe em viagem"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quer ver na prática */}
      <section className="py-8 bg-primary-500">
        <div className="w-full max-w-2xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-white mb-6">
            Quer ver como funciona o Círculo Evolved na prática?
          </h2>
          <Link
            href="/app"
            className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Criar conta gratuita
          </Link>
        </div>
      </section>
    </div>
  )
}
