import Link from 'next/link'

interface DestinationCTAProps {
  destinationTitle: string
}

export function DestinationCTA({ destinationTitle }: DestinationCTAProps) {
  return (
    <div className="border border-secondary-200/90 bg-secondary-900 p-6 rounded-lg shadow-sm">
      <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent-500/90 mb-2">
        Círculo Evolved
      </p>
      <h2 className="text-xl font-baloo font-bold text-white mb-3 leading-snug">
        Viva {destinationTitle} com curadoria
      </h2>
      <p className="text-gray-300 text-sm leading-relaxed mb-6">
        Membros do Círculo Evolved acessam hospedagens <span className="font-bold text-accent-400">exclusivamente</span> pensadas para casais e tem acesso a valores sem comissões - 10 a 30% menores -, que antes eram restritos às agências de viagem.
      </p>
      <Link
        href="/circulo-evolved"
        className="inline-flex w-full rounded-full items-center justify-center gap-2 border border-accent-500/80 bg-transparent px-5 py-3 text-sm font-semibold text-accent-400 transition-colors hover:bg-accent-500/10 hover:border-accent-400"
      >
        Conhecer o Círculo Evolved
      </Link>
    </div>
  )
}
