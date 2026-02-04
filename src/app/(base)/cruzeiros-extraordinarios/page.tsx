import Image from 'next/image'
import Link from 'next/link'
import CruzeirosExtraordinariosHero from '@/components/cruises/CruzeirosExtraordinariosHero'
import CruiseSearchForm from '@/components/consultancy/CruiseSearchForm'
import JornadaGuidingCards from '@/components/cruises/JornadaGuidingCards'
import WhatsAppGroupButton from '@/components/cruises/WhatsAppGroupButton'

export default function CruzeirosExtraordinariosPage() {
  return (
    <div className="flex flex-col">
      <CruzeirosExtraordinariosHero />
      <CruiseSearchForm />

      {/* Partner Companies Section */}
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-16">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Os cruzeiros mais <span className="text-accent-500">exclusivos</span>
            </h2>
            <p className="text-secondary-600 font-comfortaa text-lg max-w-3xl mx-auto">
              Nós selecionamos as melhores companhias de cruzeiros do mundo para oferecer experiências únicas e inesquecíveis.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            <div className="flex items-center justify-center h-20 w-full">
              <Image
                src="/assets/home/cruzeiros/explora-logo.png"
                alt="Explora Journeys"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center h-20 w-full">
              <Image
                src="/assets/home/cruzeiros/azamara-logo.png"
                alt="Azamara"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center h-20 w-full">
              <Image
                src="/assets/home/cruzeiros/celebrity-logo.svg"
                alt="Celebrity Cruises"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center h-20 w-full">
              <Image
                src="/assets/home/cruzeiros/logo-princess.png"
                alt="Princess Cruises"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center h-20 w-full">
              <Image
                src="/assets/home/cruzeiros/logo-oceania-cruises.svg"
                alt="Oceania Cruises"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center h-20 w-full">
              <Image
                src="/assets/home/cruzeiros/ncl-logo.svg"
                alt="Norwegian Cruise Line"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 bg-secondary-200 py-16 px-4 md:px-0">
        <div className="w-full md:w-[80%] mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              O Círculo Evolved nasceu para te guiar, com toda a expertise e transparência que você precisa.
            </h2>
          </div>
          <div className="flex flex-col gap-9 justify-center items-center px-6 text-secondary-900">
            <JornadaGuidingCards />
            <div className="text-center mt-8">
              <Link
                href="/circulo-evolved"
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl"
              >
                Quero saber mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Group Section */}
      <section className="py-16 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <p className="font-comfortaa text-lg text-secondary-600 mb-6 max-w-2xl mx-auto">
            Não é o momento ideal para uma conversa? Entre em nosso grupo exclusivo, com a melhor curadoria de cruzeiros de luxo.
          </p>
          <WhatsAppGroupButton
            href="https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI"
            size="compact"
          />
        </div>
      </section>
    </div>
  )
}
