"use client";

import { useState, useEffect } from "react";
import QuoteCard from "./QuoteCard";
import { Picture } from "@/ui";
import { Icon } from "mars-ds";

interface Quote {
  text: string;
  footer: string;
  footerSub: string;
}

const quotes: Quote[] = [
  {
    text: "This product brings so much value! I love it!",
    footer: "Leandro M",
    footerSub: "Viajou para Porto de Galinhas, PE",
  },
  {
    text: "u qualquer atendimento de outras agências. Só gratidão.",
    footer: "Alexandra A",
    footerSub: "Viajou para Roma, Itália",
  },
  {
    text: "Foi perfeito, tudo perfeito. Obrigadaaaa",
    footer: "Cassiane O",
    footerSub: "Viajou para Dubai, Emirados Árabes Unidos",
  },
  {
    text: "Pa gente gosta. Desde passagem aérea, locação de carro, hotéis... os hotéis estavam maravilhosos!",
    footer: "Suzimara G",
    footerSub: "Viajou para El Calafate e Ushuaia, Argentina",
  },
  {
    text: "amos curtinaravilha de hotel, vale a pena! Nota 10!",
    footer: "Pedro e Fabiana",
    footerSub: "Viajaram para Curaçao",
  },
];

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= quotes.length ? 0 : nextIndex;
      });
    }, 8000);

    return () => clearInterval(timer);
  }, [mounted]);

  // Don't render anything until after hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 px-2 flex justify-between items-center flex-row gap-5"
            >
              <button
                onClick={() => {
                  setCurrentIndex((prevIndex) => {
                    const nextIndex = prevIndex - 1;
                    return nextIndex;
                  });
                }}
                className="disabled:cursor-default disabled:text-gray-300 cursor-pointer"
                disabled={currentIndex === 0}
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
                  className="lucide lucide-chevron-left-icon lucide-chevron-left "
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <div className="flex flex-col gap-3 items-center justify-center text-center">
                <h1 className="font-bold md:text-2xl text-lg">People love this!</h1>
                <div className="italic md:text-xl">"{quote.text}"</div>
                <div className="flex flex-row gap-1 h-5 md:h-7">
                  {new Array(5).fill(5).map((_, starIndex) => {
                    return <img key={starIndex} alt="star" src="/assets/stays/star.svg" />;
                  })}
                </div>
                <div className="font-bold text-gray-600 md:text-xl">{quote.footer}</div>
              </div>
              <button
                className="cursor-pointer"
                onClick={() => {
                  setCurrentIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    return nextIndex >= quotes.length ? 0 : nextIndex;
                  });
                }}
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
                  className="lucide lucide-chevron-right-icon lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
