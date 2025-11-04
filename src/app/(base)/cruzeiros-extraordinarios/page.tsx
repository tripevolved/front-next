'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import LeadFlowModal from '@/components/consultancy/LeadFlowModal'
import CruiseSearchForm from '@/components/consultancy/CruiseSearchForm'
import CruiseLeadModal from '@/components/consultancy/CruiseLeadModal'
import Button from '@/components/common/Button'

export default function CruzeirosExtraordinariosPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [isCruiseModalOpen, setIsCruiseModalOpen] = useState(false)
  const [searchData, setSearchData] = useState({
    destination: '',
    month: '',
    duration: ''
  })

  const cruiseDestinations = [
    'Mediterrâneo',
    'Caribe',
    'Alasca',
    'Norte da Europa',
    'Amazônia',
    'Antártida'
  ]

  const handleCruiseSearch = (data: { destination: string; month: string; duration: string }) => {
    setSearchData(data)
    setIsCruiseModalOpen(true)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/home/cruzeiros-extraordinarios.jpg"
            alt="Cruzeiros extraordinários com a Trip Evolved"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="w-full px-4 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
            <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
                Cruzeiros extraordinários.<br /> Experiências únicas.<br /> Exclusividade em cada detalhe.
            </h1>
            <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
              Descubra destinos incríveis a bordo dos melhores navios, com experiências exclusivas e detalhes que você só recebe na Trip Evolved.
            </p>
            </div>

            {/* Full Width Search Form */}
            <div className="w-full">
              <CruiseSearchForm onSearch={handleCruiseSearch} />
            </div>
          </div>
        </div>
      </section>

      {/* Inspiring Destinations Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-16">
            <p className="text-accent-500 font-comfortaa text-lg mb-2">Descubra os</p>
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900">
              Lugares mais inspiradores
          </h2>
            <p className="text-secondary-600 font-comfortaa text-lg mt-6 max-w-3xl mx-auto">
              De águas cristalinas do Caribe às paisagens geladas da Antártida, cada destino oferece experiências únicas que transformam a maneira como você vê o mundo.
              </p>
            </div>

          {/* Caribbean */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/assets/home/cruzeiros/barbados.jpg"
                alt="Caribe - Águas cristalinas e praias paradisíacas"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="font-baloo text-3xl font-bold text-secondary-900">Caribe</h3>
              <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
                O Caribe é sinônimo de paraíso tropical. Com suas águas cristalinas em tons de azul turquesa, praias de areia branca e ilhas paradisíacas, cada porto oferece uma experiência única. Desde as coloridas casas de Curaçao até as praias isoladas das Bahamas, o Caribe combina cultura rica, história fascinante e paisagens deslumbrantes.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Praias paradisíacas</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Cultura vibrante</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Águas cristalinas</span>
              </div>
            </div>
          </div>

          {/* Mediterranean */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h3 className="font-baloo text-3xl font-bold text-secondary-900">Mediterrâneo</h3>
              <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
                O Mediterrâneo oferece uma jornada através da história e da cultura. Das ruínas antigas de Roma às praias glamorosas da Riviera Francesa, o Mediterrâneo é um mosaico de paisagens, sabores e tradições. Cada porto revela uma nova faceta da Europa.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">História milenar</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Gastronomia única</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Arquitetura clássica</span>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/assets/home/cruzeiros/barcelona.png"
                alt="Mediterrâneo - História e cultura milenar"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Brazil */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/assets/home/cruzeiros/brasil.jpg"
                alt="Brasil - Diversidade natural e cultural"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="font-baloo text-3xl font-bold text-secondary-900">Brasil</h3>
              <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
                Do Amazonas ao Rio de Janeiro, o Brasil oferece uma diversidade incomparável. Explore a maior floresta tropical do mundo, dance ao ritmo do samba nas praias cariocas, ou descubra as cachoeiras escondidas do interior. Cada região revela uma nova faceta deste país continental.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Biodiversidade única</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Cultura vibrante</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Paisagens diversas</span>
              </div>
            </div>
          </div>

          {/* South America */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h3 className="font-baloo text-3xl font-bold text-secondary-900">América do Sul</h3>
              <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
                Dos picos nevados dos Andes às selvas da Amazônia, a América do Sul é um continente de contrastes dramáticos. Explore as praias do Pacífico no Chile, Buenos Aires ou aproveite a estadia em Lima para conhecer toda a história em Cusco e Machu Picchu. Cada país oferece experiências únicas e inesquecíveis.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Paisagens dramáticas</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Culturas ancestrais</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Aventuras únicas</span>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/assets/home/cruzeiros/buenos-aires.jpg"
                alt="América do Sul - Paisagens dramáticas e culturas ancestrais"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Antarctica */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/assets/home/cruzeiros/antarctica.jpg"
                alt="Antártida - O continente gelado"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="font-baloo text-3xl font-bold text-secondary-900">Antártida</h3>
              <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
                O último continente selvagem da Terra oferece uma experiência verdadeiramente única. Testemunhe a majestade dos icebergs gigantes, observe pinguins em seu habitat natural, e sinta a imensidão de um mundo intocado pelo homem. Uma jornada para a Antártida é uma aventura que transforma a perspectiva sobre nosso planeta.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Natureza intocada</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Aventura extrema</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Paisagens únicas</span>
              </div>
            </div>
          </div>

          {/* Northern Europe */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h3 className="font-baloo text-3xl font-bold text-secondary-900">Norte da Europa</h3>
              <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
                Dos fiordes noruegueses às auroras boreais da Islândia, o norte da Europa oferece paisagens de tirar o fôlego. Explore cidades históricas como Estocolmo e Copenhague, ou navegue pelos canais de Amsterdã. Uma região onde tradição e modernidade se encontram em harmonia perfeita.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Fiordes dramáticos</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Auroras boreais</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Cidades históricas</span>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/assets/home/cruzeiros/northern-europe.jpg"
                alt="Norte da Europa - Fiordes e auroras boreais"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* South Pacific */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/assets/home/cruzeiros/south_pacific.jpg"
                alt="Pacífico Sul - Ilhas paradisíacas"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="font-baloo text-3xl font-bold text-secondary-900">Pacífico Sul</h3>
              <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
                O Pacífico Sul é o paraíso dos sonhadores. Com suas ilhas remotas, praias de areia rosa, e águas tão claras que parecem cristal, esta região oferece uma fuga completa da realidade. Desde o Tahiti até as Fiji, cada ilha tem sua própria personalidade e encanto único.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Ilhas remotas</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Águas cristalinas</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Cultura polinésia</span>
              </div>
            </div>
              </div>

          {/* Oceania */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h3 className="font-baloo text-3xl font-bold text-secondary-900">Oceania</h3>
              <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
                Da Grande Barreira de Coral australiana às praias da Nova Zelândia, a Oceania oferece experiências naturais incomparáveis. Explore a cultura aborígene, mergulhe nos recifes de coral mais impressionantes do mundo, ou descubra a geotermia da Nova Zelândia.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Recifes de coral</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Cultura aborígene</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Natureza selvagem</span>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/assets/home/cruzeiros/oceania.webp"
                alt="Oceania - Recifes de coral e natureza selvagem"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Red Sea */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/assets/home/cruzeiros/red-sea.webp"
                alt="Mar Vermelho - Mergulho e história"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="font-baloo text-3xl font-bold text-secondary-900">Mar Vermelho</h3>
              <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
                O Mar Vermelho é um tesouro escondido entre desertos e montanhas. Com suas águas cristalinas repletas de vida marinha colorida, é um paraíso para mergulhadores. Explore os recifes de coral, naufrágios históricos, e descubra a rica história marítima desta região única.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Mergulho excepcional</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Vida marinha rica</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">História marítima</span>
              </div>
            </div>
          </div>

          {/* Alaska */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="font-baloo text-3xl font-bold text-secondary-900">Alasca</h3>
              <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
                A última fronteira americana oferece uma experiência de natureza selvagem incomparável. Testemunhe ursos pardos pescando salmão, observe baleias jubarte, e navegue pelos fiordes gelados. O Alasca é uma aventura que conecta você com a natureza em sua forma mais pura e impressionante.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Natureza selvagem</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Vida selvagem</span>
                <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Fiordes gelados</span>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/assets/home/cruzeiros/alaska.jpg"
                alt="Alasca - Natureza selvagem e vida selvagem"
                fill
                className="object-cover"
              />
            </div>
          </div>
            {/* Asia */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div className="relative h-96 rounded-2xl overflow-hidden">
               <Image
                 src="/assets/home/cruzeiros/asia.jpg"
                 alt="Ásia - Culturas milenares e paisagens exóticas"
                 fill
                 className="object-cover"
               />
             </div>
             <div className="space-y-6">
               <h3 className="font-baloo text-3xl font-bold text-secondary-900">Ásia</h3>
               <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
                 Do Japão tradicional ao luxo de Dubai, a Ásia oferece uma fusão única de antigo e moderno. Explore templos milenares, experimente gastronomias exóticas, e descubra paisagens que vão desde as montanhas do Himalaia até as praias tropicais do Sudeste Asiático. Uma região onde tradição e inovação se encontram.
               </p>
               <div className="flex flex-wrap gap-2">
                 <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Culturas milenares</span>
                 <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Gastronomia exótica</span>
                 <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Paisagens contrastantes</span>
               </div>
             </div>
           </div>
        </div>
      </section>

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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
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
                src="/assets/home/cruzeiros/azamara-logo.png"
                alt="Azamara"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center h-20 w-full">
              <Image
                src="/assets/home/cruzeiros/crystal-logo.webp"
                alt="Crystal Cruises"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
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
                src="/assets/home/cruzeiros/ritz-carlton-logo.svg"
                alt="Ritz-Carlton Yacht Collection"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-secondary-600 font-comfortaa text-lg">
              <span className="font-semibold text-accent-500">e mais...</span>
            </p>
          </div>
        </div>
      </section>

      {/* Why Trip Evolved Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-16">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Por que escolher a <span className="text-accent-500">Trip Evolved</span> para sua jornada?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Curatorship */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-4">
                Curadoria Especializada
              </h3>
              <p className="text-secondary-600 font-comfortaa leading-relaxed">
                Selecionamos apenas os melhores navios, roteiros e experiências, e sabemos como você se sentirá nessa jornada.
              </p>
            </div>

            {/* Personalized Plans */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
                              <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-4">
                  Planos para cada porto
                </h3>
                <p className="text-secondary-600 font-comfortaa leading-relaxed">
                  Cada parada do seu cruzeiros é uma chance de conhecer a cultura local, a história e a natureza. E preparamos um plano para cada uma delas.{' '}
                  <Link 
                    href="/cruzeiros-extraordinarios/norte-da-europa/portos/bergen" 
                    className="text-accent-500 hover:text-accent-600 underline font-semibold transition-colors"
                  >
                    Veja um exemplo
                  </Link>
                </p>
            </div>

            {/* All Trip Taken Care */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-4">
               Jornadas únicas
              </h3>
              <p className="text-secondary-600 font-comfortaa leading-relaxed">
                Desde o primeiro contato até o retorno, cuidamos de todos os detalhes para garantir que você se sinta à vontade e confiante em sua jornada.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => setIsLeadModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Why Trip Evolved Section - Cruzeiros Extraordinários'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Começar minha jornada
            </Button>
          </div>
        </div>
      </section>

      {/* TODO: section with guides for each region as lead magnets */}

      {/* Final CTA Section */}
      <section className="py-24 bg-secondary-900 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
            Vamos embarcar em uma <span className="text-accent-500">jornada extraordinária?</span>
          </h2>
          <p className="text-white/90 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Agende uma reunião com nossos especialistas e descubra os melhores cruzeiros para sua próxima jornada.
          </p>
          <Button
            onClick={() => setIsLeadModalOpen(true)}
            event="pre_agendar"
            eventOptions={{
              source: 'Final CTA Section - Cruzeiros Extraordinários'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Começar minha jornada
          </Button>
        </div>
      </section>

      {/* Lead Flow Modal */}
      <LeadFlowModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        destinations={cruiseDestinations}
        source="Cruzeiros Extraordinários"
      />

      {/* Cruise Lead Modal */}
      <CruiseLeadModal
        isOpen={isCruiseModalOpen}
        onClose={() => setIsCruiseModalOpen(false)}
        searchData={searchData}
      />
    </div>
  )
} 