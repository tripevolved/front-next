'use client';

import { useState } from 'react';
import { LocalStorageService } from '@/clients/local';
import { WhatsAppDirectButton } from '@/components/WhatsAppDirectButton';
import ContactExpertModal from '@/components/ContactExpertModal';
import { useRouter } from "next/navigation";
import { UserCredentials } from "@/services/user/credentials";

interface DestinationCTAProps {
  destinationTitle: string;
  destinationUniqueName: string;
}

export function DestinationCTA({ destinationTitle, destinationUniqueName }: DestinationCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasTraveler = LocalStorageService.hasTraveler();
  const router = useRouter();

  const handleContactClick = () => {
    if (!hasTraveler) {
      setIsModalOpen(true);
    }
  };

  const userData = UserCredentials.get();

  const newTripRoute = `/app/viagens/nova?para=${destinationUniqueName}`;

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
          <WhatsAppDirectButton message={message} variant="primary" className="w-full">
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
            onClick={() =>
              router.push(
                userData?.idToken
                  ? newTripRoute
                  : `/app/cadastro?redirectTo=${encodeURIComponent(newTripRoute)}`
              )
            }
            className="w-full bg-secondary-600 hover:bg-secondary-500 text-gray-300 py-3 rounded-full font-medium flex items-center justify-center"
          >
            <span>Planejar minha viagem</span>
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