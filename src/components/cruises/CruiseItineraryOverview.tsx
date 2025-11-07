"use client";

import Image from "next/image";
import CruiseImageCarousel from "./CruiseImageCarousel";
import { ItineraryContent } from "../itineraries";
import CruiseExperienceNotFound from "./CruiseExperienceNotFound";
import { Experience } from "@/core/types/experiences";
import { useEffect, useState } from "react";
import { CruiseExitModal } from "./CruiseExitModal";

interface CruiseExperienceContentProps {
  experience: Experience;
}

export default function CruiseItineraryOverview({ experience }: CruiseExperienceContentProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasShownExitModal, setHasShownExitModal] = useState(false);

  const handleExitModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitModal) {
        setIsModalOpen(true);
        setHasShownExitModal(true);
      }
    };

    const handleBeforeUnload = () => {
      if (!hasShownExitModal) {
        setIsModalOpen(true);
        setHasShownExitModal(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasShownExitModal]);
  return (
    <>
      <section className="flex flex-col gap-4">
        <section className="flex flex-col md:flex-row items-center gap-4 w-full p-10 bg-secondary-500">
          <div className="w-full max-w-4xl">
            <CruiseImageCarousel />
          </div>
          <div className="flex flex-col gap-2 h-full font-baloo">
            <h2 className="text-white md:text-4xl text-3xl font-bold">Explora Journeys</h2>
            <h1 className="text-accent-500 md:text-5xl text-3xl font-bold">
              Nice - Roma: Uma Jornada incrível
            </h1>
            <span className="text-white text-xl">De 12 a 20 de abril de 2026</span>
          </div>
        </section>
        <section className="px-3 flex w-full justify-center items-center md:mt-3">
          <div className="bg-primary-50 max-w-3xl  border-2 border-primary-500 py-3 px-4 flex items-center justify-center text-center flex-wrap whitespace-pre-line gap-6 rounded-[40px]">
            <span className="text-gray-600 text-md italic">
              &quot;Essa jornada combina toda a grandiosidade e cuidado Explora Journeys com as
              paisagens perfeitas e espetaculares de Roma e Nice. Perfeita para curtir a dois&quot;
            </span>
            <div className="flex justify-around items-center gap-3">
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
        </section>
        <section className="p-3">
          {experience ? (
            <ItineraryContent
              itinerary={experience?.itinerary.map((item, index) => ({
                id: item.period,
                date: item.date,
                activity: item.activity,
                image: item.image,
                description: item.description,
                hotel: item.hotel,
                experience: item.experience,
                cruise: item.cruise,
                highlights: item.highlights,
              }))}
              mapImage={experience?.mapImage}
              googleLink={experience?.googleLink}
              type={experience?.type === "day-by-day" ? "day" : "period"}
            />
          ) : (
            <CruiseExperienceNotFound />
          )}
        </section>

        <section className="flex flex-col justify-center gap-3 from-primary-600 to-primary-700 bg-gradient-to-br p-10">
          <div className="flex pl-3">
            <h1 className="font-baloo text-2xl font-bold md:text-4xl text-white">
              Gostou dessa experiência?
            </h1>
          </div>
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg px-3 text-white">
              Converse com nossos especialistas para criar a sua viagem. Vamos garantir que cada
              detalhe seja pensado para o que você quer viver.
            </p>
            <button className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-baloo font-semibold text-xl transition-colors min-w-64">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              <span>Conversar com especialista</span>
            </button>
          </div>
        </section>
        {/* Trigger when tries to leave page */}

        <CruiseExitModal
          isOpen={isModalOpen}
          onClose={handleExitModal}
          experienceTitle={experience.title}
        />
      </section>
    </>
  );
}
