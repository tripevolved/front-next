'use client'

import Image from 'next/image'

export function AppTripsSection() {
  return (
    <section className="mt-10 pt-10 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Minhas viagens</h2>
      <div className="flex flex-col items-center justify-center py-8 px-4 bg-gray-50 rounded-xl">
        <Image
          src="/assets/states/empty-state.svg"
          alt=""
          width={196}
          height={196}
          className="mb-4"
        />
        <p className="font-comfortaa text-gray-600 text-center max-w-sm">
          Suas viagens aparecerão aqui assim que forem criadas.
        </p>
      </div>
    </section>
  )
}
