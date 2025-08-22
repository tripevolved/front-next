"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import { ShareModal } from "@/components/ShareModal";

interface ExperienceExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  experienceTitle: string;
}

export function ExperienceExitModal({ isOpen, onClose, experienceTitle }: ExperienceExitModalProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleStartJourney = () => {
    const message = `Olá! Gostaria de planejar uma viagem customizada similar à experiência ${experienceTitle}.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    onClose();
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl max-w-md w-full p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-2">
              Quer sua viagem customizada em 7 dias ou menos?
            </h2>
            <p className="text-secondary-600">
              Nossos especialistas cuidam de tudo para você
            </p>
          </div>

          {/* Process Preview */}
          <div className="bg-accent-50 rounded-xl p-6 mb-6">
            <h3 className="font-baloo font-semibold text-accent-700 mb-4 text-left">
              Próximo passo: Reunião de 45 minutos
            </h3>
            <div className="space-y-3 text-sm text-accent-600 text-left">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  1
                </div>
                <span>Conversa online para entender seus desejos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  2
                </div>
                <span>Itinerário personalizado em até 48 horas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  3
                </div>
                <span>Reservas, roteiro e detalhes gerenciados por nós</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-4">
            <Button
              onClick={handleStartJourney}
              className="w-full bg-accent-500 text-white px-8 py-4 rounded-full text-lg font-baloo font-semibold hover:bg-accent-600 transition-all flex items-center justify-center gap-3"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Começar minha jornada
            </Button>
          </div>

          {/* Share Button */}
          <div className="flex justify-center">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-secondary-600 hover:text-accent-500 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Compartilhar experiência
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600 transition-colors"
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
