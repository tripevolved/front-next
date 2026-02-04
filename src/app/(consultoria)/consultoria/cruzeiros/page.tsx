"use client";
import Button from "@/components/common/Button";
import CruiseSections from "@/components/cruises/CruiseSections";
import CruiseDetailsModal from "@/components/cruises/CruiseDetailsModal";
import { DetailsCard } from "@/components/cruises/DetailsCard";
import JornadaGuidingCards from "@/components/cruises/JornadaGuidingCards";
import WhyTripEvolvedCards from "@/components/cruises/WhyTripEvolvedCards";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import CruiseConsultancyProcess from "@/components/consultancy/CruiseConsultancyProcess";
import LeadForm from "@/components/LeadForm";
import WhatsAppGroupButton from "@/components/cruises/WhatsAppGroupButton";
import { MuxVideoPlayer } from "@/components/MuxVideoPlayer";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompraConsultoria() {
  const router = useRouter();
  const [isCruiseDetailsModalOpen, setIsCruiseDetailsModalOpen] = useState<boolean>(false);
  const [selectedCruiseUniqueName, setSelectedCruiseUniqueName] = useState<string | undefined>();

  const handleExitModal = () => {
    setIsCruiseDetailsModalOpen(false);
    setSelectedCruiseUniqueName(undefined);
  };

  const handleOpen = (uniqueName: string) => {
    setSelectedCruiseUniqueName(uniqueName);
    setIsCruiseDetailsModalOpen(true);
  };

  const handleOpenConsultancyModal = () => {
    const element = document.getElementById('consultancy-form');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
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
                Sua jornada com a consultoria que muda a sua forma de viajar
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

      <div className="flex flex-col">
        {/* Content */}
        <section id="cruise-info" className="p-10 flex flex-col gap-7 bg-secondary-500 text-white">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-baloo text-3xl font-bold md:text-4xl mb-4">
                A Jornada Evolved nasceu para te guiar, com toda a expertise e transparência que você precisa.
              </h1>
            </div>
            <div className="flex flex-col gap-9 justify-center items-center text-white">
              <JornadaGuidingCards />
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
              A Trip Evolved nasceu porque acreditamos que viagens são experiências únicas e merecem ser vividas como tal.
            </p>
          </div>
          <div className="flex flex-col gap-9 justify-center items-center px-6">
            <WhyTripEvolvedCards />
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

        {/* Vamos conversar sobre sua Jornada? */}
        <section id="consultancy-form" className="flex flex-col justify-center gap-3 bg-primary-500 p-10">
          <div className="max-w-2xl mx-auto w-full">
            <div className="text-center mb-6">
              <h2 className="font-baloo text-3xl md:text-4xl font-bold text-white mb-4">
                Vamos encontrar seu cruzeiro ideal?
              </h2>
              <p className="font-comfortaa text-lg text-white/90">
                Nossos especialistas vão entrar em contato para entender suas preferências e encontrar o cruzeiro ideal para você
              </p>
            </div>

            <LeadForm
              submitButtonText="Enviar e aguardar contato"
              additionalMetadata={[
                {
                  key: 'source',
                  value: 'Consultoria Cruzeiros',
                  keyDescription: 'Fonte'
                },
                {
                  key: 'consultancy_type',
                  value: 'Cruise Consultancy',
                  keyDescription: 'Tipo de Consultoria'
                }
              ]}
              event="agendar"
              eventOptions={{
                source: 'Consultoria Cruzeiros',
                consultancy_type: 'Cruise Consultancy'
              }}
              onSuccess={() => {
                router.push('/obrigado')
              }}
            />

            {/* WhatsApp Group Invitation */}
            <div className="mt-6 pt-6 border-t border-white/20 text-center">
              <p className="font-comfortaa text-sm text-white/90 mb-3">
                Não é o momento ideal para uma conversa? Entre em nosso grupo exclusivo, com a melhor curadoria de cruzeiros de luxo.
              </p>
              <WhatsAppGroupButton
                href="https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI"
                size="compact"
              />
            </div>
          </div>
        </section>
      </div>
      <CruiseDetailsModal
        isOpen={isCruiseDetailsModalOpen}
        handleClose={handleExitModal}
        uniqueName={selectedCruiseUniqueName}
      />
    </div>
  );
}
