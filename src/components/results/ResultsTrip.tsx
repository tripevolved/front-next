import { useState } from "react";
import Link from "next/link";
import ContactExpertModal from "@/components/ContactExpertModal";
import { WhatsAppDirectButton } from "@/components/WhatsAppDirectButton";
import { LocalStorageService } from "@/clients/local";
import { TripProposal } from "@/core/types/trip";
import { ResultsDestinationCard } from "@/components/results/ResultsDestinationCard";
import { useAppStore } from "@/core/store";

type ResultTripProps = {
  isPublic?: boolean;
  fallback?: () => void;
  setDestinationById: (destinationId: string) => Promise<void>;
  error: boolean;
  isLoading: boolean;
  tripProposal: TripProposal | null;
};

export function ResultsTrip({
  setDestinationById,
  isPublic = false,
  fallback,
  error,
  isLoading,
  tripProposal,
}: ResultTripProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const hasTraveler = LocalStorageService.hasTraveler();

  const { travelerProfile } = useAppStore((state) => state.travelerState);

  const handleContactExpert = () => {
    if (!hasTraveler) {
      setIsContactModalOpen(true);
    }
  };

  if (error && !isLoading) {
    fallback?.();
  }

  const message = "Olá! Gostaria de falar sobre os resultados da minha pesquisa de destinos.";

  return (
    <div className="container mx-auto px-4">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-baloo font-bold text-secondary-900">
          Sua viagem ideal é para...
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : tripProposal ? (
        <>
          {/* Main destination section */}
          {tripProposal.mainChoice && (
            <div className="mb-12">
              <ResultsDestinationCard
                destination={tripProposal.mainChoice}
                isLarge={true}
                onWantToGo={setDestinationById}
                isMainChoice={true}
              />
            </div>
          )}
          {/* Other destinations */}
          {tripProposal.otherChoices && tripProposal.otherChoices.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-baloo font-bold text-secondary-900 mb-6 text-center">
                Outras opções que você pode gostar
              </h2>

              {/* Mobile: Horizontal scrollable container */}
              <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
                <div className="flex space-x-4 pr-4">
                  {tripProposal.otherChoices.map((destination) => (
                    <ResultsDestinationCard
                      key={destination.destinationId}
                      destination={destination}
                      onWantToGo={setDestinationById}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop: Two-column grid with 80% width container */}
              <div className="hidden md:block w-4/5 mx-auto">
                <div className="grid grid-cols-2 gap-8">
                  {tripProposal.otherChoices.map((destination) => (
                    <ResultsDestinationCard
                      key={destination.destinationId}
                      destination={destination}
                      onWantToGo={setDestinationById}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : null}

      <div className="text-center">
        <p className="text-gray-600 mb-6">
          Não encontrou o destino ideal? Nossos especialistas podem ajudar a encontrar a viagem
          perfeita para você.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {isPublic ? (
            <>
              {hasTraveler ? (
                <WhatsAppDirectButton
                  message={message}
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Falar com especialista
                </WhatsAppDirectButton>
              ) : (
                <button
                  onClick={handleContactExpert}
                  className="bg-secondary-600 text-white px-8 py-3 rounded-full font-medium hover:bg-secondary-700 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Falar com especialista
                </button>
              )}

              <Link
                href="/destinos"
                className="bg-white text-secondary-600 border border-secondary-600 px-8 py-3 rounded-full font-medium hover:bg-secondary-50 transition-colors"
              >
                Explorar destinos
              </Link>
            </>
          ) : (
            <Link
              href={`/destinos/?profileId=${travelerProfile}`}
              className="bg-white text-secondary-600 border border-secondary-600 px-8 py-3 rounded-full font-medium hover:bg-secondary-50 transition-colors"
            >
              Ver mais destinos
            </Link>
          )}
        </div>
      </div>

      {/* Contact Expert Modal */}
      <ContactExpertModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
