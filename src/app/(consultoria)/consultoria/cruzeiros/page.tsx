"use client";
import Button from "@/components/common/Button";
import CruiseSections from "@/components/cruises/CruiseSections";
import CruiseDetailsModal from "@/components/cruises/CruiseDetailsModal";
import { DetailsCard } from "@/components/cruises/DetailsCard";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import CruiseConsultancyProcess from "@/components/consultancy/CruiseConsultancyProcess";
import CruiseConsultancyModal from "@/components/consultancy/CruiseConsultancyModal";
import { MuxVideoPlayer } from "@/components/MuxVideoPlayer";
import Image from "next/image";
import { useState } from "react";

export default function CompraConsultoria() {
  const [isCruiseDetailsModalOpen, setIsCruiseDetailsModalOpen] = useState<boolean>(false);
  const [isConsultancyModalOpen, setIsConsultancyModalOpen] = useState<boolean>(false);

  const handleExitModal = () => {
    setIsCruiseDetailsModalOpen(false);
  };

  const handleOpen = () => {
    setIsCruiseDetailsModalOpen(true);
  };

  const handleOpenConsultancyModal = () => {
    setIsConsultancyModalOpen(true);
  };

  const handleCloseConsultancyModal = () => {
    setIsConsultancyModalOpen(false);
  };

  const scrollToCruiseInfo = () => {
    const element = document.getElementById('cruise-info');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
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
                O seu cruzeiro começa pelo que você quer viver
              </h1>
              <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
                Cruzeiros de luxo, com a consultoria que muda a sua forma de viajar
              </p>
            </div>
            <div className="w-full text-center">
              <Button 
                onClick={scrollToCruiseInfo}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Quero saber mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-6">
        {/* Content */}
        <section id="cruise-info" className="p-10 flex flex-col gap-7 bg-secondary-500 text-white">
          <div className="flex pl-3">
            <h1 className="font-baloo text-3xl font-bold md:text-4xl">
              Os melhores cruzeiros de luxo para casais
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-4">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/assets/home/cruzeiros-extraordinarios.jpg"
                alt="Mediterrâneo - História e cultura milenar"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="font-comfortaa text-xl leading-relaxed">
                Navios gigantes e lotados? Horário para jantar? A sua viagem não é sobre isso.
              </p>
              <p className="font-comfortaa text-xl leading-relaxed">
                Na <span className="text-primary-500 font-bold">Trip</span>{" "}
                <span className="text-accent-500 font-bold">Evolved</span>, realizamos uma curadoria
                dos melhores cruzeiros de luxo do mundo. O foco é em serviço, exclusividade, gastronomia e imersão cultural. Usamos nossa experiência para te guiar na escolha da melhor viagem.
              </p>
            </div>
          </div>
          {/* CTA Button */}
          <div className="text-center">
            <Button
              onClick={handleOpenConsultancyModal}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl"
            >
              Falar com um especialista
            </Button>
          </div>
        </section>

        {/* Cruise Sections with Toggle */}
        <CruiseSections handleClick={handleOpen} />

        {/* Consultancy Process */}
        <section className="bg-secondary-500 text-white py-16">
          <div className="container mx-auto px-4">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="font-baloo text-4xl md:text-5xl font-bold mb-4">
                Como funciona nossa consultoria
              </h2>
              <p className="font-comfortaa text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Um processo simples e personalizado para criar a viagem dos seus sonhos
              </p>
          </div>

            {/* Process Steps */}
            <div className="mb-12">
              <CruiseConsultancyProcess />
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button
                onClick={handleOpenConsultancyModal}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl"
              >
                Falar com um especialista
              </Button>
            </div>
          </div>
        </section>

        {/* Por que a Trip Evolved? */}
        <section className="flex flex-col gap-5 bg-secondary-200 p-10">
          <div className="text-center mb-8">
            <h2 className="font-baloo text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Por que a Trip Evolved?
            </h2>
            <p className="font-comfortaa text-xl text-gray-600 max-w-3xl mx-auto">
              Criada por Henrique Gasparotto e Deborah Eppi, a Trip Evolved nasceu porque acreditamos que viagens são experiências únicas e merecem ser vividas como tal.
            </p>
          </div>
          <div className="flex flex-col gap-9 justify-center items-center px-6">
            <div className="flex md:grid md:grid-cols-2 md:grid-rows-2 flex-col items-center gap-10 md:max-w-5xl">
              <DetailsCard
                message={
                  <p>
                    Curadoria dos melhores{" "}
                    <span className="font-bold text-accent-500">cruzeiros</span> do mundo
                  </p>
                }
                icon={
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <DetailsCard 
                message="Conveniência para você: nós cuidamos de todos os detalhes"
                icon={
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <DetailsCard 
                message="Personalizamos toda a sua viagem, não só o cruzeiro"
                icon={
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                }
              />
              <DetailsCard
                message={
                  <p>
                    Assistência de <span className="font-bold text-accent-500">especialistas</span> em todos os momentos
                  </p>
                }
                icon={
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
              />
            </div>
            {/* CTA Button */}
            <div className="text-center">
              <Button
                onClick={handleOpenConsultancyModal}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl"
              >
                Falar com um especialista
              </Button>
            </div>
          </div>
        </section>

        {/* O que dizem nossos clientes? */}
        <section className="flex flex-col p-8">
          <div className="text-center mb-8">
            <h2 className="font-baloo text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              O que dizem nossos clientes?
            </h2>
          </div>
          <div className="p-3 flex items-center justify-center w-full">
            <div className="md:max-w-4xl w-full">
              <ReviewsCarousel />
            </div>
          </div>
        </section>

        {/* Oportunidades Exclusivas */}
        <section className="flex flex-col justify-center gap-3 from-primary-600 to-primary-700 bg-gradient-to-br p-10">
          <div className="text-center mb-8">
            <h2 className="font-baloo text-4xl md:text-5xl font-bold text-white mb-4">
              Oportunidades e roteiros exclusivos
            </h2>
          </div>
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg px-3 text-white">
              Todos os dias, compartilhamos roteiros, dicas e oportunidades exclusivas dos melhores
              cruzeiros do mundo. Entre em nosso grupo exclusivo no WhatsApp.
            </p>
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
      </div>
      <CruiseDetailsModal isOpen={isCruiseDetailsModalOpen} handleClose={handleExitModal} />
      <CruiseConsultancyModal isOpen={isConsultancyModalOpen} onClose={handleCloseConsultancyModal} />
    </div>
  );
}
