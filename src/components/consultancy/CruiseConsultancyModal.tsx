"use client";

import React from "react";
import LeadForm from "../LeadForm";
import WhatsAppGroupButton from "../cruises/WhatsAppGroupButton";

interface CruiseConsultancyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CruiseConsultancyModal({ isOpen, onClose }: CruiseConsultancyModalProps) {
  if (!isOpen) return null;

  const additionalMetadata = [
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
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fechar modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900 mb-4">
            Vamos conversar sobre sua Jornada?
          </h2>
          <p className="font-comfortaa text-lg text-gray-600">
            Nossos especialistas vão entrar em contato para agendar sua conversa inicial
          </p>
        </div>

        <LeadForm
          onSuccess={onClose}
          submitButtonText="Enviar e aguardar contato"
          additionalMetadata={additionalMetadata}
          showBackButton={true}
          onBack={onClose}
          event="agendar"
          eventOptions={{
            source: 'Consultoria Cruzeiros',
            consultancy_type: 'Cruise Consultancy'
          }}
        />

        {/* WhatsApp Group Invitation */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="font-comfortaa text-sm text-gray-600 mb-3">
            Não é o momento ideal para uma reunião? Entre em nosso grupo exclusivo, com a melhor curadoria de cruzeiros de luxo.
          </p>
          <WhatsAppGroupButton
            href="https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI"
            size="compact"
          />
        </div>
      </div>
    </div>
  );
}
