import Image from 'next/image'
import ExperienceCarousel from '@/components/ExperienceCarousel'
import Link from 'next/link'
import QuotesCarousel from '@/components/QuotesCarousel'
import FAQ from '@/components/FAQ'
import DestinationsSection from '@/components/DestinationsSection'
import ContactCard from '@/components/ContactCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Viagens Personalizadas | Trip Evolved',
  description: 'Crie sua viagem perfeita com a Trip Evolved. Destinos exclusivos, experiências autênticas e roteiros personalizados para seu estilo de viajante.',
  alternates: {
    canonical: 'https://tripevolved.com.br',
  },
}

const faqQuestions = [
  {
    question: "O que é a Trip Evolved?",
    answer: {
      html: "Somos uma agência de viagens dedicada a construir viagens especiais, personalizadas, que ficam gravadas na memória de nossos clientes, sem fugir do seu orçamento. Nossos especialistas realizam a curadoria de cada destino que oferecemos, em detalhes, e nosso processo é preparado para entender o seu perfil de viajante e objetivo de viagem, usando essas informações para criar experiências inesquecíveis.<br/> Estamos registrados no <a href=\"https://cadastur.turismo.gov.br/hotsite/\">Cadastur</a> (Ministério do Turismo) sob o número 47.875.077/0001-79."
    }
  },
  {
    question: "A Trip Evolved atende de maneira virtual ou presencial?",
    answer: "Somos 100% digitais para te proporcionar atendimento em qualquer lugar do mundo. Porém, acreditamos na união entre a tecnologia e a humanização, e você será atendido por uma equipe de especialistas disposta a te dar todo o suporte necessário antes, durante e depois da sua viagem."
  },
  {
    question: "Preciso reservar minhas passagens aéreas e hotéis separadamente?",
    answer: "Não. Como uma agência de viagens, temos parcerias com diversos fornecedores de hospedagem, companhias aéreas e todos os demais itens da sua viagem. O seu pagamento e relacionamento é todo com a Trip Evolved: vamos cuidar de cada detalhe para você, para que sua única preocupação seja curtir a viagem."
  },
  {
    question: "Existe um custo pela assessoria e personalização dos roteiros?",
    answer: {
      html: "A assessoria e personalização dos roteiros está inclusa quando você fecha uma viagem conosco. Cobramos uma taxa de serviço sobre o valor total da sua viagem."
    }
  },
  {
    question: "E se ocorrerem imprevistos na viagem?",
    answer: "Estaremos à sua disposição para resolvê-los da melhor forma possível, como parte de nossa assessoria 360°."
  }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero-bg.jpg"
            alt="Destino de viagem exclusivo da Trip Evolved"
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
              A viagem perfeita não se encontra. Ela se cria
            </h1>
            <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
              Jornadas sob medida, pensadas para seu estilo. Porque <span className="font-bold">exclusividade</span> começa com personalização.
            </p>
            <Link 
              href="#contact"
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Descobrir minha viagem
            </Link>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Content Column */}
            <div className="w-full lg:w-[70%]">
              <h2 className="font-baloo text-4xl md:text-5xl font-bold mb-6 text-secondary-500">
                Sua viagem única começa aqui
              </h2>
              <p className="font-comfortaa text-xl text-gray-600 mb-8">
                Roteiros exclusivos e personalizados para você viver experiências autênticas que combinam com seu estilo de viajante.
              </p>
              <Link 
                href="#contact"
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Descobrir minha viagem
              </Link>
            </div>

            {/* Images Column */}
            <div className="relative w-full lg:w-[30%] h-[400px]">
              <div className="absolute right-0 top-0 w-4/5 h-72 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/assets/scenery1.jpg"
                  alt="Destino de viagem exclusivo - Paisagem natural"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                  quality={85}
                />
              </div>
              <div className="absolute right-8 top-48 w-4/5 h-72 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/assets/scenery2.jpg"
                  alt="Destino de viagem exclusivo - Experiência única"
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
      <section className="py-20 bg-white">
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
          <button className="font-baloo bg-primary-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-all">
            Descobrir minha viagem
          </button>
        </div>
      </section>
    </div>
  )
} 