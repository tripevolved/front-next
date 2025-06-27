import Button from '@/components/common/Button'

interface ComoFuncionaSectionProps {
  source: string
  onContactClick: () => void
}

export default function ComoFuncionaSection({ source, onContactClick }: ComoFuncionaSectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
        <div className="text-center mb-16">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
            Do primeiro contato à última massagem no spa, tudo pensado <span className="text-accent-500">com carinho e estratégia</span>
          </h2>
          <h3 className="font-baloo text-xl md:text-2xl font-semibold text-primary-500">
            Um processo sob medida para criar a viagem mais relaxante da vida de vocês
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-primary-500">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                  Reunião inicial com nossos especialistas
                </h3>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  Sessão de uma hora com nossos especialistas para entender suas preferências, necessidades e orçamento para essa viagem. Também vamos apresentar uma pré-proposta para você, com base nas suas respostas ao formulário.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-primary-500">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                  Proposta personalizada
                </h3>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  Com o pagamento da nossa taxa de R$500,00, criamos sua proposta sob medida. Você recebe um documento detalhado com itinerário sugerido, incluindo atividades, voos, acomodações e transporte. Esse valor será descontado do preço final da sua viagem.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-primary-500">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                  Reserva e coordenação
                </h3>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  Com a viagem confirmada, cuidamos de tudo. Reservamos voos, acomodações, passeios e outras atividades, garantindo as melhores opções disponíveis.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-primary-500">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                  Kit viagem personalizado
                </h3>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  Vocês recebem um kit viagem personalizado com guia, mapa, recomendações locais... Tudo personalizado e pensando nos momentos únicos que vocês vão viver.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Suporte Section */}
        <div className="bg-primary-50 p-8 rounded-xl mb-16">
          <div className="flex items-start gap-4">
            <div className="text-primary-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                Suporte completo durante toda a viagem
              </h3>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Vocês terão suporte e atendimento 24/7 para qualquer necessidade. E mesmo depois da volta, continuamos por perto para ouvir como foi — e começar a sonhar juntos com a próxima.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            onClick={onContactClick}
            event="pre_agendar"
            eventOptions={{
              source: `Como funciona Section - ${source}`
            }}
            className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Conversar com um especialista
          </Button>
        </div>
      </div>
    </section>
  )
} 