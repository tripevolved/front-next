"use client";
import { useState } from "react";
import Button from "@/components/common/Button";
import CruiseConsultancyProcess from "@/components/consultancy/CruiseConsultancyProcess";
import CruiseConsultancyModal from "@/components/consultancy/CruiseConsultancyModal";
import { MuxVideoPlayer } from "@/components/MuxVideoPlayer";
import Image from "next/image";

export default function GrupoCruzeirosPage() {
  const [isConsultancyModalOpen, setIsConsultancyModalOpen] = useState(false);

  const handleOpenConsultancyModal = () => {
    setIsConsultancyModalOpen(true);
  };

  const handleCloseConsultancyModal = () => {
    setIsConsultancyModalOpen(false);
  };
  return (
    <div>
      {/* Background Video with Overlay */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Video for smaller screens (mobile/tablet) */}
          <div className="block md:hidden absolute inset-0">
            <MuxVideoPlayer
              playbackId="V00bvDGWfGlEibHGx8olVEj9NHxPylaTVu02Lhinuh9DQ"
              autoplay={true}
              loop={true}
              isMuted={true}
              className="w-full h-full object-cover rounded-none mx-0"
            />
          </div>
          {/* Video for bigger screens (desktop) */}
          <div className="hidden md:block absolute inset-0">
            <MuxVideoPlayer
              playbackId="wGJb3Kl017IvIuwXsAaRJvSLhxkdivTWfyvr61usw01Jw"
              autoplay={true}
              loop={true}
              isMuted={true}
              className="w-full h-full object-cover rounded-none mx-0"
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="w-full px-4 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
                Grupo Exclusivo de Cruzeiros de Luxo
              </h1>
              <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
                Oportunidades, roteiros e dicas exclusivas dos melhores cruzeiros do mundo
              </p>
            </div>
            <div className="w-full text-center">
              <a
                href="https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-baloo font-semibold text-xl transition-colors min-w-64"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                <span>Entrar no grupo exclusivo</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col">
        {/* Content */}
        <section className="p-10 flex flex-col gap-7 bg-secondary-500 text-white">
          <div className="flex pl-3">
            <h1 className="font-baloo text-3xl font-bold md:text-4xl">
              Um espaço exclusivo para quem busca os melhores cruzeiros de luxo
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-4">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/assets/home/cruzeiros-extraordinarios.jpg"
                alt="Cruzeiros de luxo exclusivos"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="font-comfortaa text-xl leading-relaxed">
                No nosso grupo exclusivo no WhatsApp, você terá acesso a oportunidades únicas e roteiros selecionados dos melhores cruzeiros de luxo do mundo.
              </p>
              <p className="font-comfortaa text-xl leading-relaxed">
                Todos os dias, compartilhamos dicas exclusivas, ofertas especiais e informações sobre cruzeiros que combinam culinária de excelência, serviço impecável e destinos extraordinários. Um espaço criado pela <span className="text-primary-500 font-bold">Trip</span>{" "}
                <span className="text-accent-500 font-bold">Evolved</span> para conectar você às melhores experiências de bem-estar no mar.
              </p>
            </div>
          </div>
          {/* CTA Button */}
          <div className="text-center">
            <a
              href="https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-baloo font-semibold text-xl transition-colors min-w-64"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              <span>Entrar no grupo exclusivo</span>
            </a>
          </div>
        </section>

        {/* Cruise Destinations Gallery */}
        <section className="py-16 bg-secondary-50">
          <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-secondary-900 text-center">
              Experiências <span className="text-accent-500">inesquecíveis</span> te esperam
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Card 1 */}
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-[400px]">
                  <Image
                    src="/assets/consultoria/cruzeiros-unicos/destinos.jpg"
                    alt="Cruzeiro de luxo no Mediterrâneo"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white font-baloo text-2xl font-bold mb-2">
                      Destinos Paradisíacos
                    </h3>
                    <p className="text-white/90 font-comfortaa text-lg">
                      Explore portos exclusivos e destinos únicos ao redor do mundo em navios de luxo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-[400px]">
                  <Image
                    src="/assets/consultoria/cruzeiros-unicos/gastronomia.avif"
                    alt="Gastronomia de excelência em cruzeiros"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white font-baloo text-2xl font-bold mb-2">
                      Gastronomia Excepcional
                    </h3>
                    <p className="text-white/90 font-comfortaa text-lg">
                      Restaurantes premiados e chefs renomados a bordo dos melhores cruzeiros de luxo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-[400px]">
                  <Image
                    src="/assets/consultoria/cruzeiros-unicos/ocean-terrace.jpg"
                    alt="Serviço impecável e bem-estar"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white font-baloo text-2xl font-bold mb-2">
                      Bem-estar e Relaxamento
                    </h3>
                    <p className="text-white/90 font-comfortaa text-lg">
                      Spas de classe mundial, suítes espaçosas e serviço personalizado de excelência.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <a
                href="https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-baloo font-semibold text-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                <span>Entrar no grupo exclusivo</span>
              </a>
            </div>
          </div>
        </section>

        {/* Consultancy Process - Simplified */}
        <section className="bg-primary-700 text-white py-12">
          <div className="container mx-auto px-4">
            {/* Section Title */}
            <div className="text-center mb-8">
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-3">
                Decidindo sua próxima viagem?
              </h2>
              <p className="font-comfortaa text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Um processo simples e personalizado para criar a viagem dos seus sonhos
              </p>
            </div>

            {/* Process Steps */}
            <div className="mb-8 max-w-4xl mx-auto">
              <CruiseConsultancyProcess />
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button
                onClick={handleOpenConsultancyModal}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Falar com um especialista
              </Button>
            </div>
          </div>
        </section>
      </div>
      <CruiseConsultancyModal isOpen={isConsultancyModalOpen} onClose={handleCloseConsultancyModal} />
    </div>
  );
}

