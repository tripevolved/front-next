'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import CirculoEvolvedSection from '@/components/circulo-evolved/CirculoEvolvedSection'

const BENEFIT_CARDS = [
  { id: 'curadoria', title: 'Curadoria', description: 'Seleção de destinos e experiências alinhadas ao que você busca.' },
  { id: 'travel-designer', title: 'Travel Designer Dedicado', description: 'Um parceiro para desenhar e cuidar de todas as suas viagens.' },
  { id: 'sem-comissoes', title: 'Sem comissões e taxas escondidas', description: 'Preços líquidos que antes eram acessíveis apenas às agências de viagem.' },
]

export default function BeneficiosPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const subscriptionType = searchParams?.get('tipo') === 'total' ? 'total' : 'essential'
  const benefitCards =
    subscriptionType === 'total'
      ? BENEFIT_CARDS
      : BENEFIT_CARDS.filter((c) => c.id !== 'travel-designer')
  const circuloHref = subscriptionType === 'total' ? '/circulo-evolved?tipo=total' : '/circulo-evolved'

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[500px] bg-secondary-500 text-white text-center py-20 lg:py-32">
        <div className="absolute top-1/2 left-[calc(50vw-10px)] lg:left-[calc(50vw+330px)] -translate-y-1/2 z-10">
          <Image
            src="/assets/sobre/hero-2.png"
            alt="Decorative element"
            width={170}
            height={170}
            className="lg:w-auto lg:h-auto"
          />
        </div>
        <div className="absolute top-1/2 right-[calc(50vw-40px)] lg:right-[calc(50vw+250px)] -translate-y-1/2 z-10">
          <Image
            src="/assets/sobre/hero-1.png"
            alt="Decorative element"
            width={200}
            height={200}
            className="lg:w-auto lg:h-auto"
          />
        </div>
        <div className="container md:w-[60%] mx-auto px-4 relative z-20 flex flex-col justify-end min-h-[400px]">
          <div className="text-6xl mb-6">🏕️</div>
          <h1 className="text-4xl md:text-5xl font-baloo font-bold">
            Acreditamos que viagens são <span className="text-accent-500">experiências únicas</span>
          </h1>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Benefícios do Círculo Evolved
            </h2>
            <p className="font-comfortaa text-lg text-secondary-600 max-w-2xl mx-auto">
              Acesso à nossa curadoria e a valores sem comissão — com um modelo alinhado à sua viagem.
            </p>
          </div>

          <div className={`grid md:grid-cols-${subscriptionType === 'total' ? '3' : '2'} gap-6 md:gap-8`}>
            {benefitCards.map((card) => (
              <div
                key={card.id}
                className="bg-secondary-50 rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm flex flex-col"
              >
                <h3 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900 mb-3">
                  {card.title}
                </h3>
                <p className="font-comfortaa text-secondary-700 mb-6 flex-1">
                  {card.description}
                </p>
                <Link
                  href={circuloHref}
                  className="font-baloo text-accent-600 font-semibold hover:text-accent-700 transition-colors text-left"
                >
                  Saiba mais →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Exist & Who We Are Section */}
      <section className="py-20 bg-primary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Why We Exist */}
            <div>
              <h2 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-6">
                Por que <span className="text-primary-500">existimos</span>
              </h2>
              <div className="text-secondary-600 space-y-4">
                <p className="text-lg">
                  A Trip Evolved nasceu da inquietude com um mercado de viagens em que você paga mais caro sem perceber — com comissões embutidas e pouca transparência.
                </p>
                <p className="text-lg">
                  Acreditamos que viagens são experiências únicas e que merecem curadoria, confiança e um modelo alinhado ao viajante — para você viajar melhor e investir melhor.
                </p>
              </div>
            </div>

            {/* Who We Are */}
            <div>
              <h2 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-6">
                Quem <span className="text-primary-500">somos</span>
              </h2>
              <div className="text-secondary-600">
                <p className="text-lg">
                  Somos uma agência de viagens online com curadoria, parceiros escolhidos a dedo e valores sem comissão - que antes estavam acessíveis apenas às agências de viagem.
                </p>
                <br />
                <p className="text-lg">
                  No Círculo Evolved, você tem acesso a valores sem comissão e a curadoria de destinos que transforma sua ideia de viagem em uma jornada bem desenhada, com valores de <span className="text-accent-700">10 a 30% menores</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CirculoEvolvedSection
        onCtaClick={() => router.push(circuloHref)}
        ctaText="Conhecer o Círculo Evolved"
        eventSource="Benefícios - Circulo Evolved Section"
        subscriptionType={subscriptionType}
      />

      {/* Founders Section */}
      <section className="py-20">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-12 text-center">
            Por trás <span className="text-primary-500">da Trip Evolved</span>
          </h2>
          <div className="grid grid-cols-1 gap-12 w-[400px] mx-auto">
            {/* Henrique */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/sobre/gasp.png"
                  alt="Henrique Gasparotto"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-baloo font-bold text-white mb-2">
                    Henrique Gasparotto
                  </h3>
                  <p className="text-white/90 font-comfortaa mb-4">
                    Engenheiro da Computação, um estudioso e apaixonado por viagens e tecnologia. A Trip Evolved nasce a partir das dores e das experiências que o Henrique viveu em sua jornada de viajante.
                  </p>
                  <div className="flex gap-4">
                    <Link 
                      href="https://www.instagram.com/hmgasparotto/"
                      target="_blank"
                      className="text-white hover:text-accent-500"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </Link>
                    <Link 
                      href="https://www.linkedin.com/in/hmgasparotto/"
                      target="_blank"
                      className="text-white hover:text-accent-500"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 