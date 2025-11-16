import Image from "next/image";
import CruiseImageCarousel from "./CruiseImageCarousel";
import CruiseOptionsCarousel from "./CruisesOptionsCarousel";
import { WhatsAppDirectButton } from "../WhatsAppDirectButton";

type CruiseDetailsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function CruiseDetailsModal({ isOpen, handleClose }: CruiseDetailsModalProps) {
  if (!isOpen) return null;
  return (
    <div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl py-8 px-3 max-w-5xl w-full relative max-h-[90vh] overflow-hidden flex flex-col">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600 z-10"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto pb-9">
            <div className="w-full mt-2">
              <CruiseImageCarousel />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-500">Explora Journeys</span>
              <h1 className="font-bold text-primary-500 text-xl">
                Nice - Roma: uma jornada incrível
              </h1>
              <span className="font-bold text-gray-500">De 12 a 20 de abril de 2026</span>
            </div>
            <div className="bg-primary-50 p-3 md:px-4 px-2  flex items-center justify-center text-center flex-wrap whitespace-pre-line gap-6 rounded-[40px]">
              <span className="text-gray-600 text-md italic">
                &quot;Essa jornada combina toda a grandiosidade e cuidado Explora Journeys com as
                paisagens perfeitas e espetaculares de Roma e Nice. Perfeita para curtir a dois&quot;
              </span>
              <div className="flex justify-around items-center gap-2">
                <Image
                  src="/assets/sobre/gasp.png"
                  alt="Decorative element"
                  width={30}
                  height={30}
                  className="lg:w-24 lg:h-24 h-[68px] w-[68px] object-cover rounded-full"
                />
                <span className="text-black font-extrabold">
                  Henrique Gasparotto, especialista Trip Evolved
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-8 p-3">
              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-xl">Itinerário</h1>
                <div className="flex flex-col gap-4">
                  {/* Day 1 */}
                  <div className="flex gap-4 items-start border-b border-gray-200 pb-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src="/assets/destinations/nice.jpg"
                        alt="Nice, França"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary-500">Dia 1</span>
                        <span className="text-sm text-gray-500">12 de abril</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">Nice, França</h3>
                      <p className="text-sm text-gray-600">Embarque • 17:00 - 22:00</p>
                      <p className="text-sm text-gray-500">
                        Início da jornada na deslumbrante Costa Azul francesa
                      </p>
                    </div>
                  </div>

                  {/* Day 2 */}
                  <div className="flex gap-4 items-start border-b border-gray-200 pb-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src="/assets/destinations/monte-carlo.jpg"
                        alt="Monte Carlo, Mônaco"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary-500">Dia 2</span>
                        <span className="text-sm text-gray-500">13 de abril</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">Monte Carlo, Mônaco</h3>
                      <p className="text-sm text-gray-600">08:00 - 18:00</p>
                      <p className="text-sm text-gray-500">
                        Explore o glamour e luxo do principado de Mônaco
                      </p>
                    </div>
                  </div>

                  {/* Day 3 */}
                  <div className="flex gap-4 items-start border-b border-gray-200 pb-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src="/assets/destinations/portofino.jpg"
                        alt="Portofino, Itália"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary-500">Dia 3</span>
                        <span className="text-sm text-gray-500">14 de abril</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">Portofino, Itália</h3>
                      <p className="text-sm text-gray-600">08:00 - 20:00</p>
                      <p className="text-sm text-gray-500">
                        Vilarejo de pescadores com charme inigualável
                      </p>
                    </div>
                  </div>

                  {/* Day 4 */}
                  <div className="flex gap-4 items-start border-b border-gray-200 pb-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src="/assets/destinations/livorno.jpg"
                        alt="Livorno (Florença), Itália"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary-500">Dia 4</span>
                        <span className="text-sm text-gray-500">15 de abril</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">Livorno (Florença), Itália</h3>
                      <p className="text-sm text-gray-600">07:00 - 19:00</p>
                      <p className="text-sm text-gray-500">
                        Portal para Florença, berço do Renascimento
                      </p>
                    </div>
                  </div>

                  {/* Day 5 */}
                  <div className="flex gap-4 items-start border-b border-gray-200 pb-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src="/assets/destinations/elba.jpg"
                        alt="Ilha de Elba, Itália"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary-500">Dia 5</span>
                        <span className="text-sm text-gray-500">16 de abril</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">Ilha de Elba, Itália</h3>
                      <p className="text-sm text-gray-600">08:00 - 18:00</p>
                      <p className="text-sm text-gray-500">
                        Ilha paradisíaca com praias cristalinas
                      </p>
                    </div>
                  </div>

                  {/* Day 6 */}
                  <div className="flex gap-4 items-start border-b border-gray-200 pb-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src="/assets/destinations/porto-santo-stefano.jpg"
                        alt="Porto Santo Stefano, Itália"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary-500">Dia 6</span>
                        <span className="text-sm text-gray-500">17 de abril</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">Porto Santo Stefano, Itália</h3>
                      <p className="text-sm text-gray-600">08:00 - 17:00</p>
                      <p className="text-sm text-gray-500">
                        Charmosa cidade portuária na costa toscana
                      </p>
                    </div>
                  </div>

                  {/* Day 7 */}
                  <div className="flex gap-4 items-start border-b border-gray-200 pb-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src="/assets/destinations/amalfi.jpg"
                        alt="Costa Amalfitana, Itália"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary-500">Dia 7</span>
                        <span className="text-sm text-gray-500">18 de abril</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">Costa Amalfitana, Itália</h3>
                      <p className="text-sm text-gray-600">07:00 - 19:00</p>
                      <p className="text-sm text-gray-500">
                        Uma das costas mais bonitas do mundo
                      </p>
                    </div>
                  </div>

                  {/* Day 8 */}
                  <div className="flex gap-4 items-start">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src="/assets/destinations/rome.jpg"
                        alt="Roma (Civitavecchia), Itália"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary-500">Dia 8</span>
                        <span className="text-sm text-gray-500">20 de abril</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">Roma (Civitavecchia), Itália</h3>
                      <p className="text-sm text-gray-600">Desembarque • 08:00</p>
                      <p className="text-sm text-gray-500">
                        Fim da jornada na Cidade Eterna
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-xl">Suítes</h1>
                <CruiseOptionsCarousel />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-xl">Gastronomia</h1>
                <CruiseOptionsCarousel />
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-8 right-8 z-20 bg-gradient-to-t from-white via-white to-transparent pt-4">
            <WhatsAppDirectButton className="w-full" message="Olá! Gostaria de falar sobre o cruzeiro Nice - Roma: uma jornada incrível. Podem me ajudar?">
              Reservar
            </WhatsAppDirectButton>
          </div>
        </div>
      </div>
    </div>
  );
}
