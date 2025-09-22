import React, { useRef } from "react";

type Item = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function CruiseOptionsCarousel() {
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

  const items: Item[] = [
    {
      id: 1,
      title: "Filme 1",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
    {
      id: 2,
      title: "Filme 2",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
    {
      id: 3,
      title: "Filme 3",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
    {
      id: 4,
      title: "Filme 4",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
    {
      id: 5,
      title: "Filme 5",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
    {
      id: 6,
      title: "Filme 6",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
    {
      id: 7,
      title: "Filme 7",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
    {
      id: 8,
      title: "Filme 8",
      price: 505,
      image:
        "https://www.researchgate.net/profile/Snehasis-Mukherjee/publication/324584082/figure/fig1/AS:616609639051271@1524022602821/Example-photographs-taken-from-1-dataset-alongwith-the-quality-scores-provided-by-the.png",
    },
  ];

  return (
    <div className="w-full">
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 h-full w-12 z-10 bg-transparent hover:bg-black/50 text-gray-300 flex items-center justify-center transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
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
          className="absolute right-0 top-0 h-full w-12 z-10 bg-transparent hover:bg-black/50 text-gray-300 flex items-center justify-center transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
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
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-10 py-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-64 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg rounded-lg bg-white border border-gray-200 overflow-hidden group/item"
            >
              <div className="flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover/item:scale-110"
                  />
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <div>
                    <h1 className="font-bold font-baloo text-gray-800 text-xl mb-1">
                      {item.title}
                    </h1>
                    <p className="text-gray-600 text-md">
                      A partir de{" "}
                      <span className="font-bold text-primary-500 text-lg">
                        R${item.price}
                      </span>
                    </p>
                  </div>

                  <button className="inline-flex items-center justify-center w-full gap-2 py-2 px-4 text-center bg-green-500 hover:bg-green-600 rounded-lg text-white transition-colors text-sm font-medium">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
