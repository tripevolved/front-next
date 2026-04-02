"use client";

import Image from "next/image";
import Button from "@/components/common/Button";
import CruiseSections from "@/components/cruises/CruiseSections";
import CruiseDetailsModal from "@/components/cruises/CruiseDetailsModal";
import WhyTripEvolvedCards from "@/components/cruises/WhyTripEvolvedCards";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import CruiseConsultancyProcess from "@/components/consultancy/CruiseConsultancyProcess";
import WhatsAppGroupButton from "@/components/cruises/WhatsAppGroupButton";
import { MuxVideoPlayer } from "@/components/MuxVideoPlayer";
import TripDiscoveryWizard from "@/components/trip-planning/TripDiscoveryWizard";
import { useState } from "react";

export default function MediterraneoConsultoriaPage() {
  const [isCruiseDetailsModalOpen, setIsCruiseDetailsModalOpen] = useState<boolean>(false);
  const [selectedCruiseUniqueName, setSelectedCruiseUniqueName] = useState<string | undefined>();
  const [isDiscoveryWizardOpen, setIsDiscoveryWizardOpen] = useState(false);

  const handleExitModal = () => {
    setIsCruiseDetailsModalOpen(false);
    setSelectedCruiseUniqueName(undefined);
  };

  const handleOpen = (uniqueName: string) => {
    setSelectedCruiseUniqueName(uniqueName);
    setIsCruiseDetailsModalOpen(true);
  };

  const scrollToChallenges = () => {
    const element = document.getElementById("cruise-challenges");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const openTripDiscoveryWizard = () => setIsDiscoveryWizardOpen(true);

  const partnerLogos: { src: string; alt: string; width: number; height: number }[] = [
    {
      src: "https://res.cloudinary.com/tripevolved/image/upload/v1774956421/Monochrome_Black_rgb_sh5i3n.png",
      alt: "Silversea",
      width: 160,
      height: 48,
    },
    {
      src: "https://res.cloudinary.com/tripevolved/image/upload/v1769170692/Explora_Journeys_Horizontal_logo_blue_289c_djote5.png",
      alt: "Explora Journeys",
      width: 180,
      height: 48,
    },
    {
      src: "/assets/home/cruzeiros/ritz-carlton-logo.svg",
      alt: "The Ritz-Carlton Yacht Collection",
      width: 140,
      height: 48,
    },
    {
      src: "/assets/home/cruzeiros/azamara-logo.png",
      alt: "Azamara",
      width: 140,
      height: 48,
    },
    {
      src: "/assets/home/cruzeiros/logo-princess.png",
      alt: "Princess Cruises",
      width: 140,
      height: 48,
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="block md:hidden absolute inset-0">
            <MuxVideoPlayer
              playbackId="V00bvDGWfGlEibHGx8olVEj9NHxPylaTVu02Lhinuh9DQ"
              autoplay={true}
              loop={true}
              isMuted={true}
              className="w-full h-full object-cover rounded-none mx-0"
            />
          </div>
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

        <div className="w-full px-4 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
                Jornadas pelo Mediterrâneo, com cultura e história
              </h1>
              <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
                Uma curadoria de viagens pelo mar para casais que querem viver cidades históricas, gastronomia e
                experiências autênticas — sem perder tempo com escolhas erradas.
              </p>
            </div>
            <div className="w-full text-center">
              <Button
                onClick={scrollToChallenges}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Quero saber mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col">
        {/* 2nd: Problems */}
        <section id="cruise-challenges" className="py-16 md:py-24 bg-white">
          <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-center text-secondary-900 mb-4 max-w-3xl mx-auto">
              Planejar uma viagem não é sobre opções: é sobre
              <span className="text-accent-500"> tranquilidade e confiança</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-8 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-accent-500/15 flex items-center justify-center mb-4">
                  <span className="font-baloo text-xl font-bold text-accent-600">1</span>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-3">Um mar de opções na internet</h3>
                <p className="font-comfortaa text-secondary-600 leading-relaxed">
                  Sites, comparadores e promoções infinitas: é fácil se perder entre navios, categorias de cabine e
                  roteiros que parecem todos iguais — até você descobrir que não são.
                </p>
              </div>
              <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-8 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-accent-500/15 flex items-center justify-center mb-4">
                  <span className="font-baloo text-xl font-bold text-accent-600">2</span>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-3">Medo de tomar a decisão errada</h3>
                <p className="font-comfortaa text-secondary-600 leading-relaxed">
                  Investir tempo e dinheiro em uma viagem que deveria ser especial e ainda assim ter a sensação de que
                  poderia ter sido melhor — ou que faltou algo essencial — é o que mais ouvimos de quem vem até nós.
                </p>
              </div>
              <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-8 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-accent-500/15 flex items-center justify-center mb-4">
                  <span className="font-baloo text-xl font-bold text-accent-600">3</span>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-3">
                  Pouca transparência sobre o que você está comprando
                </h3>
                <p className="font-comfortaa text-secondary-600 leading-relaxed">
                  Taxas, restrições, o que está incluso (ou não) e a experiência real a bordo costumam ficar escondidas
                  atrás de um preço chamativo — e só aparecem quando já é tarde demais.
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Button
                onClick={openTripDiscoveryWizard}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Planejar minha viagem
              </Button>
            </div>
          </div>
        </section>

        {/* 3rd: CruiseSections (curated for the Mediterranean) */}
        <CruiseSections
          handleClick={handleOpen}
          className="bg-secondary-50"
          title="Uma coleção selectionada de jornadas no Mediterrâneo"
          description="Escolhas feitas para quem quer cultura, história, gastronomia impecável e cidades que merecem ser vividas com tempo — e não apenas visitadas."
        />

        {/* Companies section (as is) */}
        <section id="cruise-partners" className="py-16 md:py-24 bg-white border-y border-secondary-100">
          <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
            <h2 className="font-baloo text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-900 text-center max-w-4xl mx-auto leading-snug mb-12">
              Trabalhamos com algumas das experiências mais refinadas do mundo — mas o diferencial está em{" "}
              <span className="text-accent-500">como escolhemos cada uma delas para você</span>.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 items-center justify-items-center mb-12">
              {partnerLogos.map((logo) => (
                <div key={logo.src} className="flex items-center justify-center h-16 md:h-20 w-full max-w-[200px] px-2">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="max-h-12 md:max-h-14 w-auto max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button
                onClick={openTripDiscoveryWizard}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Planejar minha viagem
              </Button>
            </div>
          </div>
        </section>

        {/* Experience, not volume (next) */}
        <section id="cruise-info" className="py-16 md:py-24 bg-secondary-50">
          <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-4 text-secondary-900 text-center max-w-4xl mx-auto leading-snug">
              Nós selecionamos cruzeiros que priorizam <span className="text-accent-500">experiência</span> — não volume.
            </h2>
            <p className="font-comfortaa text-lg text-secondary-600 text-center max-w-2xl mx-auto mb-12">
              Em vez de empilhar opções, filtramos por aquilo que realmente importa para uma jornada cultural e histórica no Mediterrâneo:
              os melhores destinos, com o tempo certo em cada um.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-[400px]">
                  <Image
                    src="/assets/consultoria/cruzeiros-unicos/destinos.jpg"
                    alt="Curadoria de destinos e roteiros"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white font-baloo text-2xl font-bold mb-2">Curadoria, não volume</h3>
                    <p className="text-white/90 font-comfortaa text-lg">
                      Você recebe uma seleção de até 3 opções de jornadas, pensadas para o seu perfil.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-[400px]">
                  <Image
                    src="/assets/consultoria/cruzeiros-unicos/ocean-terrace.jpg"
                    alt="Transparência na escolha do cruzeiro"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white font-baloo text-2xl font-bold mb-2">Transparência em cada etapa</h3>
                    <p className="text-white/90 font-comfortaa text-lg">
                      Você sabe o que paga e porquê. E não recebemos comissões de terceiros, garantindo que trabalhamos apenas para você.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-[400px]">
                  <Image
                    src="/assets/consultoria/cruzeiros-unicos/gastronomia.avif"
                    alt="Experiência e gastronomia a bordo"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white font-baloo text-2xl font-bold mb-2">Experiência em primeiro lugar</h3>
                    <p className="text-white/90 font-comfortaa text-lg">
                      Do serviço ao que você vivencia em cada porto, priorizamos o que transforma a viagem na história que vocês vão contar depois.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button
                onClick={openTripDiscoveryWizard}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Planejar minha viagem
              </Button>
            </div>
          </div>
        </section>

        {/* Consultancy Process */}
        <section className="bg-secondary-500 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-baloo text-4xl md:text-5xl font-bold mb-4">Como funciona nossa consultoria</h2>
              <p className="font-comfortaa text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Um processo simples e personalizado para criar a viagem dos seus sonhos
              </p>
            </div>

            <div className="mb-12">
              <CruiseConsultancyProcess />
            </div>

            <div className="text-center">
              <Button
                onClick={openTripDiscoveryWizard}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl"
              >
                Planejar minha viagem
              </Button>
            </div>
          </div>
        </section>

        {/* Why / pillars */}
        <section className="flex flex-col gap-5 bg-secondary-200 p-10">
          <div className="text-center mb-8">
            <h2 className="font-baloo text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Os 3 pilares da Trip Evolved
            </h2>
            <p className="font-comfortaa text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa forma de trabalhar é guiada por princípios que colocamos em prática em cada viagem
            </p>
          </div>
          <div className="flex flex-col gap-9 justify-center items-center px-6 w-full max-w-6xl mx-auto">
            <WhyTripEvolvedCards />
            <div className="text-center">
              <Button
                onClick={openTripDiscoveryWizard}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl"
              >
                Planejar minha viagem
              </Button>
            </div>
          </div>
        </section>

        {/* Reviews */}
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

        {/* End as is (group) */}
        <section
          id="cruise-whatsapp-fallback"
          className="flex flex-col justify-center items-center gap-6 bg-primary-500 py-12 px-6"
        >
          <p className="font-comfortaa text-base md:text-lg text-white/95 text-center max-w-xl">
            Não é o momento ideal para planejar agora? Entre em nosso grupo exclusivo no WhatsApp — com a melhor
            curadoria de cruzeiros de luxo.
          </p>
          <WhatsAppGroupButton href="https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI" size="default" />
        </section>
      </div>

      <CruiseDetailsModal
        isOpen={isCruiseDetailsModalOpen}
        handleClose={handleExitModal}
        uniqueName={selectedCruiseUniqueName}
      />
      <TripDiscoveryWizard isOpen={isDiscoveryWizardOpen} onClose={() => setIsDiscoveryWizardOpen(false)} />
    </div>
  );
}

