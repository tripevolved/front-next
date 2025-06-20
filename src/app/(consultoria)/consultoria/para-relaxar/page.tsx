'use client'

import Image from 'next/image'
import { useState } from 'react'
import ContactExpertModal from '@/components/ContactExpertModal'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import FAQSection from '@/components/consultancy/FAQSection'
import Button from '@/components/common/Button'

export default function ParaRelaxarPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const handleContactSuccess = () => {
    // Open Google Calendar in a new tab
    const calendarUrl = 'https://calendar.app.google/zSrzwmgCKFKajYMN6'
    window.open(calendarUrl, '_blank')
    
    // Redirect current page to /obrigado
    window.location.href = '/obrigado'
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/consultoria/para-relaxar/hero.jpg"
            alt="Casal relaxando com vista"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
              Sua viagem a dois. Um momento para relaxar e se reconectar.
            </h1>
            <Button 
              onClick={() => setIsContactModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Hero Section - Para Relaxar'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero agendar uma reunião
            </Button>
          </div>
        </div>
      </section>

      {/* Para casais que Section */}
      <section className="py-24 bg-secondary-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-4 text-white">
            <span className="text-accent-500">Não é pacote</span>. Tudo começa por vocês e o que desejam viver.
          </h2>
          <h3 className="font-baloo text-xl md:text-2xl font-semibold mb-8 text-white">
            Para casais que...
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Bem-estar</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Buscam momentos de relaxamento e cuidados com o corpo e a mente.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Qualidade de Vida</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Valorizam conforto e luxo em cada detalhe da experiência.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Tempo de Qualidade</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Querem aproveitar cada momento juntos, sem pressões ou compromissos.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Tranquilidade</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Buscam destinos que ofereçam paz e sossego, longe do estresse.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Experiências Exclusivas</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Desejam momentos únicos, como jantares românticos e spas privativos.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Facilidade</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Preferem que tudo seja organizado, para poderem apenas relaxar.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button 
              onClick={() => setIsContactModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Para casais que Section - Para Relaxar'
              }}
              className="inline-block font-baloo bg-primary-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-600 transition-all"
            >
              Quero agendar minha reunião
            </Button>
          </div>
        </div>
      </section>

      {/* Viagem Personalizada Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <div className="relative h-[600px]">
              <div className="absolute top-0 left-0 w-[65%] h-[65%] z-10">
                <Image
                  src="/assets/consultoria/para-relaxar/relax-paisagem.jpg"
                  alt="Praia para relaxar"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[65%] h-[65%]">
                <Image
                  src="/assets/consultoria/para-relaxar/four-seasons-bahamas.jpg"
                  alt="Resort nas Bahamas"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-right">
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
                Viajar é sobre buscar momentos de relaxamento únicos a dois
              </h2>
              <h3 className="font-baloo text-xl md:text-2xl font-semibold mb-8 text-primary-500">
                A gente entende o que vocês querem viver
              </h3>
              <div className="space-y-6 text-secondary-600 font-comfortaa text-lg">
                <p>
                  Vocês têm uma rotina intensa e merecem momentos de verdadeiro descanso. Entendemos que cada casal tem sua forma de relaxar, seja em um spa de luxo, em uma praia paradisíaca ou em um resort exclusivo. É por isso que, antes de sugerir qualquer destino, ouvimos. Descobrimos juntos o que traz paz, o que renova as energias, o que faz cada momento valer a pena.
                </p>
                <p>
                  Com esse entendimento, construímos uma viagem que prioriza o bem-estar. Desde a escolha do resort perfeito até as experiências mais relaxantes — como aquele jantar à beira-mar ou um tratamento de spa a dois — tudo é pensado para que vocês possam se desconectar do mundo e reconectar um com o outro, sem preocupações.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Momentos únicos Section */}
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-secondary-900">
            Sua viagem merece <span className="text-accent-500">momentos únicos</span> como...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/para-relaxar/velassaru-maldivas.jpg"
                  alt="Bangalô sobre as águas nas Maldivas"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent duration-300 flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Bangalô sobre as águas nas Maldivas
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/para-relaxar/aruba-jantar.jpg"
                  alt="Pôr do sol em Aruba"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent duration-300 flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Jantar romântico ao pôr do sol em Aruba
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/para-relaxar/redlane-spa.jpg"
                  alt="Spa nas Bahamas"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent duration-300 flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Tratamento de spa nas Bahamas
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button 
              onClick={() => setIsContactModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Momentos únicos Section - Para Relaxar'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero agendar minha reunião
            </Button>
          </div>
        </div>
      </section>

      {/* Como funciona Section */}
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
                    Sessão de uma hora com nossos especialistas para entender suas preferências, necessidades e orçamento para essa viagem.
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
                    Com o pagamento da nossa taxa de consultoria, de R$1.200,00, criamos sua proposta sob medida. Você recebe um documento detalhado com itinerário sugerido, incluindo opções de destinos, atividades, voos, acomodações e transporte.
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
              onClick={() => setIsContactModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Como funciona Section - Para Relaxar'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero agendar minha reunião
            </Button>
          </div>
        </div>
      </section>

      {/* Por que agendar agora Section */}
      <section className="py-24 bg-secondary-500 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-center">
            Por que agendar sua reunião agora?
          </h2>
          <div className="grid gap-12 mb-12">
            <div>
              <p className="text-white/90 font-comfortaa text-lg">
                Quanto antes começarmos a planejar sua viagem, <span className="text-accent-500 font-bold">melhores opções</span> teremos disponíveis. Agende sua reunião agora e garanta as melhores experiências.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button 
              onClick={() => setIsContactModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Por que agendar agora Section - Para Relaxar'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero agendar minha reunião
            </Button>
          </div>
        </div>
      </section>

      {/* Trip Evolved Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
                Por que existimos
              </h2>
              <p className="text-secondary-600 font-comfortaa text-lg">
                A Trip Evolved nasceu através da inquietude de seus membros quanto à falta de personalização do mercado de viagens.
              </p>
              <p className="text-secondary-600 font-comfortaa text-lg mt-4">
                Assim como milhares de viajantes ao redor do mundo, acreditamos que viagens são experiências únicas, frutos de sonhos individuais, e que merecem ser tratadas dessa maneira.
              </p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/brand/logo-principal.svg"
                alt="Trip Evolved Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection source="Para Relaxar" />

      {/* Final CTA Section */}
      <section className="py-24 bg-secondary-900 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
            Vamos transformar sua viagem em uma <span className="text-accent-500">experiência única?</span>
          </h2>
          <p className="text-white/90 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Agende uma reunião com nossos especialistas e comece a planejar a viagem dos seus sonhos hoje mesmo.
          </p>
          <Button
            onClick={() => setIsContactModalOpen(true)}
            event="pre_agendar"
            eventOptions={{
              source: 'Final CTA Section - Para Relaxar'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Quero agendar minha reunião
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection source="Para Relaxar" />

      {/* Contact Expert Modal */}
      <ContactExpertModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onSuccess={handleContactSuccess}
        additionalMetadata={[
          {
            key: 'source',
            value: 'Para Relaxar',
            keyDescription: 'Fonte do lead'
          }
        ]}
      />
    </div>
  )
} 