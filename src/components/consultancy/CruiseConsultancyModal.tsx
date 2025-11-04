"use client";

import React from "react";
import LeadForm from "../LeadForm";

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
            Vamos conversar sobre sua Voyage?
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
          <a
            href="https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
            Entrar no grupo exclusivo
          </a>
        </div>
      </div>
    </div>
  );
}
