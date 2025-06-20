'use client'

import Image from 'next/image'
import ExperienceCarousel from '@/components/ExperienceCarousel'
import QuotesCarousel from '@/components/QuotesCarousel'
import FAQ from '@/components/FAQ'
import DestinationsSection from '@/components/DestinationsSection'
import ContactCard from '@/components/ContactCard'
import { useWizard } from '@/contexts/WizardContext'
import Button from '@/components/common/Button'
import Link from 'next/link'

interface HomeContentProps {
  faqQuestions: Array<{
    question: string;
    answer: string | { html: string };
  }>;
}

export default function HomeContent({ faqQuestions }: HomeContentProps) {
  const { openWizard } = useWizard()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/home/hero-praia.jpg"
            alt="Praias paradisíacas é com a Trip Evolved"
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
            <h1 className="font-baloo text-5xl md:text-7xl font-bold mb-6 text-white">
              A viagem perfeita não se encontra. Ela é criada.
            </h1>
            <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
              Jornadas sob medida, pensadas para seu estilo. Porque <span className="font-bold">exclusividade</span> começa com personalização.
            </p>
            <Button 
              onClick={openWizard}
              event="pre_descobrir_viagem"
              eventOptions={{
                source: 'Hero Section - Home'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Descobrir minha viagem
            </Button>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Content Column */}
            <div className="w-full lg:w-[70%]">
              <h2 className="font-baloo text-4xl md:text-5xl font-bold mb-6 text-secondary-500">
                Para você, que não quer pacotes prontos nem perder tempo
              </h2>
              <p className="font-comfortaa text-xl text-gray-600 mb-8">
                Roteiros exclusivos e personalizados para você viver experiências autênticas que combinam com seu estilo de viajante. Sempre respeitando seu orçamento.
              </p>
              <Button 
                onClick={openWizard}
                event="pre_descobrir_viagem"
                eventOptions={{
                  source: 'Second Section - Home'
                }}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Descobrir minha viagem
              </Button>
            </div>

            {/* Images Column */}
            <div className="relative w-full lg:w-[30%] h-[450px]">
              <div className="absolute right-0 top-0 w-4/5 h-72 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/assets/home/yosemite-valley.jpg"
                  alt="Yosemite Valley"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                  quality={85}
                />
              </div>
              <div className="absolute right-8 top-48 w-4/5 h-72 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/assets/home/sancho-praia.jpg"
                  alt="Praia do Sancho"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                  quality={85}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-24 bg-secondary-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-4xl md:text-5xl font-bold mb-12 text-white text-center">
            Como <span className="text-accent-500">funciona</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Descubra sua viagem
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Clique em <span className="font-bold">&quot;descobrir minha viagem&quot;</span>, preencha o questionário e fale com um dos nossos especialistas. Vamos agendar uma reunião para entender suas expectativas e ideias para essa viagem. Essa reunião é gratuita e você não tem nenhuma obrigação de continuar conosco.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Construímos sua viagem
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Você receberá uma proposta que vai muito além da hospedagem e voo: você terá um itinerário completo, atrações, restaurantes... momentos únicos e jóias escondidas do seu destino que você <span className="font-bold">não conseguiria encontrar sozinho</span>. Essa proposta custa R$1.200,00, valor referente à nossa taxa de consultoria.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Reservas e viagem
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Confirme sua viagem realizando o pagamento e vamos realizar <span className="font-bold">todas as reservas necessárias</span>. Você também terá auxílio com toda a documentação para só se preocupar em embarcar. Além disso, você tem suporte 24/7 e um serviço de concierge enquanto viaja: vamos reservar os restaurantes, atrações e tudo que você precisar.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button 
              onClick={openWizard}
              event="pre_descobrir_viagem"
              eventOptions={{
                source: 'Como funciona Section - Home'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Descobrir minha viagem
            </Button>
          </div>
        </div>
      </section>

      {/* Third Section - Destinations */}
      <DestinationsSection />

      {/* Fourth Section - Experiences Carousel */}
      <section className="py-24 bg-secondary-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-4xl md:text-5xl font-bold mb-12 text-white">
            Viagens que não saem da nossa mente
          </h2>
          <ExperienceCarousel />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Card */}
            <div className="bg-secondary-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <svg className="w-12 h-12 text-accent-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <h3 className="text-2xl font-baloo font-bold text-secondary-900 mb-2">
                  Descobrir meu perfil de viajante
                </h3>
                <p className="text-secondary-600 font-comfortaa">
                  Aqui, a viagem começa com seu perfil de viajante. Se descubra.
                </p>
              </div>
              <Link 
                href="/perfil"
                className="inline-flex items-center gap-2 bg-accent-500 text-white px-6 py-3 rounded-full font-baloo font-semibold hover:bg-accent-600 transition-colors"
              >
                Fazer o teste
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Contact Card */}
            <ContactCard phoneNumber="5512991694499" />
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-16 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-4">
              O que nossos viajantes dizem
            </h2>
            <p className="text-lg text-secondary-600 font-comfortaa max-w-2xl mx-auto">
              Descubra as experiências reais de quem já viveu momentos únicos conosco
            </p>
          </div>
          <QuotesCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-4">
              O que é a Trip Evolved?
            </h2>
            <p className="text-lg text-secondary-600 font-comfortaa max-w-2xl mx-auto">
              Tire suas dúvidas sobre nossa agência e como trabalhamos
            </p>
          </div>
          <FAQ questions={faqQuestions} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-primary-900">
            Vamos começar sua jornada?
          </h2>
          <Button 
            onClick={openWizard}
            event="pre_descobrir_viagem"
            eventOptions={{
              source: 'Final CTA Section - Home'
            }}
            className="font-baloo bg-primary-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-all"
          >
            Descobrir minha viagem
          </Button>
        </div>
      </section>
    </div>
  )
} 