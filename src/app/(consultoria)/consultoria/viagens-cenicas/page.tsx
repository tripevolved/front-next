'use client'

import Image from 'next/image'
import { useState } from 'react'
import ContactExpertModal from '@/components/ContactExpertModal'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import FAQSection from '@/components/consultancy/FAQSection'
import Button from '@/components/common/Button'

export default function ViagensCenicasPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/consultoria/viagens-cenicas/casal-yosemite.jpg"
            alt="Vista panorâmica do Vale do Yosemite"
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
              Viagens que transformam paisagens em memórias inesquecíveis a dois.
            </h1>
            <Button 
              onClick={() => setIsContactModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Hero Section - Viagens Cênicas'
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Visuais icônicos</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Buscam paisagens que parecem saídas de um sonho e querem capturar cada momento especial.
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
                <h3 className="font-baloo text-xl font-bold text-white">Alma Aventureira</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Têm espírito explorador, mas querem segurança e conforto em cada experiência.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Tranquilidade</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Buscam paz e conexão com a natureza, longe da correria do dia a dia.
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
                <h3 className="font-baloo text-xl font-bold text-white">Segurança</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Preocupam-se com a logística e segurança em destinos mais remotos e naturais.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Tempo Limitado</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Querem aproveitar cada minuto, sem perder tempo com planejamento e organização.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Experiências Autênticas</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Buscam lugares fora do comum, mas temem cair em armadilhas turísticas.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button 
              onClick={() => setIsContactModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Para casais que Section - Viagens Cênicas'
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
                  src="/assets/consultoria/viagens-cenicas/pacific-coast-highway.jpg"
                  alt="Pacific Coast Highway"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[65%] h-[65%]">
                <Image
                  src="/assets/consultoria/dolomitas-picnic.jpg"
                  alt="Vista das Dolomitas"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-right">
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
                Cada viagem é uma oportunidade de viver momentos que parecem impossíveis
              </h2>
              <h3 className="font-baloo text-xl md:text-2xl font-semibold mb-8 text-primary-500">
                A gente entende o que vocês querem viver
              </h3>
              <div className="space-y-6 text-secondary-600 font-comfortaa text-lg">
                <p>
                  Vocês têm uma alma aventureira e um olhar sensível para a beleza natural. Entendemos que cada vista tem seu momento ideal para ser vivida, cada trilha tem seu nível de dificuldade, e cada experiência merece ser vivida com segurança e conforto. É por isso que, antes de sugerir qualquer destino, ouvimos. Descobrimos juntos o que inspira, o que emociona, o que faz cada segundo valer a pena.
                </p>
                <p>
                  Com esse entendimento, construímos uma viagem que equilibra aventura e conforto. Tudo até as experiências mais significativas — como aquele café da manhã com vista para as montanhas ou um piquenique ao pôr do sol — tudo é pensado para que vocês possam se conectar com a natureza e um com o outro, sem preocupações.
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
                  src="/assets/consultoria/viagens-cenicas/torres-del-paine-lago-grey.jpg"
                  alt="Torres del Paine"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent duration-300 flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Trekking nas Torres del Paine, Chile
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/viagens-cenicas/casal-sicilia.jpg"
                  alt="Pôr do sol em Taormina, na Sicília"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent duration-300 flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Pôr do sol em Taormina, na Sicília
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/viagens-cenicas/ushuaia-arakur.jpg"
                  alt="Ushuaia"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent duration-300 flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Passeio de barco pelo Canal de Beagle, Ushuaia
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
                source: 'Momentos únicos Section - Viagens Cênicas'
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
              Do primeiro contato à última vista icônica da viagem, tudo pensado <span className="text-accent-500">com carinho e estratégia</span>
            </h2>
            <h3 className="font-baloo text-xl md:text-2xl font-semibold text-primary-500">
              Um processo sob medida para criar a viagem mais especial da vida de vocês
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
                    Tudo começa com uma conversa leve e acolhedora. Nela, entendemos o estilo de vocês, o que esperam viver juntos e como gostam de viajar. Explicamos com clareza o nosso serviço e o que será entregue em cada etapa. Essa reunião é gratuita e feita para vocês se sentirem à vontade — sem nenhuma obrigação de seguir.
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
                    Confirmação do projeto e proposta personalizada
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Com o pagamento de R$500, damos início à criação de uma proposta sob medida. Ela inclui recomendações de destinos, voos ideais, hospedagens certeiras e um roteiro desenhado com equilíbrio, exclusividade e experiências marcantes. O valor investido é totalmente abatido no fechamento da viagem.
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
                    Ajustes finos e aprovação da viagem
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    A proposta pode ser ajustada quantas vezes for necessário. O objetivo é garantir que cada detalhe reflita perfeitamente o que vocês imaginam. Quando tudo estiver como sonhado, seguimos com as reservas e toda a parte operacional da viagem.
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
                    Preparativos completos antes do embarque
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Vocês recebem orientações claras sobre vistos, vacinas e documentos essenciais. Também cuidamos de check-ins, horários de traslados e todos os pequenos detalhes que fazem a diferença. A ideia é que vocês embarquem tranquilos e animados.
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
                  Vocês terão acesso a um concierge dedicado e atendimento 24/7 para qualquer necessidade, desde reservas de restaurantes até dicas exclusivas no destino. E mesmo depois da volta, continuamos por perto para ouvir como foi — e começar a sonhar juntos com a próxima.
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
                source: 'Como funciona Section - Viagens Cênicas'
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-baloo font-bold mb-4">
                Vagas Limitadas
              </h3>
              <p className="text-white/90 font-comfortaa text-lg">
                Temos apenas <span className="text-accent-500 font-bold">6 vagas</span> por mês para garantir atenção máxima a vocês. Não perca a oportunidade de garantir sua vaga.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-baloo font-bold mb-4">
                Planejamento Antecipado
              </h3>
              <p className="text-white/90 font-comfortaa text-lg">
                Quanto antes começarmos a planejar sua viagem, <span className="text-accent-500 font-bold">melhores opções</span> teremos disponíveis. Garanta as melhores experiências.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button 
              onClick={() => setIsContactModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Por que agendar agora Section - Viagens Cênicas'
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
      <FAQSection source="Viagens Cênicas" />

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
              source: 'Final CTA Section - Viagens Cênicas'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Quero agendar minha reunião
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection source="Viagens Cênicas" />

      {/* Contact Expert Modal */}
      <ContactExpertModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        additionalMetadata={[
          {
            key: 'source',
            value: 'Viagens Cênicas',
            keyDescription: 'Fonte do lead'
          }
        ]}
      />
    </div>
  )
} 