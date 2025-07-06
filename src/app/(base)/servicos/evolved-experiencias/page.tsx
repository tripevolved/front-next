'use client'

import Image from 'next/image'
import { useState } from 'react'
import Button from '@/components/common/Button'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import FAQ from '@/components/FAQ'
import ScriptFlowModal from '@/components/consultancy/ScriptFlowModal'
import { ScriptOutline } from '@/components/scripts/ScriptOutline'
import { Script } from '@/components/scripts/types'
import { MuxVideoPlayer } from '@/components/MuxVideoPlayer'

export default function EvolvedExperienciasPage() {
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false)

  // Curacao script data for future experience
  const sampleScript: Script = {
    startDate: '2025-03-13',
    endDate: '2025-03-20',
    days: [
      {
        dayNumber: 1,
        isAvailable: true,
        dayActions: [
          {
            id: '1-1',
            image: '/assets/experiences/curacao/oi-curacao.png',
            title: 'Bem-vindo a Curaçao!',
            subtitle: 'Chegada e primeiro contato com a ilha',
            description: 'Você será recebido com uma vista deslumbrante ao chegar em Curaçao. Muita natureza e um mar espetacular te aguardam! Check-in no Coral Estate Luxury Resort, um resort exclusivo à beira-mar com vista privilegiada.',
            time: '14:00 - 18:00',
            location: 'Coral Estate Luxury Resort',
            highlights: [
              'Vista espetacular do resort',
              'Acesso direto à praia paradisíaca',
              'Ambiente super tranquilo',
              'Primeiro contato com a natureza local'
            ],
            gallery: [
              '/assets/experiences/curacao/oi-curacao.png',
              '/assets/experiences/curacao/coral-estate.png'
            ]
          }
        ]
      },
      {
        dayNumber: 2,
        isAvailable: true,
        dayActions: [
          {
            id: '2-1',
            image: '/assets/experiences/curacao/cas-abao.png',
            title: 'Manhã em Cas Abao',
            subtitle: 'Primeira praia paradisíaca',
            description: 'Comece o dia explorando Cas Abao, uma das praias mais bonitas do norte de Curaçao. Águas cristalinas e paisagens espetaculares te aguardam.',
            time: '09:00 - 12:00',
            location: 'Cas Abao',
            highlights: [
              'Águas cristalinas',
              'Paisagens espetaculares',
              'Primeira experiência de praia',
              'Fotos incríveis'
            ],
            gallery: [
              '/assets/experiences/curacao/cas-abao.png',
              '/assets/experiences/curacao/coral-estate.png'
            ]
          },
          {
            id: '2-2',
            image: '/assets/experiences/curacao/cas-abao.png',
            title: 'Tarde em Porto Marie',
            subtitle: 'Segunda praia do norte',
            description: 'À tarde, continue a exploração em Porto Marie, outra joia do norte de Curaçao. Cada praia tem seu charme único.',
            time: '14:00 - 17:00',
            location: 'Porto Marie',
            highlights: [
              'Charme único da praia',
              'Continuidade da exploração',
              'Diferentes paisagens',
              'Experiência completa do norte'
            ],
            gallery: [
              '/assets/experiences/curacao/cas-abao.png',
              '/assets/experiences/curacao/coral-estate.png'
            ]
          },
          {
            id: '2-3',
            image: '/assets/experiences/curacao/coral-estate.png',
            title: 'Jantar no Karakter',
            subtitle: 'Jantar ao pôr do sol',
            description: 'Encerre o dia com um jantar incrível no Karakter, ao pôr do sol. A comida e o atendimento são impecáveis, mas a paisagem é o que faz toda a diferença.',
            time: '19:00 - 21:00',
            location: 'Karakter Restaurant',
            highlights: [
              'Jantar ao pôr do sol',
              'Comida impecável',
              'Atendimento excepcional',
              'Paisagem deslumbrante'
            ],
            gallery: [
              '/assets/experiences/curacao/coral-estate.png',
              '/assets/experiences/curacao/cas-abao.png'
            ]
          }
        ]
      },
      {
        dayNumber: 3,
        isAvailable: true,
        dayActions: [
          {
            id: '3-1',
            image: '/assets/experiences/curacao/kenepa-grandi.png',
            title: 'Manhã nas Kenepas',
            subtitle: 'Praias famosas de Curaçao',
            description: 'Dedique a manhã para explorar as famosas praias Kenepa Grandi e Kenepa Chiki. Cada uma tem suas características únicas e vistas deslumbrantes.',
            time: '08:00 - 12:00',
            location: 'Kenepa Grandi e Kenepa Chiki',
            highlights: [
              'Praias famosas de Curaçao',
              'Características únicas',
              'Vistas deslumbrantes',
              'Experiência matinal completa'
            ],
            gallery: [
              '/assets/experiences/curacao/kenepa-grandi.png',
              '/assets/experiences/curacao/lagun-blou.png'
            ]
          },
          {
            id: '3-2',
            image: '/assets/experiences/curacao/kenepa-grandi.png',
            title: 'Tarde em Playa Lagun',
            subtitle: 'A maior surpresa da viagem',
            description: 'À tarde, descubra Playa Lagun, que será a maior surpresa da sua viagem. Água mais profunda, perfeita para mergulhos, mas com um mar tranquilo demais!',
            time: '14:00 - 18:00',
            location: 'Playa Lagun',
            highlights: [
              'Água mais profunda para mergulhos',
              'Mar tranquilo e seguro',
              'Vista deslumbrante do Lagun Blou Resort',
              'Experiência única de mergulho'
            ],
            gallery: [
              '/assets/experiences/curacao/kenepa-grandi.png',
              '/assets/experiences/curacao/lagun-blou.png'
            ]
          },
          {
            id: '3-3',
            image: '/assets/experiences/curacao/lagun-blou.png',
            title: 'Jantar no Isabelle',
            subtitle: 'Jantar à beira-mar',
            description: 'Encerre o dia com um jantar romântico no Isabelle, um restaurante à beira-mar que oferece uma experiência gastronômica única.',
            time: '19:00 - 21:00',
            location: 'Isabelle Restaurant',
            highlights: [
              'Jantar romântico',
              'Restaurante à beira-mar',
              'Experiência gastronômica única',
              'Ambiente especial'
            ],
            gallery: [
              '/assets/experiences/curacao/lagun-blou.png',
              '/assets/experiences/curacao/kenepa-grandi.png'
            ]
          }
        ]
      },
      {
        dayNumber: 4,
        isAvailable: true,
        dayActions: [
          {
            id: '4-1',
            image: '/assets/experiences/curacao/pietermaai-culture.png',
            title: 'Check-in no Pietermaai',
            subtitle: 'Chegada ao bairro histórico',
            description: 'Mude-se para o coração cultural de Willemstad. Check-in no Pietermaai Boutique Hotel, localizado no bairro mais charmoso da cidade.',
            time: '10:00 - 12:00',
            location: 'Pietermaai Boutique Hotel',
            highlights: [
              'Bairro histórico vibrante',
              'Casas antigas reformadas',
              'Localização estratégica',
              'Ambiente cultural autêntico'
            ],
            gallery: [
              '/assets/experiences/curacao/pietermaai-culture.png',
              '/assets/experiences/curacao/pietermaai-boutique.png'
            ]
          },
          {
            id: '4-2',
            image: '/assets/experiences/curacao/pietermaai-culture.png',
            title: 'Exploração de Pietermaai',
            subtitle: 'Cultura e história local',
            description: 'Dedique a tarde para explorar o bairro de Pietermaai, conhecendo sua história, arquitetura única e cultura vibrante.',
            time: '14:00 - 18:00',
            location: 'Pietermaai, Willemstad',
            highlights: [
              'História do bairro',
              'Arquitetura única',
              'Cultura vibrante',
              'Exploração local'
            ],
            gallery: [
              '/assets/experiences/curacao/pietermaai-culture.png',
              '/assets/experiences/curacao/pietermaai-boutique.png'
            ]
          }
        ]
      },
      {
        dayNumber: 5,
        isAvailable: true,
        dayActions: [
          {
            id: '5-1',
            image: '/assets/experiences/curacao/punda-fort.png',
            title: 'Manhã em Punda',
            subtitle: 'Coração histórico de Willemstad',
            description: 'Explore Punda, o coração histórico de Willemstad. Conheça as casas coloridas, a arquitetura holandesa e os pontos históricos.',
            time: '09:00 - 12:00',
            location: 'Punda, Willemstad',
            highlights: [
              'Casas coloridas',
              'Arquitetura holandesa',
              'Pontos históricos',
              'Cultura local'
            ],
            gallery: [
              '/assets/experiences/curacao/punda-fort.png',
              '/assets/experiences/curacao/pietermaai-boutique.png'
            ]
          },
          {
            id: '5-2',
            image: '/assets/experiences/curacao/punda-fort.png',
            title: 'Tarde em Otrobanda',
            subtitle: 'Ponte Rainha Emma e Kura Hulanda',
            description: 'À tarde, atravesse a ponte Rainha Emma para Otrobanda. Visite a Kura Hulanda Village e explore o centro comercial charmoso com restaurantes ótimos.',
            time: '14:00 - 18:00',
            location: 'Otrobanda, Willemstad',
            highlights: [
              'Ponte Rainha Emma flutuante',
              'Kura Hulanda Village',
              'Centro comercial charmoso',
              'Restaurantes ótimos'
            ],
            gallery: [
              '/assets/experiences/curacao/punda-fort.png',
              '/assets/experiences/curacao/pietermaai-boutique.png'
            ]
          }
        ]
      },
      {
        dayNumber: 6,
        isAvailable: true,
        dayActions: [
          {
            id: '6-1',
            image: '/assets/experiences/curacao/klein-curacao-2.png',
            title: 'Klein Curaçao',
            subtitle: 'Paraíso intocado',
            description: 'Dedique o dia inteiro para Klein Curaçao, uma experiência imperdível. É natureza quase intocada, uma experiência única e inesquecível.',
            time: '08:00 - 17:00',
            location: 'Klein Curaçao',
            highlights: [
              'Natureza quase intocada',
              'Praia paradisíaca',
              'Experiência única',
              'Paisagem deslumbrante'
            ],
            gallery: [
              '/assets/experiences/curacao/klein-curacao-2.png',
              '/assets/experiences/curacao/pietermaai-boutique.png'
            ]
          }
        ]
      },
      {
        dayNumber: 7,
        isAvailable: true,
        dayActions: [
          {
            id: '7-1',
            image: '/assets/experiences/curacao/curacao.png',
            title: 'Últimos momentos',
            subtitle: 'Compras finais e partida',
            description: 'Aproveite as últimas horas em Curaçao para fazer compras de lembrancinhas e relaxar no hotel antes da partida.',
            time: '09:00 - 12:00',
            location: 'Willemstad e Hotel',
            highlights: [
              'Compras de lembrancinhas',
              'Relaxamento final',
              'Últimos passeios pela cidade',
              'Preparação para partida'
            ],
            gallery: [
              '/assets/experiences/curacao/curacao.png',
              '/assets/experiences/curacao/pietermaai-boutique.png'
            ]
          }
        ]
      }
    ]
  }

  const roteiroFAQQuestions = [
    {
      question: "Como funciona a criação do roteiro personalizado?",
      answer: "Começamos com uma reunião detalhada para entender seus interesses, estilo de viagem e objetivos. Nossos especialistas mergulham no destino e criam um roteiro dia a dia, com horários, locais específicos e experiências únicas que vão muito além do turismo tradicional."
    },
    {
      question: "O que está incluído no roteiro?",
      answer: "Cada roteiro inclui um cronograma detalhado com horários, locais específicos, recomendações de restaurantes exclusivos, experiências únicas, dicas locais e até mesmo sugestões de fotos. Tudo é pensado para criar momentos memoráveis e autênticos."
    },
    {
      question: "Posso personalizar o roteiro depois de recebido?",
      answer: "Absolutamente! O roteiro é seu e pode ser ajustado quantas vezes for necessário. Trabalhamos juntos para garantir que cada detalhe esteja perfeito antes da sua viagem começar."
    },
    {
      question: "Vocês reservam as atividades do roteiro?",
      answer: "A realização de reservas é parte do nosso serviço de concierge, que não está incluso com seu roteiro. Nossos especialistas podem te explicar como funciona em detalhes e, além disso, seu roteiro terá os detalhes indicando onde as reservas são necessárias."
    },
    {
      question: "E se eu quiser mudar algo durante a viagem?",
      answer: "O roteiro é um guia, não uma obrigação! Você tem total liberdade para adaptar conforme sua vontade."
    },
    {
      question: "Por que o valor é por dia?",
      answer: "Cada dia de roteiro representa horas de pesquisa, conhecimento local e personalização. O valor de R$300,00 por dia garante que cada momento da sua viagem seja cuidadosamente planejado para criar experiências únicas e memoráveis."
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/home/vista-capri.jpg"
            alt="Evolved Experiências - Cada dia, uma experiência única"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
              Evolved Experiências
            </h1>
            <p className="font-baloo text-xl md:text-2xl text-accent-300 mb-6">
              Cada dia, uma experiência única
            </p>
            <p className="font-comfortaa text-lg md:text-xl mb-8 text-white/90">
              Você quer transformar cada momento da viagem em algo extraordinário. Nossos especialistas mergulham no seu destino e criam um roteiro diário que vai muito além do óbvio. Cada manhã, tarde e noite será uma descoberta, uma surpresa, uma experiência que você nunca esquecerá. Prepare-se para viver momentos únicos em Curaçao.
            </p>
            <Button 
              onClick={() => setIsScriptModalOpen(true)}
              event="pre_descobrir_viagem"
              eventOptions={{
                source: 'Hero Section - Evolved Experiências'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero meu roteiro
            </Button>
          </div>
        </div>
      </section>

      {/* O que está incluído Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-secondary-900 text-center">
            O que está incluído nas <span className="text-accent-500">Evolved Experiências</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Roteiro Detalhado</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Cronograma completo dia a dia com horários e locais específicos.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Experiências Únicas</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Momentos autênticos que vão além dos roteiros turísticos tradicionais.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Restaurantes Exclusivos</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Lugares especiais para saborear a culinária local autêntica.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Reunião com especialista</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Conversa personalizada para entender seus desejos e criar o roteiro ideal.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Momentos Memoráveis</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Experiências que se transformam em histórias para contar.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Atrações Especiais</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Lugares e atividades que poucos turistas conhecem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Script Preview Section */}
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-4 text-secondary-900">
              Veja como seu <span className="text-accent-500">script personalizado</span> ficará
            </h2>
            <p className="text-secondary-600 font-comfortaa text-lg max-w-2xl mx-auto">
              Cada script é criado exclusivamente para você, com experiências únicas e momentos inesquecíveis
            </p>
          </div>
          <ScriptOutline 
            script={sampleScript}
            title="Exemplo de Script Personalizado"
            subtitle="Curaçao - 8 dias de experiências únicas"
            showModal={true}
          />
        </div>
      </section>

      {/* Por que escolher Section */}
      <section className="py-24 bg-accent-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
                Por que escolher as <span className="text-accent-300">Evolved Experiências</span>?
              </h2>
              <div className="space-y-6 text-white/90 font-comfortaa text-lg">
                <p>
                  As Evolved Experiências são para quem quer transformar cada momento da viagem em algo extraordinário. Nossos especialistas mergulham fundo no seu destino e criam um roteiro que vai muito além do óbvio.
                </p>
                <p>
                  Cada dia é cuidadosamente planejado para incluir experiências únicas, restaurantes autênticos e momentos que se transformam em histórias para contar. Não são apenas atividades - são memórias que você levará para sempre.
                </p>
                <p>
                  O script é personalizado para seu perfil, interesses e estilo de viagem, garantindo que cada experiência seja perfeita para você.
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative h-[500px]">
              <Image
                src="/assets/experiences/curacao/kenepa-grandi.png"
                alt="Kenepa Grandi - Praia paradisíaca de Curaçao"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Investimento Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
            Investimento nas <span className="text-accent-500">Evolved Experiências</span>
          </h2>
          <p className="text-secondary-600 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            A taxa por dia de roteiro garante que cada momento da sua viagem seja uma experiência única e memorável, criada especialmente para você.
          </p>
          <div className="bg-secondary-50 p-8 rounded-2xl max-w-md mx-auto mb-8">
            <div className="text-accent-500 font-baloo font-semibold text-xl mb-2">
              Taxa por Dia de Roteiro
            </div>
            <div className="text-3xl font-baloo font-bold text-secondary-900 mb-2">
              R$ 300,00
            </div>
            <p className="text-secondary-600 font-comfortaa">
              Valor por dia que inclui todas as experiências e recomendações
            </p>
          </div>
          <Button
            onClick={() => setIsScriptModalOpen(true)}
            event="pre_descobrir_viagem"
            eventOptions={{
              source: 'Investment Section - Evolved Experiências'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Quero meu roteiro
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-4 text-secondary-900">
              Dúvidas sobre nossos roteiros personalizados?
            </h2>
            <p className="text-secondary-600 font-comfortaa text-lg max-w-2xl mx-auto">
              Tire suas dúvidas sobre como criamos roteiros únicos e personalizados
            </p>
          </div>
          <FAQ questions={roteiroFAQQuestions} />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-secondary-900 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
            Pronto para criar suas <span className="text-accent-500">Evolved Experiências</span>?
          </h2>
          <p className="text-white/90 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Agende uma reunião com nossos especialistas e descubra como podemos transformar cada dia da sua viagem em uma experiência única.
          </p>
          <Button
            onClick={() => setIsScriptModalOpen(true)}
            event="pre_descobrir_viagem"
            eventOptions={{
              source: 'Final CTA Section - Evolved Experiências'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Quero meu roteiro
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection source="Evolved Experiências" />

      {/* Script Flow Modal */}
      <ScriptFlowModal
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
      />
    </div>
  )
} 