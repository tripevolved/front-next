'use client'

import Link from 'next/link'

export default function CirculoEvolvedPage() {
  return (
    <div className="flex flex-col min-h-[60vh]">
      <section className="py-24 bg-secondary-50 flex-1">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h1 className="font-baloo text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Círculo Evolved
          </h1>
          <p className="font-comfortaa text-lg text-secondary-600 max-w-2xl mx-auto mb-8">
            Acesso a experiências exclusivas e viagens curadas. Em breve mais informações.
          </p>
          <Link
            href="/experiencias"
            className="inline-block font-comfortaa text-secondary-700 hover:text-accent-600 underline transition-colors"
          >
            Voltar para Experiências
          </Link>
        </div>
      </section>
    </div>
  )
}
