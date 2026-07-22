import Link from 'next/link'

const PATH_CARDS = [
  {
    title: 'Círculo Evolved',
    tagline: 'Quero fazer eu mesmo',
    description:
      'Uma plataforma com hospedagens escolhidas a dedo e tarifas sem comissão. Você planeja e reserva no seu ritmo, com nossa curadoria e suporte quando precisar.',
    href: '/circulo-evolved',
  },
  {
    title: 'Jornada Evolved',
    tagline: 'Quero que cuidem de tudo',
    description:
      'Um serviço de consultoria que cuida da viagem inteira — do primeiro contato até o retorno. Voos, hospedagens, experiências e cada detalhe pensado para você.',
    href: '/servicos/jornada-evolved',
  },
] as const

export default function HomePathsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      {PATH_CARDS.map((card) => (
        <div key={card.title} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col">
          <p className="font-comfortaa text-sm font-semibold uppercase tracking-wide text-accent-500 mb-2">
            {card.tagline}
          </p>
          <h3 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900 mb-4">
            {card.title}
          </h3>
          <p className="font-comfortaa text-secondary-600 leading-relaxed flex-1 mb-6">
            {card.description}
          </p>
          <Link
            href={card.href}
            className="inline-flex items-center gap-1 font-baloo text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            Saiba mais
            <span aria-hidden>→</span>
          </Link>
        </div>
      ))}
    </div>
  )
}
