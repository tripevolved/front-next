import React, { useRef } from "react";
import Image from "next/image";
import type { CruiseRate } from "@/clients/cruises/cruises";

interface CruiseRatesCarouselProps {
  rates: CruiseRate[];
}

export default function CruiseRatesCarousel({ rates }: CruiseRatesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (scrollRef && scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const formatPrice = (amount: number | undefined | null, currency: string = 'BRL') => {
    if (amount === null || amount === undefined || isNaN(Number(amount))) {
      return 'Preço não disponível';
    }
    const numAmount = Number(amount);
    if (isNaN(numAmount)) {
      return 'Preço não disponível';
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency || 'BRL',
    }).format(numAmount);
  };

  if (!rates || !Array.isArray(rates) || rates.length === 0) {
    return (
      <div className="w-full p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
        <p>Nenhum quarto disponível no momento.</p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="relative min-h-[400px]">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 z-20 bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center transition-all duration-300 rounded-full shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 z-20 bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center transition-all duration-300 rounded-full shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {rates.map((rate) => {
            const imageUrl = rate.coverImage && rate.coverImage.url 
              ? rate.coverImage.url 
              : '/assets/blank-image.png';
            const imageAlt = rate.coverImage && rate.coverImage.shortDescription
              ? rate.coverImage.shortDescription
              : '';
            
            const hasDiscount = rate.amountPerPersonWithDiscount != null && !isNaN(Number(rate.amountPerPersonWithDiscount)) && rate.amountPerPersonWithDiscount !== rate.amountPerPerson;
            const hasEvolvedDiscount = rate.amountPerPersonWithEvolvedDiscount != null && !isNaN(Number(rate.amountPerPersonWithEvolvedDiscount)) && rate.amountPerPersonWithEvolvedDiscount !== rate.amountPerPerson;
            const currency = rate.currency || 'BRL';

            return (
              <div
                key={rate.roomCategoryId}
                className="flex-shrink-0 w-64 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg rounded-lg bg-white border border-gray-200 overflow-hidden group/item"
              >
                <div className="flex flex-col">
                  <div className="relative overflow-hidden h-48">
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover/item:scale-110"
                    />
                  </div>

                  <div className="p-4 flex flex-col gap-3">
                    <div>
                      <h1 className="font-bold font-baloo text-gray-800 text-xl mb-1">
                        {rate.name}
                      </h1>
                      {rate.description && (
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {rate.description}
                        </p>
                      )}
                      <div className="flex flex-col gap-1">
                        {(hasDiscount || hasEvolvedDiscount) && (
                          <p className="text-gray-400 text-xs line-through">
                            {formatPrice(rate.amountPerPerson, currency)}
                          </p>
                        )}
                        {hasDiscount && (
                          <p className={`text-gray-600 text-sm ${hasEvolvedDiscount && "line-through"}`}>
                            <span className={`font-bold ${hasEvolvedDiscount ? "text-primary-600 line-through" : "text-accent-500 text-lg"}`}>
                              {formatPrice(rate.amountPerPersonWithDiscount, currency)}
                            </span>
                            {" "}por pessoa
                          </p>
                        )}
                        {hasEvolvedDiscount && (
                          <>
                            <p className="text-gray-600 text-sm">
                              <span className="font-bold text-accent-500 text-lg">
                                {formatPrice(rate.amountPerPersonWithEvolvedDiscount, currency)}
                              </span>
                              {" "}por pessoa
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              *valor exclusivo para clientes Círculo Evolved.
                            </p>
                          </>
                        )}
                        {!hasDiscount && !hasEvolvedDiscount && (
                          <p className="text-gray-600 text-sm">
                            <span className="font-bold text-accent-500 text-lg">
                              {formatPrice(rate.amountPerPerson, currency)}
                            </span>
                            {" "}por pessoa
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
