"use client";
import Button from "@/components/common/Button";
import CruiseSections from "@/components/cruises/CruiseSections";
import CruiseDetailsModal from "@/components/cruises/CruiseDetailsModal";
import { DetailsCard } from "@/components/cruises/DetailsCard";
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
            <div className="flex flex-col gap-9 justify-center items-center">
              <div className="flex md:grid md:grid-cols-3 flex-col items-center gap-10 md:max-w-5xl">
                <DetailsCard
                  message={
                    <>
                      Economia de <span className="font-bold text-accent-500">tempo</span>: você recebe 3 opções de cruzeiros em 24 horas
                    </>
                  }
                  icon={
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
                <DetailsCard
                  message={
                    <>
                      <span className="font-bold text-accent-500">Transparência</span> total: não trabalhamos com comissões, colocando milhares de reais de volta no seu bolso
                    </>
                  }
                  icon={
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  }
                />
                <DetailsCard
                  message={
                    <>
                      Ajuda de <span className="font-bold text-accent-500">especialistas</span>: planejamento com confiança e sem erros
                    </>
                  }
                  icon={
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  }
                />
              </div>
              {/* Bonuses Section */}
              <div className="w-full flex flex-col items-center gap-6 mt-8">
                <h2 className="font-baloo text-2xl md:text-3xl font-bold text-white">
                  E você também recebe:
                </h2>
                <div className="flex md:grid md:grid-cols-2 flex-col items-center gap-10 md:max-w-4xl">
                  <DetailsCard
                    message={
                      <>
                        Design completo da viagem: <span className="font-bold text-accent-500">pré e pós-cruzeiro</span>, voos e todos os detalhes incluídos
                      </>
                    }
                    icon={
                      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    }
                  />
                  <DetailsCard
                    message={
                      <>
                        Concierge para excursões em terra: <span className="font-bold text-accent-500">guia de portos exclusivo</span>, feito especialmente para você
                      </>
                    }
                    icon={
                      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                  />
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
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 flex-col items-center gap-10 md:max-w-6xl">
              <DetailsCard
                message={
                  <>
                    <span className="font-bold text-accent-500">Curadoria</span> dos melhores cruzeiros do mundo
                  </>
                }
                icon={
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <DetailsCard
                message={
                  <>
                    <span className="font-bold text-accent-500">Concierge</span> para escolher passeios em terra com você, com todo o suporte
                  </>
                }
                icon={
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
              />
              <DetailsCard
                message={
                  <>
                    <span className="font-bold text-accent-500">Especialistas</span> com estudo aprofundado de cada cruzeiro oferecido
                  </>
                }
                icon={
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
              />
              <DetailsCard
                message={
                  <>
                    Design completo da <span className="font-bold text-accent-500">viagem</span>: pré e pós-cruzeiro, voos e todos os detalhes
                  </>
                }
                icon={
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                }
              />
              <DetailsCard
                message={
                  <>
                    Cruzeiros <span className="font-bold text-accent-500">escolhidos a dedo</span>: sem filas, com exclusividade e cuidado
                  </>
                }
                icon={
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                }
              />
              <DetailsCard
                message={
                  <>
                    Guias de destino <span className="font-bold text-accent-500">aprofundados</span> para cada porto
                  </>
                }
                icon={
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
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
