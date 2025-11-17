"use client";
import { useState } from "react";
import Button from "@/components/common/Button";
import CruiseConsultancyProcess from "@/components/consultancy/CruiseConsultancyProcess";
import CruiseConsultancyModal from "@/components/consultancy/CruiseConsultancyModal";
import WhatsAppGroupButton from "@/components/cruises/WhatsAppGroupButton";
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
              <WhatsAppGroupButton href="https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI" />
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
            <WhatsAppGroupButton href="https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI" />
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
            <WhatsAppGroupButton
              href="https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI"
            />
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

