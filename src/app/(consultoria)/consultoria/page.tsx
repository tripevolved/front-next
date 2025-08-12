'use client'

import Image from 'next/image'
import { useState } from 'react'
import { MuxVideoPlayer } from '@/components/MuxVideoPlayer'
import LeadFlowModal from '@/components/consultancy/LeadFlowModal'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import FAQSection from '@/components/consultancy/FAQSection'
import TripEvolvedSection from '@/components/consultancy/TripEvolvedSection'
import QuotesCarousel from '@/components/QuotesCarousel'
import Button from '@/components/common/Button'

export default function ConsultoriaPage() {
  const [isLeadFlowModalOpen, setIsLeadFlowModalOpen] = useState(false)

  const destinations = [
    'Itália',
    'Portugal',
    'Caribe',
    'Patagônia',
    'Estados Unidos',
    'Argentina'
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/consultoria/hero-casal.jpg"
            alt="Casal em viagem romântica"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
            Sua viagem a dois. Com experiências que vocês não conseguem encontrar sozinhos.
          </h1>
          <Button 
            onClick={() => {
              document.getElementById('video-section')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
            event="pre_agendar"
            eventOptions={{
              source: 'Hero Section - Consultoria'
            }}
            className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Quero saber mais
          </Button>
        </div>
      </section>

      {/* Video Section */}
      <section id="video-section" className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-4 text-secondary-900">
              Veja como funciona
            </h2>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <MuxVideoPlayer 
              className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh]"
              playbackId="7cTDzzE2b5clh2Z00ea100epbv02uWd016JTnSX1GIiOKj4"
              isMuted={false}
              loop={false}
              autoplay={true}
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-secondary-100">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-16">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
              A <span className="text-accent-500">Jornada Evolved</span> tem um processo pensado para minimizar o seu esforço
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
                Primeiro Contato
              </h3>
              <p className="text-secondary-600 mb-4">
                Você clica em "Começar minha jornada" e preenche um formulário rápido com suas preferências de viagem
              </p>
              <div className="bg-accent-50 p-4 rounded-lg">
                <p className="text-sm text-accent-700 font-semibold">
                  ⏱️ Menos de 5 minutos para preencher
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
                Dossiê da Viagem
              </h3>
              <p className="text-secondary-600 mb-4">
                Nossos especialistas preparam um dossiê personalizado com a primeira proposta da sua viagem dos sonhos
              </p>
              <div className="bg-accent-50 p-4 rounded-lg">
                <p className="text-sm text-accent-700 font-semibold">
                  📋 Proposta detalhada em até 48 horas
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="font-baloo text-xl font-bold mb-4 text-secondary-900">
                Contratação
              </h3>
              <p className="text-secondary-600 mb-4">
                Se você gostar da proposta, contrata a Jornada Evolved pagando a taxa de R$ 1.200,00 e começamos a criar sua viagem
              </p>
              <div className="bg-accent-50 p-4 rounded-lg">
                <p className="text-sm text-accent-700 font-semibold">
                  💳 Pagamento único e sem surpresas
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => {
                document.getElementById('service-breakdown')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              event="pre_agendar"
              eventOptions={{
                source: 'Process Section - Consultoria'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Começar minha jornada
            </Button>
          </div>
        </div>
      </section>

      {/* Momentos únicos Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-secondary-900">
            Vamos encontrar para vocês <span className="text-accent-500">momentos únicos</span> como...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/curacao-sunset.png"
                  alt="Jantar à beira-mar em Curaçao"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent duration-300 flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Jantar à beira-mar com pôr-do-sol em Curaçao
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/dolomitas-picnic.jpg"
                  alt="Piquenique nas Dolomitas"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent duration-300 flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Piquenique a dois no verão nas Dolomitas, Itália
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/yosemite-trail.png"
                  alt="Trilha em Yosemite"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent duration-300 flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Um trilha leve e paisagens incríveis em Yosemite, na Califórnia
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button 
              onClick={() => {
                document.getElementById('service-breakdown')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              event="pre_agendar"
              eventOptions={{
                source: 'Momentos únicos Section - Consultoria'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Começar minha jornada
            </Button>
          </div>
        </div>
      </section>

      {/* Viagem Personalizada Section */}
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <div className="relative h-[600px]">
              <div className="absolute top-0 left-0 w-[65%] h-[65%] z-10">
                <Image
                  src="/assets/consultoria/casal-praia.png"
                  alt="Casal na praia"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[65%] h-[65%]">
                <Image
                  src="/assets/consultoria/casal-jantar.png"
                  alt="Casal em jantar romântico"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-right">
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
                Cada viagem é pensada com vocês no centro de tudo
              </h2>
              <h3 className="font-baloo text-xl md:text-2xl font-semibold mb-8 text-primary-500">
                A gente entende o que vocês querem viver
              </h3>
              <div className="space-y-6 text-secondary-600 font-comfortaa text-lg">
                <p>
                  Vocês têm uma rotina intensa, pouco tempo a dois e um desejo comum: viver momentos que realmente façam sentido. Nós entendemos isso. É por isso que, antes de sugerir qualquer destino, ouvimos. Descobrimos juntos o que inspira, o que emociona, o que faz cada segundo valer a pena.
                </p>
                <p>
                  Com esse entendimento, construímos uma viagem com propósito. Desde a escolha da hospedagem perfeita até as experiências mais significativas — como aquele jantar especial ou um passeio inesperado — tudo ganha um ritmo que acompanha o casal. Assim, a viagem se torna uma história criada a partir de quem vocês são.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jornada Evolved - Irresistible Offer Section */}
      <section id="service-breakdown" className="py-24 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          {/* Scarcity Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
              ⚠️ APENAS 8 VAGAS POR MÊS
            </div>
            <h2 className="font-baloo text-4xl md:text-5xl font-bold mb-4">
              <span className="text-accent-500">Jornada Evolved</span>
            </h2>
            <p className="font-baloo text-2xl md:text-3xl font-semibold text-accent-300 mb-6">
              R$ 1.200,00
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              A viagem dos seus sonhos, criada por especialistas que entendem o que realmente importa
            </p>
          </div>

          {/* Core Services Section */}
          <div className="mb-16">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 mb-8">
              <h3 className="font-baloo text-2xl font-bold mb-6 text-accent-300 text-center">O que você recebe:</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-white">Curadoria de experiências e hospedagens</h4>
                    <p className="text-sm text-white/70">
                      <span className="text-accent-300 font-bold text-base">R$ 800,00</span> em tempo poupado para você e segurança de estar fazendo a melhor escolha
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-white">Itinerário com a logística ideal</h4>
                    <p className="text-sm text-white/70">
                      <span className="text-accent-300 font-bold text-base">R$ 400,00</span> em pesquisas e reservas de trens, alugueis de carro, transfers e o que mais for necessário
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-white">Destinos fora do óbvio</h4>
                    <p className="text-sm text-white/70">
                      <span className="text-accent-300 font-bold text-base">R$ 400,00</span> em acesso ao conhecimento de especialistas
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-white">Momentos únicos</h4>
                    <p className="text-sm text-white/70">
                      <span className="text-accent-300 font-bold text-base">R$ 500,00</span> em momentos que fazem você pensar "valeu cada centavo"
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-white">Checklist de documentação necessária</h4>
                    <p className="text-sm text-white/70">
                      <span className="text-accent-300 font-bold text-base">R$ 149,00</span> em organização para você não esquecer nada
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-white">Rechecagem de todas as reservas da viagem</h4>
                    <p className="text-sm text-white/70">
                      <span className="text-accent-300 font-bold text-base">R$ 299,00</span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-white">Assistência 24/7 Trip Evolved</h4>
                    <p className="text-sm text-white/70">
                      <span className="text-accent-300 font-bold text-base">R$ 500,00</span> em tranquilidade para a viagem
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Services Value */}
            <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 p-6 rounded-xl border border-green-400/30 mb-8">
              <div className="text-center">
                <p className="text-sm text-white/70 mb-2">VALOR DOS SERVIÇOS PRINCIPAIS:</p>
                <p className="font-baloo text-3xl font-bold text-green-400">R$ 3.048,00</p>
                <p className="text-sm text-white/70 mt-2">Você paga apenas R$ 1.200,00</p>
                <p className="text-lg font-bold text-green-400 mt-2">ECONOMIA DE R$ 1.848,00</p>
              </div>
            </div>

            {/* First CTA */}
            <div className="text-center">
              <div className="bg-red-600/20 border border-red-400/30 p-4 rounded-xl mb-6">
                <p className="text-white font-semibold">
                  ⏰ ÚLTIMAS VAGAS DISPONÍVEIS PARA ESTE MÊS
                </p>
              </div>
              <Button 
                onClick={() => setIsLeadFlowModalOpen(true)}
                event="pre_agendar"
                eventOptions={{
                  source: 'Jornada Evolved Core Services - Consultoria'
                }}
                className="inline-block font-baloo bg-accent-500 text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-accent-600 transition-all transform hover:scale-105 shadow-2xl"
              >
                Começar minha jornada
              </Button>
              <p className="text-sm text-white/60 mt-4">
                ⚡ Nossos especialistas vão te chamar no whatsapp em até 24 horas
              </p>
            </div>
          </div>

          {/* Bonuses Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-accent-500/20 to-accent-600/20 p-8 rounded-xl border border-accent-400/30 mb-8">
              <h3 className="font-baloo text-2xl font-bold mb-6 text-accent-300 text-center">🎁 BÔNUS EXCLUSIVOS:</h3>
              <div className="space-y-6">
                <div className="bg-white/10 p-6 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Evolved Experiências</h4>
                  <p className="text-sm text-white/70 mb-3">
                    <span className="text-accent-300 font-bold text-base">R$ 300,00</span> por dia de viagem em:
                  </p>
                  <ul className="text-sm text-white/70 space-y-2 ml-4">
                    <li>• Roteiro com o seu ritmo</li>
                    <li>• Plano de contingência para chuva e outros imprevistos</li>
                    <li>• Lembretes das atividades da viagem</li>
                    <li>• Indicações de restaurantes</li>
                  </ul>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h4 className="font-semibold text-white">Kit de memórias pós-viagem</h4>
                  <p className="text-sm text-white/70">
                    <span className="text-accent-300 font-bold text-base">R$ 299,00</span> em recordações organizadas da sua viagem
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h4 className="font-semibold text-white">Mentoria 1-1 para organização de mala</h4>
                  <p className="text-sm text-white/70">
                    <span className="text-accent-300 font-bold text-base">R$ 300,00</span> em orientação personalizada para sua bagagem
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h4 className="font-semibold text-white">Itinerário da próxima viagem</h4>
                  <p className="text-sm text-white/70">
                    <span className="text-accent-300 font-bold text-base">R$ 400,00</span> em planejamento antecipado da sua próxima aventura
                  </p>
                </div>
              </div>
            </div>

            {/* Bonuses Value */}
            <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 p-6 rounded-xl border border-purple-400/30 mb-8">
              <div className="text-center">
                <p className="text-sm text-white/70 mb-2">VALOR DOS BÔNUS EXCLUSIVOS:</p>
                <p className="font-baloo text-3xl font-bold text-purple-400">R$ 2.499,00</p>
                <p className="text-sm text-white/70 mt-2">INCLUÍDOS SEM CUSTO ADICIONAL</p>
              </div>
            </div>

            {/* Second CTA */}
            <div className="text-center">
              <Button 
                onClick={() => setIsLeadFlowModalOpen(true)}
                event="pre_agendar"
                eventOptions={{
                  source: 'Jornada Evolved Bonuses - Consultoria'
                }}
                className="inline-block font-baloo bg-accent-500 text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-accent-600 transition-all transform hover:scale-105 shadow-2xl"
              >
                Começar minha jornada
              </Button>
              <p className="text-sm text-white/60 mt-4">
                ⚡ Nossos especialistas vão te chamar no whatsapp em até 24 horas
              </p>
            </div>
          </div>

          {/* Total Value Summary */}
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 p-8 rounded-xl border border-blue-400/30">
            <div className="text-center">
              <p className="text-sm text-white/70 mb-2">VALOR TOTAL DOS ITENS INCLUÍDOS NA SUA JORNADA:</p>
              <p className="font-baloo text-4xl font-bold text-blue-400">R$ 5.547,00</p>
              <p className="text-sm text-white/70 mt-2">Você paga apenas R$ 1.200,00</p>
              <p className="text-xl font-bold text-blue-400 mt-2">ECONOMIA TOTAL DE R$ 4.347,00</p>
              <p className="text-sm text-white/60 mt-4">
                💎 Inclui todos os serviços principais + todos os bônus exclusivos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trip Evolved Section */}
      <TripEvolvedSection />

      {/* Customer Quotes Section */}
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-center text-secondary-900">
            O que nossos clientes dizem sobre nós
          </h2>
          <QuotesCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection source="Consultoria" />

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-accent-500 to-accent-600 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
            Pronto para começar sua <span className="text-white">Jornada Evolved</span>?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se aos casais que já transformaram suas ideias em viagens incríveis. 
            Nossos especialistas estão prontos para te guiar nesse processo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setIsLeadFlowModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Final CTA Section - Consultoria'
              }}
              className="inline-block font-baloo bg-white text-accent-600 px-12 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              Começar minha jornada
            </Button>
            <div className="text-sm text-white/80">
              ⚡ Nossos especialistas vão te chamar no whatsapp em até 24 horas
            </div>
          </div>
          <div className="mt-8 text-sm text-white/70">
            <p>🎯 Apenas 8 vagas disponíveis por mês</p>
            <p>💎 Economia total de R$ 4.347,00 em valor</p>
          </div>
        </div>
      </section>

      {/* Lead Flow Modal */}
      <LeadFlowModal
        isOpen={isLeadFlowModalOpen}
        onClose={() => setIsLeadFlowModalOpen(false)}
        destinations={destinations}
        source="Consultoria"
      />
    </div>
  )
} 