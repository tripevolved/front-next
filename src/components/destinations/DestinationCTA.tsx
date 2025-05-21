'use client';

import { useState } from 'react';
import { LocalStorageService } from '@/clients/local';
import { WhatsAppDirectButton } from '@/components/WhatsAppDirectButton';
import ContactExpertModal from '@/components/ContactExpertModal';

interface DestinationCTAProps {
  destinationTitle: string;
  destinationUniqueName: string;
}

export function DestinationCTA({ destinationTitle, destinationUniqueName }: DestinationCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasTraveler = LocalStorageService.hasTraveler();

  const handleContactClick = () => {
    if (!hasTraveler) {
      setIsModalOpen(true);
    }
  };

  const message = `Olá! Tenho interesse em conhecer ${destinationTitle}. Podem me ajudar?`;

  return (
    <div className="bg-secondary-700 p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-baloo font-bold text-accent-500 mb-4">
        Quer conhecer este destino?
      </h2>
      <p className="text-gray-200 mb-6">
        Nossos especialistas podem ajudar a planejar sua viagem perfeita para {destinationTitle}.
      </p>

      <div className="space-y-4">
        {hasTraveler ? (
          <WhatsAppDirectButton
            message={message}
            variant="primary"
            className="w-full"
          >
            Falar com especialista
          </WhatsAppDirectButton>
        ) : (
          <button
            onClick={handleContactClick}
            className="w-full bg-primary-600 text-white py-3 rounded-full font-medium hover:bg-primary-700 transition-colors"
          >
            Falar com especialista
          </button>
        )}

        <div className="relative inline-block w-full">
          <button
            disabled
            className="w-full bg-secondary-600 text-gray-300 py-3 rounded-full font-medium cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            <span>Planejar minha viagem</span>
            <span className="bg-secondary-500 text-accent-500 text-xs px-2 py-1 rounded-full">Em breve</span>
            <div className="absolute bottom-full left-0 right-0 mb-2 p-4 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-gray-600 pointer-events-none">
              Em breve você poderá planejar sua viagem completa através da nossa plataforma, contando com a curadoria de nossos especialistas
            </div>
          </button>
        </div>
      </div>

      <ContactExpertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
} 