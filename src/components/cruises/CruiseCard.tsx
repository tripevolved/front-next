import Button from "../common/Button";
import { PhotoCarousel } from "../PhotoCarousel";
import { Photo } from "@/core/types";
import { CruiseCardData } from "@/clients/cruises/cruises";

type CruiseCardProps = {
  handleClick: () => void;
  cruise?: CruiseCardData;
};

export const CruiseCard = ({ handleClick, cruise }: CruiseCardProps) => {
  // Use cruise data if available, otherwise use default mock data
  const photos: Photo[] = cruise ? [
    {
      title: cruise.title,
      sources: [
        {
          height: 400,
          width: 600,
          url: cruise.image,
          type: "lg",
        },
      ],
      alt: cruise.title,
    },
  ] : [
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
    <div className="bg-white shadow-lg rounded-lg w-full md:max-w-3xl h-full max-h-[70vh] flex flex-col cursor-pointer hover:bg-gray-300/30 transition-colors">
      <div className="h-96">
        <PhotoCarousel title="Cruzeiros" photos={photos} />
      </div>
      <div
        className="md:max-w-3xl flex flex-col gap-3 p-5 cursor-pointer hover:bg-gray-300/30 transition-colors"
        onClick={handleClick}
      >
        <div>
          <p className="text-gray-500">
            {cruise?.company || "Explora Journeys"}
          </p>
        </div>
        <div className="flex flex-col w-full items-start gap-4">
          <span className="text-2xl text-primary-500 font-bold">
            {cruise?.title || "Nice - Roma: Uma Jornada Incrível"}
          </span>
          <div>
            <p className="md:text-lg">
              De {cruise?.departureDate || "12"} a {cruise?.arrivalDate || "20"} de abril de 2026
            </p>
            <p className="md:text-lg">
              <span className="italic">{cruise?.cabinType || "Ocean Terrace Suite"}</span> a partir de {cruise?.price || "R$X,00"}
            </p>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <Button
            className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-accent-600 transition-all md:w-9/12 w-11/12"
            onClick={handleClick}
          >
            Quero saber mais
          </Button>
        </div>
      </div>
    </div>
  );
};
