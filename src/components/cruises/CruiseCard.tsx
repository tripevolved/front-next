import Button from "../common/Button";
import { PhotoCarousel } from "../PhotoCarousel";
import { Photo } from "@/core/types";
import { CruiseData } from "@/clients/cruises/cruises";

type CruiseCardProps = {
  handleClick: () => void;
  cruise: CruiseData;
};

export const CruiseCard = ({ handleClick, cruise }: CruiseCardProps) => {
  // Format date range with conditional month display
  const formatDateRange = (departureDate: Date, arrivalDate: Date) => {
    const depDate = typeof departureDate === 'string' ? new Date(departureDate) : departureDate;
    const arrDate = typeof arrivalDate === 'string' ? new Date(arrivalDate) : arrivalDate;
    
    const depDay = depDate.getDate();
    const depMonth = depDate.toLocaleDateString('pt-BR', { month: 'long' });
    const depYear = depDate.getFullYear();
    
    const arrDay = arrDate.getDate();
    const arrMonth = arrDate.toLocaleDateString('pt-BR', { month: 'long' });
    const arrYear = arrDate.getFullYear();
    
    // Check if both dates are in the same month and year
    if (depMonth === arrMonth && depYear === arrYear) {
      return `De ${depDay} a ${arrDay} de ${depMonth} de ${depYear}`;
    } else {
      // Different months or years - show full format
      return `De ${depDay} de ${depMonth} de ${depYear} a ${arrDay} de ${arrMonth} de ${arrYear}`;
    }
  };

  // Format price
  const formatPrice = () => {
    const amount = cruise.price.amountWithDiscount || cruise.price.amount;
    const currency = cruise.price.currency === 'BRL' ? 'R$' : cruise.price.currency;
    return `${currency} ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Convert cruise images to Photo format
  const photos: Photo[] = cruise.images && cruise.images.length > 0
    ? cruise.images.map((imageUrl) => ({
        title: cruise.title,
        sources: [
          {
            height: 400,
            width: 600,
            url: imageUrl,
            type: "lg" as const,
          },
        ],
        alt: cruise.title,
      }))
    : [];

  // Don't render if essential data is missing
  if (!cruise || !cruise.title || !cruise.company) {
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg w-full md:max-w-3xl h-full max-h-[70vh] flex flex-col cursor-pointer hover:bg-gray-300/30 transition-colors">
      {photos.length > 0 && (
        <div className="h-96">
          <PhotoCarousel title="Cruzeiros" photos={photos} autoScroll={false} />
        </div>
      )}
      <div
        className="md:max-w-3xl flex flex-col gap-3 p-5 cursor-pointer hover:bg-gray-300/30 transition-colors"
        onClick={handleClick}
      >
        <div>
          <p className="text-gray-500">
            {cruise.company}
          </p>
        </div>
        <div className="flex flex-col w-full items-start gap-4">
          <span className="text-2xl text-primary-500 font-bold">
            {cruise.title}
          </span>
          <div>
            {cruise.departureDate && cruise.arrivalDate && (
              <p className="md:text-lg">
                {formatDateRange(cruise.departureDate, cruise.arrivalDate)}
              </p>
            )}
            {cruise.price && (
              <p className="md:text-lg">
                <span className="italic">{cruise.price.cabinType}</span> a partir de {formatPrice()} por pessoa
              </p>
            )}
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
