/** Os 3 pilares da Trip Evolved — mesmo conteúdo da home (HomeContent). */
const PILLAR_CARDS = [
  {
    title: 'Curadoria',
    description:
      'Hospedagens, cruzeiros e experiências únicas: cada item no Círculo Evolved só é oferecido se entendemos bem e se é a melhor escolha para você',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
  {
    title: 'Transparência',
    description:
      'Zero comissões e taxas escondidas. Isso significa acesso à valores que antes só as agências de viagem acessavam e 10 a 30% de volta no seu bolso.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: 'Qualidade',
    description:
      'A qualidade das experiências no Círculo Evolved vem de uma curadoria criteriosa. Você tem a nossa garantia em cada hospedagem, cruzeiro e experiência.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
  },
] as const

export default function WhyTripEvolvedCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      {PILLAR_CARDS.map((card) => (
        <div key={card.title} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col">
          <div className="text-accent-500 mb-4">{card.icon}</div>
          <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-4">{card.title}</h3>
          <p className="font-comfortaa text-secondary-600 leading-relaxed">{card.description}</p>
        </div>
      ))}
    </div>
  )
}
