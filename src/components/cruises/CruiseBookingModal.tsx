import { Photo } from "@/core/types";
import { useState } from "react";
import { PhotoCarousel } from "../PhotoCarousel";
import Button from "../common/Button";
import { MuxVideoPlayer } from "../MuxVideoPlayer";
import { ShareModal } from "../ShareModal";
import Image from "next/image";

interface CruiseBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  experienceTitle: string;
}

function TabItineraryContent() {
  const itineraryDays = [
    {
      imagePath: "/assets/sobre/gasp.png",
      description: "Descrição do Dia 1",
    },
    {
      imagePath: "/assets/sobre/gasp.png",
      description: "Descrição do Dia 2",
    },
    {
      imagePath: "/assets/sobre/gasp.png",
      description: "Descrição do Dia 3",
    },
    {
      imagePath: "/assets/sobre/gasp.png",
      description: "Descrição do Dia 4",
    },
    {
      imagePath: "/assets/sobre/gasp.png",
      description: "Descrição do Dia 5",
    },
  ];
  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        {itineraryDays.map((day, index) => (
          <div className="flex gap-2 items-start">
            <div>
              <Image
                src={day.imagePath}
                alt="Henrique Gasparotto"
                width={175}
                height={175}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col gap-2 text-start items-start justify-start h-full">
              <h1 className="font-comfortaa text-2xl text-primary-700 font-bold">
                Dia {index + 1}
              </h1>
              <p>Descrição</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleTabs() {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = [
    { id: "tab1", name: "Itinerário", content: <TabItineraryContent /> },
    { id: "tab2", name: "Hospedagem" },
    { id: "tab3", name: "Passeios" },
  ];

  return (
    <div className="max-w-96 m-4  mx-auto">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium bg-primary-500/40 rounded-xl transition-colors max-w-36 text-primary-700 border-primary-500 border-2 ${
              activeTab === tab.id
                ? "border-primary-700 !text-black bg-primary-500/60 border-b-4"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>
      </div>
    </div>
  );
}

export function CruiseBookingModal({ isOpen, onClose, experienceTitle }: CruiseBookingModalProps) {
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
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 flex-col"
        onClick={onClose}
      >
        <div
          className="bg-white w-full p-6 text-center border h-full md:max-w-6xl max-w-md overflow-y-scroll flex flex-col items-center justify-between overflow-x-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pt-8 pb-3 px-8">
            <SimpleTabs />
          </div>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:text-white text-gray-500 hover:text-gray-300 transition-colors"
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
        <div className="sticky bg-white p-3 rounded-b-lg border-0 w-full">
          <h1 className="text-3xl font-bold font-baloo  text-primary-700 text-start">
            A partir de <span className="text-black">R$0,00</span>
          </h1>
          <button
            className="inline-flex text-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-xl font-baloo font-semibold text-xl transition-colors min-w-64"
            type="button"
          >
            <span>Reservar pelo Whats</span>
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
