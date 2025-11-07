"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import { ShareModal } from "@/components/ShareModal";
import { PhotoCarousel } from "../PhotoCarousel";
import { Photo } from "@/core/types";
import { MuxVideoPlayer } from "../MuxVideoPlayer";

interface ExperienceExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  experienceTitle: string;
}

export function CruiseJourneyBookingModal({
  isOpen,
  onClose,
  experienceTitle,
}: ExperienceExitModalProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleStartJourney = () => {
    const message = `Olá! Gostaria de planejar uma viagem customizada similar à experiência ${experienceTitle}.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    onClose();
  };

  const photos: Photo[] = [
    {
      title: "aaaa",
      sources: [
        {
          height: 100,
          width: 100,
          url: "https://cdn.expertphotography.com/wp-content/uploads/2020/10/Fine-Art-Photography-Examples-Sunlight-Planets-by-Troyes-Christina.jpg",
          type: "lg",
        },
      ],
      alt: "Foto casal jantar",
    },
    {
      title: "aaaa",
      sources: [
        {
          height: 100,
          width: 100,
          url: "https://cdn.expertphotography.com/wp-content/uploads/2020/10/Fine-Art-Photography-Examples-Sunlight-Planets-by-Troyes-Christina.jpg",
          type: "lg",
        },
      ],
      alt: "Foto casal jantar",
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <div
          className="bg-white w-full p-6 text-center border h-full md:max-w-6xl max-w-md overflow-y-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-6 h-[350px]">
            <PhotoCarousel title="Fotos da sua jornada" photos={photos} />
          </div>

          {/* Process Preview */}
          <div className="bg-primary-50 rounded-xl p-6 mb-6">
            <h1 className="font-baloo font-semibold text-xl mb-4 text-left md:text-2xl">O processo</h1>
            <div className="space-y-3  text-sm md:text-base text-primary-600 text-left">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  1
                </div>
                <span>
                  Em uma reunião de até 45 minutos, entendemos você e seus desejos para a viagem
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  2
                </div>
                <span>Você realiza o pagamento da taxa de consultoria</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  3
                </div>
                <span>Construímos uma proposta 100% personalizada para você</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  4
                </div>
                <span>
                  Ajustamos sua proposta a partir do que você deseja, quantas vezes forem
                  necessárias
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  5
                </div>
                <span>Você realiza o pagamento da viagem e cuidamos de todas as reservas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  6
                </div>
                <span>Cuidamos de tudo no seu pré-viagem</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  7
                </div>
                <span>Aproveite!</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-3 mb-6">
            <div className="flex text-center gap-6 items-center justify-around font-medium font-baloo">
              <div className="w-40 h-36  rounded-2xl flex justify-center items-center p-3  bg-primary-300/30">
                <span className="text-xl font-bold text-primary-700 font-comfortaa">
                  Pensado para você
                </span>
              </div>
              <div className="w-40 h-36  rounded-2xl flex justify-center items-center p-3 bg-accent-300/30">
                <span className="text-xl font-bold font-comfortaa text-accent-500">
                  Conveniente
                </span>
              </div>
              <div className="w-40 h-36  rounded-2xl flex justify-center items-center p-3 bg-primary-300/30">
                <span className="text-xl font-bold text-primary-700 font-comfortaa p-3">
                  Feito por especialistas
                </span>
              </div>
            </div>
          </div>
          <div className="container mb-6">
            <div className="flex flex-col items-center gap-4">
              <h1 className="font-baloo text-3xl text-primary-500 font-bold">
                Entenda como funciona, nas palavras do <span className="text-accent-500">Henrique</span>, nosso sócio
              </h1>
              <div>
                <MuxVideoPlayer
                  playbackId="36MPnXNByTEUZpeN00DMChaLhhXUYPgLkniNy6k2kCmw"
                  isMuted={false}
                  loop={false}
                  placeholderImage="/assets/consultoria/caribe/vsl_poster.jpg"
                />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-4">
            <h3 className="font-bold text-2xl italic font-baloo">
              1200 <span className="text-primary-500">(taxa de consultoria)</span> + Custo da viagem
              conforme seu <span className="text-accent-500">orçamento</span>
            </h3>
          </div>
          <div className="mb-4">
            <Button
              onClick={handleStartJourney}
              className="w-full bg-primary-500 text-white px-6 md:px-8 py-4 rounded-full text-lg font-baloo font-semibold hover:bg-accent-600 transition-all flex items-center justify-center gap-3"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Conversar com um especialista
            </Button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        link={typeof window !== "undefined" ? window.location.href : ""}
        message={`Confira esta experiência incrível: ${experienceTitle}`}
      />
    </>
  );
}
