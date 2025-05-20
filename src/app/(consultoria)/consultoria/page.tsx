'use client'

import Image from 'next/image'
import { useState } from 'react'
import FAQ from '@/components/FAQ'
import LeadForm from '@/components/LeadForm'
import ContactExpertModal from '@/components/ContactExpertModal'

export default function ConsultoriaPage() {
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const faqQuestions = [
    {
      question: "Por que vocês só fazem 6 viagens por mês?",
      answer: "Limitamos nosso número de viagens para garantir que cada casal receba atenção personalizada e dedicada. Isso nos permite criar experiências verdadeiramente únicas e cuidar de cada detalhe com o carinho que merecem."
    },
    {
      question: "Vocês reservam os meus voos e hospedagem?",
      answer: "Sim! Nós cuidamos de toda a parte operacional da sua viagem, incluindo voos, hospedagens, traslados e experiências. Mas vamos muito além disso, com experiência local nos destinos, um concierge de viagens e auxílio pré-viagem. Vocês só precisam se preocupar em aproveitar cada momento."
    },
    {
      question: "Quais destinos vocês oferecem?",
      answer: "Trabalhamos com destinos em todo o mundo, sempre focando naqueles que melhor se encaixam no perfil e nos desejos de cada casal. Nossa expertise inclui desde destinos românticos na Europa até experiências únicas no Caribe, Estados Unidos e América do Sul."
    },
    {
      question: "E se eu tiver um problema com minha viagem?",
      answer: "Oferecemos suporte 24/7 durante toda a sua viagem. Nossa equipe está sempre pronta para ajudar com qualquer situação, desde mudanças de reservas até emergências. Você nunca estará sozinho."
    },
    {
      question: "Por que vocês cobram para realizar a proposta?",
      answer: "Não trabalhamos com pacotes prontos. Cada viagem que construímos é unica e merece um planejamento especial. O valor de R$500,00 é um investimento que garante essa proposta detalhada e personalizada, fruto de horas de pesquisa e planejamento. Este valor é totalmente abatido no fechamento da viagem, demonstrando nosso compromisso com a qualidade do serviço."
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/consultoria/hero-casal.png"
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
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
              Sua viagem a dois. Com experiências que vocês não conseguem encontrar sozinhos.
            </h1>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero agendar uma reunião
            </button>
          </div>
        </div>
      </section>

      {/* Para casais que Section */}
      <section className="py-24 bg-secondary-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-white">
            Para casais que sonham com <span className="text-accent-500">a viagem perfeita</span>, mas se veem presos entre excesso de informações e roteiros genéricos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Personalização Total</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Vocês não querem um pacote pronto nem viver o mesmo roteiro que todo mundo.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Reconexão</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Vivem uma rotina corrida e querem reencontrar a conexão do casal
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Momentos únicos</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Valorizam experiências autênticas, mas tem medo de ciladas turísticas
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Conhecimento especializado</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Pesquisam muito, mas sentem que falta algo com todo o conteúdo online
              </p>
            </div>

            {/* Card 5 */}
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
                Querem facilidade e segurança na organização, para poderem apenas aproveitar
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Correria do dia a dia</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Falta tempo para encontrar a experiência certa e sobrecarrega uma pessoa do casal
              </p>
            </div>
          </div>
          <div className="text-center">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="inline-block font-baloo bg-primary-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-600 transition-all"
            >
              Quero agendar minha reunião
            </button>
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
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero agendar minha reunião
            </button>
          </div>
        </div>
      </section>

      {/* Como funciona Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-16">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
              Do primeiro contato ao último brinde da viagem, tudo pensado <span className="text-accent-500">com carinho e estratégia</span>
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
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero agendar minha reunião
            </button>
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
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero agendar minha reunião
            </button>
          </div>
        </div>
      </section>

      {/* Trip Evolved Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
                Porque existimos
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
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-secondary-900 text-center">
            Perguntas Frequentes
          </h2>
          <FAQ questions={faqQuestions} />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-secondary-900 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
            Vamos transformar sua viagem em uma <span className="text-accent-500">experiência única?</span>
          </h2>
          <p className="text-white/90 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Agende uma reunião com nossos especialistas e comece a planejar a viagem dos seus sonhos hoje mesmo.
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Quero agendar minha reunião
          </button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
            Ainda não é o momento certo?
          </h2>
          <p className="text-secondary-600 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Assine nossa newsletter para os melhores conteúdos para sua viagem.
          </p>
          <button
            onClick={() => setIsNewsletterModalOpen(true)}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Assinar newsletter
          </button>
        </div>
      </section>

      {/* Newsletter Modal */}
      {isNewsletterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setIsNewsletterModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 className="text-2xl font-baloo font-bold text-primary-600 mb-2">
              Assine nossa newsletter
            </h2>
            <p className="text-gray-600 mb-6">
              Preencha seus dados para receber conteúdos exclusivos sobre viagens.
            </p>
            <LeadForm 
              onSuccess={() => setIsNewsletterModalOpen(false)}
              submitButtonText="Assinar"
              additionalMetadata={[
                {
                  key: 'source',
                  value: 'newsletter',
                  keyDescription: 'Fonte do lead'
                }
              ]}
            />
          </div>
        </div>
      )}

      {/* Contact Expert Modal */}
      <ContactExpertModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  )
} 