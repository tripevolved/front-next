"use client";

import Image from "next/image";
import { WhatsAppDirectButton } from "../WhatsAppDirectButton";
import { useWizard } from "@/contexts/WizardContext";
import { mapperFormattedProfileName } from "./mapper-formatted-profile-names";
import { ProfileEnum } from "@/profile.enum";
import { ShareModal } from "../ShareModal";
import { useMemo, useState } from "react";

interface ProfileTypeProps {
  name: ProfileEnum;
}

export function ProfileType({ name }: ProfileTypeProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { openWizard } = useWizard();
  const formattedName = useMemo(() => mapperFormattedProfileName.get(name), [name]);

  const message = "Olá! Tenho interesse em conhecer a Trip Evolved. Podem me ajudar?";

  const handleShare = () => {
    setIsShareModalOpen(true);
  }

  return (
    <section className="relative w-full mx-auto lg:h-screen text-white flex flex-col items-center justify-end">
      <div className="flex flex-col items-center gap-2 lg:gap-[50px] pt-8">
        <span className="text-xl lg:text-3xl">O seu perfil de viajante é...</span>
        <div className="relative w-[300px] h-[250px] lg:w-[600px] lg:h-[350px] flex items-end">
          <Image
            src={`/assets/perfil/${name}.svg`}
            alt={`Imagem do perfil ${name}`}
            fill
            priority
          />
        </div>
      </div>
      <div className="bg-white rounded-t-[50px] flex flex-col items-center gap-6 lg:py-16 py-10 w-80 lg:w-[75%] lg:h-[430px]">
        <h1 className="text-primary-500 font-bold text-2xl lg:text-3xl">{formattedName ?? name}</h1>
        <div className="flex flex-col gap-4 text-sm lg:text-base text-gray-500 text-left px-5 lg:px-10 font-baloo">
          <span>Você não perde nenhuma atração turística do destino que está visitando.</span>
          <span>
            Para você, a viagem é uma oportunidade única de visitar todos os monumentos históricos e
            pontos turísticos famosos e não importa quantas horas você precise caminhar ou filas que
            precise enfrentar.
          </span>
          <span>
            Seu objetivo é explorar cada canto da cidade e aproveitar ao máximo cada segundo da
            estadia.
          </span>
        </div>
        <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
          <WhatsAppDirectButton message={message} variant="primary" className="w-[250px] px-4 py-3">
            Falar com especialista
          </WhatsAppDirectButton>
          <button
            className="font-baloo bg-primary-500 text-white px-10 py-3 rounded-full hover:bg-primary-600 transition-colors lg:min-w-[230px] w-[250px]"
            onClick={openWizard}
          >
            Descobrir minha viagem
          </button>
        </div>
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-2.5 min-h-12 mb-2 me-2 rounded-3xl border border-primary-700 text-primary-700 font-bold text-sm focus:outline-none focus:ring-4 focus:ring-green-300 hover:bg-primary-500/15 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          Compartilhar
        </button>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        link={typeof window !== "undefined" ? window.location.href : ""}
        message={`Conheça o meu perfil de viajante ${formattedName ?? name} na Trip Evolved!`}
      />
    </section>
  );
}
