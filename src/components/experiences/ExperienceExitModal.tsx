"use client";

import { WhatsAppGroupButton } from "@/components/cruises/WhatsAppGroupButton";

interface ExperienceExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCruise?: boolean;
}

export function ExperienceExitModal({ isOpen, onClose, isCruise = true }: ExperienceExitModalProps) {
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
          className="bg-white rounded-2xl max-w-md w-full p-8 text-center relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-2">
              Ainda não está pronto para planejar sua viagem?
            </h2>
            {isCruise && (
              <p className="text-lg text-secondary-600">
                Entre em nosso grupo, com a curadoria dos melhores cruzeiros do mundo.
              </p>
            )}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <WhatsAppGroupButton
              href={isCruise ? "https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI" : "https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI"}
              label={isCruise ? "Entrar no grupo de cruzeiros" : "Entrar no grupo de experiências"}
              onClick={onClose}
            />
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
    </>
  );
}
