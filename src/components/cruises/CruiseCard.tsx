import { useState } from "react";
import Button from "../common/Button";
import { PhotoCarousel } from "../PhotoCarousel";
import { Photo } from "@/core/types";

type CruiseCardProps = {
  handleClick: () => void;
};

export const CruiseCard = ({ handleClick }: CruiseCardProps) => {
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

  return (
    <div
      className="bg-white shadow-lg rounded-lg w-full md:w-5/12 h-full max-h-[70vh] flex flex-col gap-5 p-5 cursor-pointer hover:bg-gray-300/30 transition-colors"
      onClick={handleClick}
    >
      <div className="h-96">
        <PhotoCarousel title="aaaa" photos={photos} />
      </div>
      <div>
        <p className="text-gray-600 text-xl font-bold">Explora Journeys</p>
      </div>
      <div className="flex flex-col w-full items-start gap-4">
        <span className="underline text-2xl text-primary-500 font-bold">
          Nice - Roma: Uma Jornada Incrível
        </span>
        <div>
          <p className="md:text-lg">
            <span className="font-extrabold italic">Ocean Terrace Suite</span> a partir de{" "}
            <span className="text-gray-800 font-bold">R$</span>
            <span className="text-primary-500 font-bold">X,00</span>
          </p>
          <p className="md:text-lg">
            De <span className="text-primary-500 font-bold">12</span> a{" "}
            <span className="text-primary-500 font-bold">20</span> de abril de{" "}
            <span className="font-extrabold">2026</span>
          </p>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Button
          className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-2xl text-xl font-semibold hover:bg-accent-600 transition-all md:w-9/12 w-11/12"
          onClick={handleClick}
        >
          Quero saber mais
        </Button>
      </div>
    </div>
  );
};
