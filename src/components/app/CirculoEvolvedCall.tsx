'use client'

import Link from 'next/link'

export function CirculoEvolvedCall() {
  return (
    <section className="relative py-16 md:py-20 bg-secondary-500 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/80 to-secondary-500" aria-hidden />
      <div className="relative w-full max-w-2xl mx-auto px-4 md:px-6 text-center">
        <h2 className="font-baloo text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          Viajar bem também significa investir melhor
        </h2>
        <p className="font-comfortaa text-lg text-white/90 max-w-xl mx-auto mb-8">
          Um pagamento anual te dá acesso a curadoria única e valores sem comissão para suas viagens.
        </p>
        <Link
          href="/app/checkout/circulo-evolved"
          className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all shadow-lg hover:shadow-accent-500/30"
        >
          Contratar o Círculo Evolved
        </Link>
      </div>
    </section>
  )
}
